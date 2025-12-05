import http, { IncomingMessage, ServerResponse } from "http";
import { aeronavesRouter } from "./src/routes/aeronaveRouter";
import { pecasRouter } from "./src/routes/pecasRouter";
import { funcionariosRouter } from "./src/routes/funcionariosRouter";
import { etapasRouter } from "./src/routes/etapasRouter";
import { testesRouter } from "./src/routes/testesRouter";
import { relatoriosRouter } from "./src/routes/relatoriosRouter";
import { FuncionariosController } from "./src/controllers/funcionariosController";

const PORT = 3000;
const funcionariosCtrl = new FuncionariosController();
// 2. Use os tipos na definição da função: (req: IncomingMessage, res: ServerResponse)
const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  // Configuração de CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Métricas
  const startProcessing = performance.now();
  console.log(`[${req.method}] ${req.url} - Recebido`);

  // Roteamento
  if (req.method === "POST" && req.url === "/login") {
    await funcionariosCtrl.login(req, res);
  }
  else if (req.url?.startsWith("/aeronaves")) {
    await aeronavesRouter(req, res);
  } 
  else if (req.url?.startsWith("/pecas")) {
    await pecasRouter(req, res);
  }
  else if (req.url?.startsWith("/funcionarios")) {
    await funcionariosRouter(req, res);
  }
  else if (req.url?.startsWith("/etapas")) {
    await etapasRouter(req, res);
  }
  else if (req.url?.startsWith("/testes")) {
    await testesRouter(req, res);
  }
  else if (req.url?.startsWith("/relatorios")) {
    await relatoriosRouter(req, res);
  }
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Rota não encontrada" }));
  }

  // Finalização da Métrica
  const endProcessing = performance.now();
  const processingTime = (endProcessing - startProcessing).toFixed(2);
  console.log(`[METRICA] Tempo de processamento: ${processingTime}ms`);
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});