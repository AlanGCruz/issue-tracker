import { Router, type RequestHandler } from "express";
import  controller  from "./controller";

export interface IssuesController {
  list: RequestHandler;
  create: RequestHandler;
  update: RequestHandler;
  remove: RequestHandler;
}

const r = Router();

r.get("/", controller.list);
r.post("/", controller.create);
r.patch("/:id", controller.update);
r.delete("/:id", controller.remove);

export default r;