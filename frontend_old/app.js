// const API = "http://localhost:5000/expenses"
const API = "/expenses"

function uuid() {
  return crypto.randomUUID()
}

async function addExpense() {
  const data = {
    request_id: uuid(),
    amount: Number(amount.value),
    category: category.value,
    description: description.value,
    date: date.value
  }

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  loadExpenses()
}

async function loadExpenses() {
  let url = API + "?sort=" + sort.value

  if (filterCategory.value)
    url += "&category=" + filterCategory.value

  const res = await fetch(url)
  const expenses = await res.json()

  list.innerHTML = ""
  let total = 0

  expenses.forEach(e => {
    total += Number(e.amount)
    list.innerHTML += `<li>${e.date} - ${e.category} - ₹${e.amount}</li>`
  })

  totalEl = document.getElementById("total")
  totalEl.innerText = "Total: ₹" + total.toFixed(2)
}
