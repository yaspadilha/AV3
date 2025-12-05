import { IncomingMessage, ServerResponse } from "http";
import { FuncionariosController } from "../controllers/funcionariosController";

const controller = new FuncionariosController();

export async function funcionariosRouter(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "POST" && req.url === "/funcionarios") {
    return await controller.criar(req, res);
  }

  if (req.method === "GET" && req.url === "/funcionarios") {
    return await controller.listar(req, res);
  }
}