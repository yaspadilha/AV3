-- CreateTable
CREATE TABLE `Aeronaves` (
    `codigo` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo` ENUM('militar', 'comercial') NOT NULL,
    `tipo_aeronave` ENUM('militar', 'comercial') NOT NULL,
    `capacidade` INTEGER NULL,
    `alcance` INTEGER NULL,
    `id_teste` INTEGER NULL,

    PRIMARY KEY (`codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Funcionarios` (
    `id_funcionario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `telefone` VARCHAR(191) NULL,
    `endereco` VARCHAR(191) NULL,
    `nome_usuario` VARCHAR(191) NULL,
    `senha` VARCHAR(191) NULL,
    `nivel_permissao` ENUM('administrador', 'engenheiro', 'operador') NOT NULL,

    PRIMARY KEY (`id_funcionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pecas` (
    `id_peca` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `tipo` ENUM('nacional', 'importada') NOT NULL,
    `fornecedor` VARCHAR(191) NULL,
    `status` ENUM('em producao', 'em transporte', 'pronta') NOT NULL,
    `codigo` INTEGER NOT NULL,

    PRIMARY KEY (`id_peca`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Etapas` (
    `id_etapa` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `prazo` DATETIME(3) NULL,
    `status` ENUM('pendente', 'em andamento', 'concluida') NOT NULL,
    `codigo` INTEGER NOT NULL,
    `id_funcionario` INTEGER NOT NULL,

    PRIMARY KEY (`id_etapa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testes` (
    `id_teste` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('hidraulico', 'eletrico', 'aerodinamico') NOT NULL,
    `data_realizacao` DATETIME(3) NULL,
    `resultado` ENUM('aprovado', 'reprovado') NOT NULL,
    `id_funcionario` INTEGER NOT NULL,

    PRIMARY KEY (`id_teste`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Aeronaves` ADD CONSTRAINT `Aeronaves_id_teste_fkey` FOREIGN KEY (`id_teste`) REFERENCES `Testes`(`id_teste`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pecas` ADD CONSTRAINT `Pecas_codigo_fkey` FOREIGN KEY (`codigo`) REFERENCES `Aeronaves`(`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Etapas` ADD CONSTRAINT `Etapas_codigo_fkey` FOREIGN KEY (`codigo`) REFERENCES `Aeronaves`(`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Etapas` ADD CONSTRAINT `Etapas_id_funcionario_fkey` FOREIGN KEY (`id_funcionario`) REFERENCES `Funcionarios`(`id_funcionario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Testes` ADD CONSTRAINT `Testes_id_funcionario_fkey` FOREIGN KEY (`id_funcionario`) REFERENCES `Funcionarios`(`id_funcionario`) ON DELETE RESTRICT ON UPDATE CASCADE;
