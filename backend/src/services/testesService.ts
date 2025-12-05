import { prisma } from "../database/prisma";

export class TestesService {
  async criarTeste(data: any) {
    const { codigo_aeronave, ...rest } = data;

    return await prisma.testes.create({
      data: {
        ...rest,
        aeronaves: codigo_aeronave ? {
          connect: { codigo: Number(codigo_aeronave) }
        } : undefined
      }
    });
  }

  async listarTestes() {
    return await prisma.testes.findMany({
      include: {
        funcionario: true,
        aeronaves: true
      }
    });
  }
}