/*
  Warnings:

  - You are about to drop the column `spec` on the `Picture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Picture" DROP COLUMN "spec",
ADD COLUMN     "isMenu" BOOLEAN NOT NULL DEFAULT false;
