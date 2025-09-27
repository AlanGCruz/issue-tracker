import React, { createContext, type ReactNode, useContext, useEffect, useReducer } from "react";
import type { CreateIssueInput, Issue, UpdateIssueInput } from "../types/issues";
import { issuesApiActions } from "../api/issues";
import type { IssuesApi } from "../api/issues";

type State = {
  issues: Issue[],
  loading: boolean,
  error: string | null,
  filter: { status?: Issue["status"], priority?: Issue["priority"] }
}

export type IssuesStore = {
  state: State,
  add: (issue: CreateIssueInput) => Promise<void>,
  update: (id: number, issue: UpdateIssueInput) => Promise<void>,
  remove: (id: number) => Promise<void>,
}

const initialState: State = {
  issues: [],
  loading: false,
  error: null,
  filter: {}
}

type Action =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS", payload: Issue[] }
  | { type: "LOAD_ERROR", error: string }
  | { type: "ADD", Item: Issue }
  | { type: "UPDATE", Item: Issue }
  | { type: "REMOVE", id: Number }

function reducer(s: State, action: Action): State {
  switch (action.type) {
    case "LOAD_START": return { ...s, loading: true, error: null };
    case "LOAD_SUCCESS": return { ...s, loading: false, issues: action.payload };
    case "LOAD_ERROR": return { ...s, loading: false, error: action.error };
    case "ADD": return { ...s, issues: [action.Item, ...s.issues] };
    case "UPDATE": return { ...s, issues: s.issues.map(item => item.id === action.Item.id ? action.Item : item) };
    case "REMOVE": return { ...s, issues: s.issues.filter(item => item.id !== action.id) };
  }
}

function useIssuesStore(api: IssuesApi): IssuesStore {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    (async () => {
      dispatch({ type: "LOAD_START" });
      try {
        const issues: Issue[] = await api.list();
        dispatch({ type: "LOAD_SUCCESS", payload: issues });
      } catch (e: any) {
        dispatch({ type: "LOAD_ERROR", error: e });
      }
    })()
  }, [api]);

  async function add(issue: CreateIssueInput) {
    try {
      const newIssue: Issue = await api.create(issue);
      dispatch({ type: "ADD", Item: newIssue });
    } catch (e) {
      console.error(e);
    }
  };

  async function update(id: number, issue: UpdateIssueInput) {
    try {
      const updated: Issue = await api.update(id, issue);
      dispatch({ type: "UPDATE", Item: updated });
    } catch (e) {
      console.error(e);
    }
  }

  async function remove(id: number) {
    try {
      await api.remove(id);
      dispatch({ type: "REMOVE", id });
    } catch (e) {
      console.error(e);
    }
  }

  return { state, add, update, remove };
}


const IssuesCtx = createContext<ReturnType<typeof useIssuesStore> | null>(null);

export function IssuesProvider({
  children,
  api = issuesApiActions, // default to real API, but inject fakes in tests
}: { children: ReactNode; api?: IssuesApi }) {
  const value = useIssuesStore(api);
  return <IssuesCtx value={value}>{children}</IssuesCtx>;
}

export function useIssuesContext() {
  const ctx = useContext(IssuesCtx);
  if (!ctx) throw new Error("useIssuesContext must be used within an IssuesProvider");
  return ctx
}
