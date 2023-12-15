/*
  Warnings:

  - Added the required column `sortIndex` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "sortIndex" INTEGER NOT NULL;
