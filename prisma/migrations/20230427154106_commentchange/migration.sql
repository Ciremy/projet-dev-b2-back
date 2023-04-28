/*
  Warnings:

  - Added the required column `ride_id` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `ride_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_ride_id_fkey` FOREIGN KEY (`ride_id`) REFERENCES `Ride`(`ride_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
