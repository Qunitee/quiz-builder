/*
  Warnings:

  - Added the required column `order` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Option_questionId_idx";

-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Option_questionId_order_idx" ON "Option"("questionId", "order");
