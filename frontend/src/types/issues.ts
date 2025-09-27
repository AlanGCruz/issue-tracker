export type Status = "todo" | "in-progress" | "done";
export type Priority = "low" | "med" | "high";

export interface Issue {
  id: number;
  title: string;
  description?: string | null;
  status: Status;
  priority: Priority;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface ListQuery {
  status?: Status;
  priority?: Priority;
}

export interface CreateIssueInput {
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
}

export interface UpdateIssueInput {
  title?: string;
  description?: string | null;
  status?: Status;
  priority?: Priority;
}