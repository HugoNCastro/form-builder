/*
  Warnings:

  - You are about to drop the column `userId` on the `Form` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Form_name_userId_key";

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "userId";
