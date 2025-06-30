/*
  Warnings:

  - You are about to drop the column `location` on the `court` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `court` table. All the data in the column will be lost.
  - Added the required column `price` to the `court` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."court" DROP CONSTRAINT "court_ownerId_fkey";

-- AlterTable
ALTER TABLE "public"."court" DROP COLUMN "location",
DROP COLUMN "ownerId",
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."SportCenter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "open_hour" TIMESTAMP(3) NOT NULL,
    "end_hour" TIMESTAMP(3) NOT NULL,
    "logo_url" TEXT NOT NULL,

    CONSTRAINT "SportCenter_pkey" PRIMARY KEY ("id")
);
