import { IncomingMessage, ServerResponse } from "http";
import { PecasController } from "../controllers/pecasController";

const controller = new PecasController();

export async function pecasRouter(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "POST" && req.url === "/pecas") {
    return await controller.criar(req, res);
  }

  if (req.method === "GET" && req.url === "/pecas") {
    return await controller.listar(req, res);
  }
}