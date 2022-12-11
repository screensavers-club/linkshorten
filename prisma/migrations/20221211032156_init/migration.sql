-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "target" VARCHAR NOT NULL,
    "slug" CHAR NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);
