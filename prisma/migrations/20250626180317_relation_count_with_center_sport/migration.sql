-- AddForeignKey
ALTER TABLE "public"."court" ADD CONSTRAINT "court_sportCenterId_fkey" FOREIGN KEY ("sportCenterId") REFERENCES "public"."sport_center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
