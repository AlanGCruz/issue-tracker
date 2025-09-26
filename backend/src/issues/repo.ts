import type {
  CreateIssueInput,
  Issue,
  ListQuery,
  Priority,
  Status,
  UpdateIssueInput,
} from "../types/issues";
import { Issue as IssueModel } from "../db/models/Issue";

export interface IssuesRepo {
  list(query: ListQuery): Promise<Issue[]>;
  getById(id: number): Promise<Issue | null>;
  create(input: CreateIssueInput): Promise<Issue>;
  update(id: number, input: UpdateIssueInput): Promise<Issue>;
  delete(id: number): Promise<boolean>;
}

function toDTO(row: IssueModel) {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    status: row.status as Status,
    priority: row.priority as Priority,
    created_at: row.created_at?.toISOString(),
    updated_at: row.updated_at?.toISOString(),
  };
}

export class IssuesRepoSequelize implements IssuesRepo {
  async list(query: ListQuery): Promise<Issue[]> {
    const where: any = {};
    if (query.status) {
      where.status = query.status;
    }
    if (query.priority) {
      where.priority = query.priority;
    }
    const rows = await IssueModel.findAll({
      where,
      order: [["created_at", "DESC"]],
    });
    return rows.map(toDTO);
  }

  async getById(id: number): Promise<Issue | null> {
    const row = await IssueModel.findByPk(id);
    return row ? toDTO(row) : null;
  }

  async create(input: CreateIssueInput): Promise<Issue> {
    const row = await IssueModel.create({
      title: input.title,
      description: input.description ?? null,
      status: (input.status ?? "todo") as Status,
      priority: (input.priority ?? "med") as Priority,
    });
    return toDTO(row);
  }

  async update(id: number, input: UpdateIssueInput): Promise<Issue> {
    const row = await IssueModel.findByPk(id);
    if (!row) throw new Error("NotFound");

    await row.update({
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.description !== undefined
        ? { description: input.description ?? null }
        : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
      ...(input.priority !== undefined ? { priority: input.priority } : {}),
    });

    return toDTO(row);
  }

  async delete(id: number): Promise<boolean> {
    const result = await IssueModel.destroy({ where: { id }});
    return result > 0;
  }
}
