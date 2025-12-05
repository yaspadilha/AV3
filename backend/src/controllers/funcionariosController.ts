import { IncomingMessage, ServerResponse } from "http";
import { FuncionariosService } from "../services/funcionariosService";

const service = new FuncionariosService();

export class FuncionariosController {
  async criar(req: IncomingMessage, res: ServerResponse) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const novoFuncionario = await service.criarFuncionario(data);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(novoFuncionario));
      } catch (err: any) {
        console.error(err);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ erro: "Erro ao cadastrar funcionário. Verifique os campos." }));
      }
    });
  }

  async listar(req: IncomingMessage, res: ServerResponse) {
    try {
        const funcionarios = await service.listarFuncionarios();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(funcionarios));
    } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ erro: "Erro ao buscar funcionários" }));
    }
  }

  async login(req: IncomingMessage, res: ServerResponse) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const { usuario, senha } = JSON.parse(body);

        const funcionario = await service.buscarPorUsuario(usuario);

        if (!funcionario) {
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ erro: "Usuário não encontrado." }));
          return;
        }

        if (funcionario.senha !== senha) {
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ erro: "Senha incorreta." }));
          return;
        }
        
        const { senha: _, ...dadosUsuario } = funcionario;
        
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(dadosUsuario));

      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ erro: "Erro interno no servidor." }));
      }
    });
  }
  
}