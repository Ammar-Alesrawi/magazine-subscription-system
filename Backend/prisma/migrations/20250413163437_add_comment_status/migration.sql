/*
  Warnings:

  - Added the required column `status` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('ACTIVE', 'FLAGGED', 'DELETED');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "status" "CommentStatus" NOT NULL;
