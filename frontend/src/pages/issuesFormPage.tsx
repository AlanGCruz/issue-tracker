import { useParams } from "react-router-dom";
import { statuses } from "../commons/constants";
import { useEffect, useState } from "react";
import { useIssuesContext } from "../state/issuesContext";
import { issuesApiActions } from "../api/issues";
import type { Status, UpdateIssueInput } from "../types/issues";

export function IssueFormPage({ mode }: { mode: "create" | "edit" }) {
  const { id } = useParams()
  const { get } = issuesApiActions;
  // const {add, update} = useIssuesContext();
  const [issue, setIssue] = useState<UpdateIssueInput>({ title: "", description: "", status: "todo", priority: "med" });
  useEffect(() => {
    if (mode === "edit" && id) {
      (async () => {
        try {
          const data: UpdateIssueInput = await get(Number(id));
          setIssue(data);
        } catch (e) {
          console.error(e);
        }
      })()
    }
  }, [mode]);

  return (
    <>
      <h2>{mode === "create" ? "Create New Issue" : "Edit Issue"}</h2>
      <form className="form-container">
        <label htmlFor="title">
          Title:
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={issue.title || ""}
          onChange={e => setIssue({ ...issue, title: e.target.value })}
        />
        <label htmlFor="description">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={issue.description || ""}
          onChange={e => setIssue({ ...issue, description: e.target.value })}
        />
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={issue.status}
          onChange={e => setIssue({ ...issue, status: e.target.value as Status })}
        >
          {statuses.map(status => (<option key={status} value={status}>{status}</option>))}
        </select>
        <button type="submit">Save</button>
      </form>
    </>
  );
}