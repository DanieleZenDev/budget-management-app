/*
  Warnings:

  - Changed the type of `Year` on the `Expenses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `Year` on the `Incomes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `Year` on the `Savings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "Year",
ADD COLUMN     "Year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Incomes" DROP COLUMN "Year",
ADD COLUMN     "Year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Savings" DROP COLUMN "Year",
ADD COLUMN     "Year" INTEGER NOT NULL;
