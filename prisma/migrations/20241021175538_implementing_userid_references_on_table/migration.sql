-- AlterTable
ALTER TABLE "Expenses" ADD COLUMN     "UserId" INTEGER;

-- AlterTable
ALTER TABLE "Incomes" ADD COLUMN     "UserId" INTEGER;

-- AlterTable
ALTER TABLE "Savings" ADD COLUMN     "UserId" INTEGER;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incomes" ADD CONSTRAINT "Incomes_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Savings" ADD CONSTRAINT "Savings_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
