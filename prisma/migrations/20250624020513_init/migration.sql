/*
  Warnings:

  - Added the required column `birthDate` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL;
