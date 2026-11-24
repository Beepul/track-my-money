/*
  Warnings:

  - The values [SYSTEM] on the enum `AppTheme` will be removed. If these variants are still used in the database, this will fail.
  - The values [DAILY] on the enum `DashboardPeriod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AppTheme_new" AS ENUM ('LIGHT', 'DARK');
ALTER TABLE "UserPreference" ALTER COLUMN "theme" DROP DEFAULT;
ALTER TABLE "UserPreference" ALTER COLUMN "theme" TYPE "AppTheme_new" USING ("theme"::text::"AppTheme_new");
ALTER TYPE "AppTheme" RENAME TO "AppTheme_old";
ALTER TYPE "AppTheme_new" RENAME TO "AppTheme";
DROP TYPE "AppTheme_old";
ALTER TABLE "UserPreference" ALTER COLUMN "theme" SET DEFAULT 'LIGHT';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "DashboardPeriod_new" AS ENUM ('WEEKLY', 'MONTHLY', 'YEARLY');
ALTER TABLE "UserPreference" ALTER COLUMN "defaultPeriod" DROP DEFAULT;
ALTER TABLE "UserPreference" ALTER COLUMN "defaultPeriod" TYPE "DashboardPeriod_new" USING ("defaultPeriod"::text::"DashboardPeriod_new");
ALTER TYPE "DashboardPeriod" RENAME TO "DashboardPeriod_old";
ALTER TYPE "DashboardPeriod_new" RENAME TO "DashboardPeriod";
DROP TYPE "DashboardPeriod_old";
ALTER TABLE "UserPreference" ALTER COLUMN "defaultPeriod" SET DEFAULT 'MONTHLY';
COMMIT;

-- AlterTable
ALTER TABLE "UserPreference" ALTER COLUMN "theme" SET DEFAULT 'LIGHT';
