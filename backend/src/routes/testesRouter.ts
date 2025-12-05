import { IncomingMessage, ServerResponse } from "http";
import { TestesController } from "../controllers/testesController";

const controller = new TestesController();

export async function testesRouter(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "POST" && req.url === "/testes") {
    return await controller.criar(req, res);
  }

  if (req.method === "GET" && req.url === "/testes") {
    return await controller.listar(req, res);
  }
}