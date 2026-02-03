import { useState } from "react";

export default function ExpenseForm({ onAdd, submitting }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function generateRequestId() {
    return crypto.randomUUID();
    }
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.amount || !form.category || !form.date) {
      alert("Amount, category and date are required");
      return;
    }

    await onAdd({
        request_id: generateRequestId(),
        ...form,
        amount: Number(Number(form.amount).toFixed(2)),
    });

    setForm({ amount: "", category: "", description: "", date: "" });
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="number"
        name="amount"
        step="0.01"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />
      <button disabled={submitting}>
        {submitting ? "Adding…" : "Add Expense"}
      </button>
    </form>
  );
}
