import { IncomingMessage, ServerResponse } from "http";
import { PecasService } from "../services/pecasService";

const service = new PecasService();

export class PecasController {
  async criar(req: IncomingMessage, res: ServerResponse) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const novaPeca = await service.criarPeca(data);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(novaPeca));
      } catch (err: any) {
        console.error(err);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ erro: "Erro ao criar peça. Verifique se o código da aeronave existe e os campos estão corretos." }));
      }
    });
  }

  async listar(req: IncomingMessage, res: ServerResponse) {
    try {
        const pecas = await service.listarPecas();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(pecas));
    } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ erro: "Erro ao buscar peças" }));
    }
  }
}