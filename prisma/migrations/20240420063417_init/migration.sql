/*
  Warnings:

  - Added the required column `User` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `User` to the `Incomes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `User` to the `Savings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expenses" ADD COLUMN     "User" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Incomes" ADD COLUMN     "User" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Savings" ADD COLUMN     "User" TEXT NOT NULL;
