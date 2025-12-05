import { IncomingMessage, ServerResponse } from "http";
import { TestesService } from "../services/testesService";

const service = new TestesService();

export class TestesController {
  async criar(req: IncomingMessage, res: ServerResponse) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);

        if (data.data_realizacao) {
            data.data_realizacao = new Date(data.data_realizacao);
        } else {
            data.data_realizacao = new Date();
        }

        const novoTeste = await service.criarTeste(data);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(novoTeste));
      } catch (err: any) {
        console.error(err);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ erro: "Erro ao criar teste. Verifique IDs (Funcionário/Aeronave)." }));
      }
    });
  }

  async listar(req: IncomingMessage, res: ServerResponse) {
    try {
        const testes = await service.listarTestes();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(testes));
    } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ erro: "Erro ao buscar testes" }));
    }
  }
}