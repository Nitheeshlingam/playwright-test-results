-- CreateTable
CREATE TABLE `TestRun` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `githubRunId` VARCHAR(191) NOT NULL,
    `commitSha` VARCHAR(191) NOT NULL,
    `developer` VARCHAR(191) NOT NULL,
    `branch` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `event` VARCHAR(191) NULL,
    `repository` VARCHAR(191) NOT NULL,
    `startedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `TestRun_githubRunId_key`(`githubRunId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
