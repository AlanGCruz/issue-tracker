import { type Issue } from "../../types/issues";

export function IssueCard({ issue }: { issue: Issue }) {
  return (
    <div className="card">
      <h3>{issue.title}</h3>
      <p>{issue.description}</p>
      <div className="issue-card-labels">
        Priority<span className={`pill pill--${issue.priority}`}>{issue.priority}</span>
        Status<span className="pill">{issue.status}</span>
      </div>
    </div>
  )
}