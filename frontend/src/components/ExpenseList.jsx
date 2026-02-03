export default function ExpenseList({ expenses }) {
  if (!expenses.length) {
    return <p>No expenses found</p>;
  }

  return (
    <table width="100%" border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Description</th>
          <th>Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((e, i) => (
          <tr key={i}>
            <td>{e.date}</td>
            <td>{e.category}</td>
            <td>{e.description}</td>
            <td>
              ₹{Number(e.amount).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
