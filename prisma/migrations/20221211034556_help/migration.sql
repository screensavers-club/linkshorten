/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "target" SET DATA TYPE TEXT,
ALTER COLUMN "slug" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Link_slug_key" ON "Link"("slug");
