/*
  Warnings:

  - You are about to drop the column `price` on the `Charm` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Charm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rarity` to the `Charm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQuantity` to the `Charm` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('LOVE', 'STUDY', 'MONEY', 'HEALTH');

-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'RARE');

-- AlterEnum
ALTER TYPE "Major" ADD VALUE 'CEDT';

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_charmId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- AlterTable
ALTER TABLE "Charm" DROP COLUMN "price",
ADD COLUMN     "availableQuantity" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "category" "Category" NOT NULL,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "rarity" "Rarity" NOT NULL,
ADD COLUMN     "totalQuantity" INTEGER NOT NULL,
ADD COLUMN     "variant" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "faculty" TEXT,
ADD COLUMN     "profileImage" TEXT;

-- DropTable
DROP TABLE "Order";

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "charmId" TEXT NOT NULL,
    "acquiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "charmId" TEXT NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_charmId_fkey" FOREIGN KEY ("charmId") REFERENCES "Charm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_charmId_fkey" FOREIGN KEY ("charmId") REFERENCES "Charm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
