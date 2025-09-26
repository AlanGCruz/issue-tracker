import type { Request, Response, RequestHandler } from "express";
import { asyncHandler } from "../commons/asyncHandler";
import type {
  Issue,
  ListQuery,
  CreateIssueInput,
  UpdateIssueInput,
  Status,
  Priority,
} from "../types/issues";
import { createIssuesService, IssuesService } from "./service";
import { IssuesRepoSequelize } from "./repo";

const service: IssuesService = createIssuesService(new IssuesRepoSequelize());

export interface IssuesController {
  list: RequestHandler<{}, Issue[], {}, ListQuery>;
  create: RequestHandler<{}, Issue, CreateIssueInput>;
  update: RequestHandler<{ id: string }, Issue, UpdateIssueInput>;
  remove: RequestHandler<{ id: string }>;
}

/** GET /api/issues?status=&priority= */
export const list: IssuesController["list"] = asyncHandler<
  {},
  Issue[],
  {},
  ListQuery
>(async (req, res) => {
  const data = await service.list(req.query);
  res.json(data);
});

/** POST /api/issues */
export const create: IssuesController["create"] = asyncHandler<
  {},
  Issue,
  CreateIssueInput
>(async (req, res) => {
  const created = await service.create(req.body);
  res.status(201).json(created);
});

/** PATCH /api/issues/:id */
const update: IssuesController["update"] = asyncHandler<
  { id: string },
  Issue,
  UpdateIssueInput
>(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id))
    return res.status(400).json({ error: "Invalid id" } as any);
  const updated = await service.update(id, req.body);
  res.json(updated);
});

/** DELETE /api/issues/:id */
const remove: IssuesController["remove"] = asyncHandler<{ id: string }>(
  async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id))
      return res.status(400).json({ error: "Invalid id" } as any);
    await service.remove(id);
    res.status(204).end();
  }
);

// Optional default export if your router imports a single object
const controller: IssuesController = { list, create, update, remove };
export default controller;
