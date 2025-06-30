/*
  Warnings:

  - You are about to drop the column `birthDate` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `SportCenter` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `active` to the `court` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sportCenterId` to the `court` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthdate` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."court" ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "sportCenterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "birthDate",
ADD COLUMN     "birthdate" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."SportCenter";

-- CreateTable
CREATE TABLE "public"."sport_center" (
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
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "sport_center_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."sport_center" ADD CONSTRAINT "sport_center_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
