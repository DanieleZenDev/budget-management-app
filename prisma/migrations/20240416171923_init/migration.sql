-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expenses" (
    "id" SERIAL NOT NULL,
    "Category" TEXT NOT NULL,
    "Expense" TEXT NOT NULL,
    "Import" INTEGER NOT NULL,
    "Month" TEXT NOT NULL,
    "Year" TEXT NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incomes" (
    "id" SERIAL NOT NULL,
    "Category" TEXT NOT NULL,
    "Income" TEXT NOT NULL,
    "Import" INTEGER NOT NULL,
    "Month" TEXT NOT NULL,
    "Year" TEXT NOT NULL,

    CONSTRAINT "Incomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Savings" (
    "id" SERIAL NOT NULL,
    "Category" TEXT NOT NULL,
    "Saving" TEXT NOT NULL,
    "Import" INTEGER NOT NULL,
    "Month" TEXT NOT NULL,
    "Year" TEXT NOT NULL,

    CONSTRAINT "Savings_pkey" PRIMARY KEY ("id")
);
