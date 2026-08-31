CREATE TABLE `testresult` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `testRunId` INTEGER NOT NULL,
  `testName` VARCHAR(191) NOT NULL,
  `fileName` VARCHAR(191) NULL,
  `status` VARCHAR(191) NOT NULL,
  `durationMs` INTEGER NULL,
  `error` TEXT NULL,
  `screenshot` VARCHAR(191) NULL,
  `video` VARCHAR(191) NULL,
  `trace` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  INDEX `TestResult_testRunId_idx` (`testRunId`),
  PRIMARY KEY (`id`),

  CONSTRAINT `TestResult_testRunId_fkey`
    FOREIGN KEY (`testRunId`)
    REFERENCES `testrun` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;