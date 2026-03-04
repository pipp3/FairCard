/*
  Warnings:

  - Made the column `exactModel` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vram` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vramType` on table `Listing` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Listing" ALTER COLUMN "exactModel" SET NOT NULL,
ALTER COLUMN "vram" SET NOT NULL,
ALTER COLUMN "vramType" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
