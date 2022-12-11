/*
  Warnings:

  - You are about to alter the column `target` on the `Link` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "target" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "slug" SET DATA TYPE CHAR(6);
