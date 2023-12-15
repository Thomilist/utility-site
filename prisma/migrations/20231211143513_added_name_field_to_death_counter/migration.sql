/*
  Warnings:

  - Added the required column `name` to the `DeathCounter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeathCounter" ADD COLUMN     "name" TEXT NOT NULL;
