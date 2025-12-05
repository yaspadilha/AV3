import { prisma } from "../database/prisma";

export class EtapasService {
  async criarEtapa(data: any) {
    return await prisma.etapas.create({ data });
  }

  async listarEtapas() {
    return await prisma.etapas.findMany({
      include: {
        aeronave: true,
        funcionario: true
      }
    });
  }
}