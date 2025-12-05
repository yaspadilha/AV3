import { IncomingMessage, ServerResponse } from "http";
import { RelatoriosController } from "../controllers/relatoriosController";

const controller = new RelatoriosController();

export async function relatoriosRouter(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "GET" && req.url === "/relatorios") {
    return await controller.listar(req, res);
  }
}