import { useEffect, useMemo, useState } from "react";
import { getExpenses, addExpense } from "./api";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Filters from "./components/Filters";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 🔹 filters state
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("date_desc");

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    try {
      setLoading(true);
      const data = await getExpenses();

      // normalize Decimal → number
      const normalized = data.map((e) => ({
        ...e,
        amount: Number(e.amount),
      }));

      setExpenses(normalized);
    } catch (e) {
      setError(e.message || "Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddExpense(expense) {
    try {
      setSubmitting(true);

      const saved = await addExpense({
        ...expense,
        amount: Number(expense.amount),
      });

      setExpenses((prev) => [
        { ...saved, amount: Number(saved.amount) },
        ...prev,
      ]);
    } catch (e) {
      alert(e.message || "Failed to add expense");
    } finally {
      setSubmitting(false);
    }
  }

  // 🔹 derive category list
  const categories = useMemo(() => {
    return ["ALL", ...new Set(expenses.map((e) => e.category))];
  }, [expenses]);

  // 🔹 apply filters + sorting
  const visibleExpenses = useMemo(() => {
    let list = [...expenses];

    if (selectedCategory !== "ALL") {
      list = list.filter((e) => e.category === selectedCategory);
    }

    if (sortOrder === "date_desc") {
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return list;
  }, [expenses, selectedCategory, sortOrder]);

  const totalAmount = useMemo(() => {
  return visibleExpenses.reduce(
      (sum, e) => sum + Number(e.amount),
      0
    );
  }, [visibleExpenses]);

  if (loading) return <p>Loading expenses…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
      <h1>Expense Tracker</h1>

      <ExpenseForm onAdd={handleAddExpense} submitting={submitting} />

      <Filters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <ExpenseList expenses={visibleExpenses} />
      <div style={{ marginTop: 16, fontWeight: "bold" }}>
        Total: ₹{totalAmount.toFixed(2)}
      </div>
    </div>
  );
}
