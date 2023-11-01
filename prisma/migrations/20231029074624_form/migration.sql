-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);
