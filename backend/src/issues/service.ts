import type {
  Issue,
  ListQuery,
  CreateIssueInput,
  UpdateIssueInput,
  Status,
  Priority,
} from "../types/issues";
import type { IssuesRepo } from "./repo";

// Optional: tiny runtime guards
const STATUSES = new Set<Status>(["todo", "in-progress", "done"]);
const PRIORITIES = new Set<Priority>(["low", "med", "high"]);
const isStatus = (x: unknown): x is Status =>
  typeof x === "string" && STATUSES.has(x as Status);
const isPriority = (x: unknown): x is Priority =>
  typeof x === "string" && PRIORITIES.has(x as Priority);

// Factory returns a service object bound to a specific repo implementation
export function createIssuesService(repo: IssuesRepo) {
  return {
    async list(query: ListQuery): Promise<Issue[]> {
      const q: ListQuery = {};
      if (query.status) {
        if (!isStatus(query.status))
          throw new Error("ValidationError: invalid status");
        q.status = query.status;
      }
      if (query.priority) {
        if (!isPriority(query.priority))
          throw new Error("ValidationError: invalid priority");
        q.priority = query.priority;
      }
      return repo.list(q);
    },

    async getById(id: number): Promise<Issue | null> {
      if (!Number.isFinite(id)) throw new Error("ValidationError: invalid id");
      return repo.getById(id);
    },

    async create(input: CreateIssueInput): Promise<Issue> {
      if (!input?.title || !input.title.trim()) {
        throw new Error("ValidationError: title is required");
      }
      if (input.status && !isStatus(input.status)) {
        throw new Error("ValidationError: invalid status");
      }
      if (input.priority && !isPriority(input.priority)) {
        throw new Error("ValidationError: invalid priority");
      }
      return repo.create({
        title: input.title.trim(),
        description: input.description,
        status: input.status,
        priority: input.priority,
      });
    },

    async update(id: number, input: UpdateIssueInput): Promise<Issue> {
      if (!Number.isFinite(id)) throw new Error("ValidationError: invalid id");
      if (input.title !== undefined && !input.title.trim()) {
        throw new Error("ValidationError: title cannot be empty");
      }
      if (input.status !== undefined && !isStatus(input.status)) {
        throw new Error("ValidationError: invalid status");
      }
      if (input.priority !== undefined && !isPriority(input.priority)) {
        throw new Error("ValidationError: invalid priority");
      }
      return repo.update(id, {
        ...input,
        ...(input.title !== undefined ? { title: input.title.trim() } : {}),
      });
    },

    async remove(id: number): Promise<void> {
      if (!Number.isFinite(id)) throw new Error("ValidationError: invalid id");
      await repo.delete(id);
    },
  };
}

// Export a type for the service instance
export type IssuesService = ReturnType<typeof createIssuesService>;
