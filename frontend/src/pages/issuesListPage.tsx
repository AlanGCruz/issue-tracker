import { IssuesBoard } from "../components/issuesBoard";
import { IssuesTable } from "../components/issuesTable";
import { useIssuesContext } from "../state/issuesContext";
import "./styles.css"

export function IssuesListPage() {
  const { state, setView, setFilter } = useIssuesContext();
  const { loading, error, issues: items, filter, view } = state;

  return (
    <section>
      <div className="toolbar">
        <div role="group" aria-label="View">
          <button
            className={view === "board" ? "btn active" : "btn"}
            onClick={() => setView("board")}
          >Board</button>
          <button
            className={view === "table" ? "btn active" : "btn"}
            onClick={() => setView("table")}
          >Table</button>
        </div>
        <div>
          <label>
            Status:
            <select
              value={filter.status ?? ""}
              onChange={e => setFilter({ status: e.target.value as any || undefined })}
            >
              <option value="">All</option>
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </label>
        </div>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className="error" role="alert">{error}</p>}
      {!loading && !error && (
        view === "board" 
        ? <IssuesBoard items={items} filter={filter} /> 
        : <IssuesTable items={items} filter={filter} />
      )}
    </section>
  );
}