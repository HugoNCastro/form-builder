-- DropForeignKey
ALTER TABLE "form_submissions" DROP CONSTRAINT "form_submissions_formId_fkey";

-- AddForeignKey
ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_formId_fkey" FOREIGN KEY ("formId") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
