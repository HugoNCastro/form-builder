/*
  Warnings:

  - Added the required column `agent` to the `form_submissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "form_submissions" ADD COLUMN     "agent" TEXT NOT NULL;
