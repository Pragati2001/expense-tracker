// export default function Filters({ expenses, selected, onChange }) {
//   const categories = ["ALL", ...new Set(expenses.map(e => e.category))];

//   return (
//     <div style={{ marginBottom: 10 }}>
//       <label>
//         Filter by category:{" "}
//         <select value={selected} onChange={(e) => onChange(e.target.value)}>
//           {categories.map((c) => (
//             <option key={c} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>
//       </label>
//     </div>
//   );
// }
export default function Filters({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ marginRight: 10 }}>
        Category:
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          style={{ marginLeft: 6 }}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label>
        Sort:
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          style={{ marginLeft: 6 }}
        >
          <option value="date_desc">Newest first</option>
        </select>
      </label>
    </div>
  );
}
