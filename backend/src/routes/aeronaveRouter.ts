import { AeronavesController } from "../controllers/aeronaveController";

const controller = new AeronavesController();

export async function aeronavesRouter(req: any, res: any) {
  if (req.method === "POST" && req.url === "/aeronaves") {
    return await controller.criar(req, res);
  }

  if (req.method === "GET" && req.url === "/aeronaves") {
    return await controller.listar(req, res);
  }
}