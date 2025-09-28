import { type Status, type Issue, type ListQuery } from "../../types/issues";
import { IssueCard } from "./issueCard";
import "./styles.css"
export function IssuesBoard({ items, filter }: { items: Issue[]; filter: ListQuery }) {
  const statuses: Status[] = ["todo", "in-progress", "done"];
  const filteredItems = filter.status ? items.filter(i => i.status === filter.status) : items;
  return (
    <div className="board">
      {statuses.map((status: Status) => (
        <div key={status} className="board-column">
          <h3 className="board-title">{status.toUpperCase()}</h3>
          <div className="issues-cards-container">
            {filteredItems.filter((item: Issue) => item.status === status).map((item: Issue) => <IssueCard issue={item} />)}
          </div>
        </div>
      ))}
    </div>
  );
}