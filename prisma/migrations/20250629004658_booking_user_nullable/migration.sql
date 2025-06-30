-- DropForeignKey
ALTER TABLE "public"."booking" DROP CONSTRAINT "booking_userId_fkey";

-- AlterTable
ALTER TABLE "public"."booking" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."booking" ADD CONSTRAINT "booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
