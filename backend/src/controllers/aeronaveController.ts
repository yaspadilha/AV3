import { AeronavesService } from "../services/aeronavesService";

const service = new AeronavesService();

export class AeronavesController {
  async criar(req: any, res: any) {
    let body = "";

    req.on("data", (chunk : Buffer) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);

        const novaAeronave = await service.criarAeronave(data);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(novaAeronave));
      } catch (err: any) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ erro: err.message }));
      }
    });
  }

  async listar(req: any, res: any) {
    const aeronaves = await service.listarAeronaves();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(aeronaves));
  }
}