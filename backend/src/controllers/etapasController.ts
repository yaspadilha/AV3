import { IncomingMessage, ServerResponse } from "http";
import { EtapasService } from "../services/etapasService";

const service = new EtapasService();

export class EtapasController {
  async criar(req: IncomingMessage, res: ServerResponse) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
   
        if (data.prazo) {
            data.prazo = new Date(data.prazo);
        }

        const novaEtapa = await service.criarEtapa(data);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(novaEtapa));
      } catch (err: any) {
        console.error(err);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ erro: "Erro ao criar etapa. Verifique IDs (Aeronave/Funcionário) e formato da data." }));
      }
    });
  }

  async listar(req: IncomingMessage, res: ServerResponse) {
    try {
        const etapas = await service.listarEtapas();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(etapas));
    } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ erro: "Erro ao buscar etapas" }));
    }
  }
}