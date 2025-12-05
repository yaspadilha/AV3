import { IncomingMessage, ServerResponse } from "http";
import { EtapasController } from "../controllers/etapasController";

const controller = new EtapasController();

export async function etapasRouter(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "POST" && req.url === "/etapas") {
    return await controller.criar(req, res);
  }

  if (req.method === "GET" && req.url === "/etapas") {
    return await controller.listar(req, res);
  }
}