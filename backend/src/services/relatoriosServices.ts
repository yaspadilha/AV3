import { prisma } from "../database/prisma";

export class RelatoriosService {
  async listarRelatorios() {
    return await prisma.aeronaves.findMany({
      include: {
        pecas: true,
        etapas: true,
        teste: true
      }
    });
  }
}