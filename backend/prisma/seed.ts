import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando a semeadura do banco de dados...')

  const admin = await prisma.funcionarios.upsert({
    where: { id_funcionario: 1 },
    update: {},
    create: {
      nome: 'Admin Chefe',
      nome_usuario: 'administrador@gmail.com',
      senha: '123',
      nivel_permissao: 'administrador',
      telefone: '11999999999',
      endereco: 'Sede Aerocode'
    },
  })

  const engenheiro = await prisma.funcionarios.upsert({
    where: { id_funcionario: 2 },
    update: {},
    create: {
      nome: 'Engenheiro Chefe',
      nome_usuario: 'engenheiro@gmail.com',
      senha: '123',
      nivel_permissao: 'engenheiro',
      telefone: '11888888888',
      endereco: 'Hangar 1'
    },
  })

  const operador = await prisma.funcionarios.upsert({
    where: { id_funcionario: 3 },
    update: {},
    create: {
      nome: 'Operador de Máquina',
      nome_usuario: 'operador@gmail.com',
      senha: '123',
      nivel_permissao: 'operador',
      telefone: '11777777777',
      endereco: 'Fábrica'
    },
  })

  console.log('Usuários criados:')
  console.log({ admin, engenheiro, operador })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })