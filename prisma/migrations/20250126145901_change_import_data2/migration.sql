/*
  Warnings:

  - You are about to alter the column `Import` on the `Expenses` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,3)` to `Decimal(10,2)`.
  - You are about to alter the column `Import` on the `Incomes` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,3)` to `Decimal(10,2)`.
  - You are about to alter the column `Import` on the `Savings` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,3)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Expenses" ALTER COLUMN "Import" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Incomes" ALTER COLUMN "Import" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Savings" ALTER COLUMN "Import" SET DATA TYPE DECIMAL(10,2);
