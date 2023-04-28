/*
  Warnings:

  - You are about to drop the `UserConversation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserConversation` DROP FOREIGN KEY `UserConversation_conversation_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserConversation` DROP FOREIGN KEY `UserConversation_user_id_fkey`;

-- DropTable
DROP TABLE `UserConversation`;

-- CreateTable
CREATE TABLE `_UserToconversation` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_UserToconversation_AB_unique`(`A`, `B`),
    INDEX `_UserToconversation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserToconversation` ADD CONSTRAINT `_UserToconversation_A_fkey` FOREIGN KEY (`A`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserToconversation` ADD CONSTRAINT `_UserToconversation_B_fkey` FOREIGN KEY (`B`) REFERENCES `conversation`(`conversation_id`) ON DELETE CASCADE ON UPDATE CASCADE;
