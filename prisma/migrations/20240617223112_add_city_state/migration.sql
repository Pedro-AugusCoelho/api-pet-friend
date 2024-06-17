/*
  Warnings:

  - Added the required column `city` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_city` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_state` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "cod_city" TEXT NOT NULL,
ADD COLUMN     "cod_state" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
