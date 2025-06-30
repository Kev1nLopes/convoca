/*
  Warnings:

  - A unique constraint covering the columns `[courtId,date,startTime]` on the table `booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "booking_courtId_date_startTime_key" ON "public"."booking"("courtId", "date", "startTime");
