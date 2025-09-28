import { type Issue, type ListQuery } from "../../types/issues";
import { Link } from "react-router-dom";
import "./styles.css"

export function IssuesTable({ items, filter }: { items: Issue[]; filter: ListQuery }) {
  const rows = filter.status ? items.filter(i => i.status === filter.status) : items;
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr><th>Title</th><th>Status</th><th>Priority</th><th>Created At</th><th></th></tr>
        </thead>
        <tbody>
          {rows && rows.map(i => (
            <tr key={i.id}>
              <td>{i.title}</td>
              <td>{i.status}</td>
              <td>{i.priority}</td>
              <td>{i.created_at ? new Date(i.created_at).toLocaleString() : "—"}</td>
              <td><Link to={`/issues/${i.id}/edit`} className="link">Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}