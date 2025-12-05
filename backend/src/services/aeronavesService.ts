import { prisma } from "../database/prisma";

export class AeronavesService {
  async criarAeronave(data: any) {
    return await prisma.aeronaves.create({ data });
  }

  async listarAeronaves() {
    return await prisma.aeronaves.findMany();
  }
}