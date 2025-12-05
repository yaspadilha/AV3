import { prisma } from "../database/prisma";

export class FuncionariosService {
  async criarFuncionario(data: any) {
    return await prisma.funcionarios.create({ data });
  }

  async listarFuncionarios() {
    return await prisma.funcionarios.findMany();
  }

  async buscarPorUsuario(nome_usuario: string) {
    return await prisma.funcionarios.findFirst({
      where: { nome_usuario }
    });
  }
}