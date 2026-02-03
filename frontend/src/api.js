// const API_URL = "http://localhost:5000/expenses";

// export async function fetchExpenses() {
//   const res = await fetch(API_URL);
//   if (!res.ok) throw new Error("Failed to fetch expenses");
//   return res.json();
// }

// export async function createExpense(expense) {
//   const res = await fetch(API_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(expense),
//   });

//   if (!res.ok) throw new Error("Failed to add expense");
//   return res.json();
// }
const BASE_URL = "http://localhost:5000/expenses";

export async function getExpenses() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return res.json();
}

export async function addExpense(expense) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });

  if (!res.ok) {
    throw new Error("Failed to add expense");
  }
  return res.json();
}
