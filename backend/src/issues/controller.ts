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
  getById: RequestHandler<{ id: string }>;
  create: RequestHandler<{}, Issue, CreateIssueInput>;
  update: RequestHandler<{ id: string }, Issue, UpdateIssueInput>;
  delete: RequestHandler<{ id: string }>;
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

export const getById: IssuesController["getById"] = asyncHandler<{ id: string }>(
  async (req, res) => {
    const data = await service.getById(Number(req.params.id));
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
export const update: IssuesController["update"] = asyncHandler<
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
export const remove: IssuesController["delete"] = asyncHandler<{ id: string }>(
  async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id))
      return res.status(400).json({ error: "Invalid id" } as any);
    await service.remove(id);
    res.status(204).end();
  }
);

// Export the controller with all handlers
const controller: IssuesController = { list, getById, create, update, delete: remove };
export default controller;
