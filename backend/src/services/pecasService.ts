import { prisma } from "../database/prisma";

export class PecasService {
  async criarPeca(data: any) {
    return await prisma.pecas.create({ data });
  }

  async listarPecas() {
    return await prisma.pecas.findMany({
      include: {
        aeronave: true 
      }
    });
  }
}