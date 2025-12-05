import { IncomingMessage, ServerResponse } from "http";
import { RelatoriosService } from "../services/relatoriosServices";

const service = new RelatoriosService();

export class RelatoriosController {
  async listar(req: IncomingMessage, res: ServerResponse) {
    try {
        const relatorios = await service.listarRelatorios();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(relatorios));
    } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ erro: "Erro ao gerar relatórios" }));
    }
  }
}