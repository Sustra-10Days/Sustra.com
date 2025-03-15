-- CreateEnum
CREATE TYPE "Major" AS ENUM ('COMPUTER', 'CEDT', 'CHEMICAL', 'MECHANICAL', 'ELECTRICAL', 'PETROLEUM', 'CIVIL', 'INDUSTRIAL', 'SURVEY', 'ENVIRONMENTAL', 'NUCLEAR', 'ADME', 'NANO', 'ICE', 'AERO', 'AI');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('LOVE', 'STUDY', 'MONEY', 'HEALTH');

-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'RARE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "lastRandomized" TIMESTAMP(3),
    "googleId" TEXT NOT NULL,
    "studentId" TEXT,
    "year" INTEGER,
    "faculty" TEXT,
    "major" "Major",
    "profileImage" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Charm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "imageUrl" TEXT,
    "quote" TEXT NOT NULL,
    "variant" TEXT,
    "rarity" "Rarity" NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "availableQuantity" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Charm_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_studentId_key" ON "User"("studentId");

-- CreateIndex
CREATE INDEX "Inventory_userId_idx" ON "Inventory"("userId");

-- CreateIndex
CREATE INDEX "Inventory_charmId_idx" ON "Inventory"("charmId");

-- CreateIndex
CREATE INDEX "Wishlist_userId_idx" ON "Wishlist"("userId");

-- CreateIndex
CREATE INDEX "Wishlist_charmId_idx" ON "Wishlist"("charmId");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_charmId_fkey" FOREIGN KEY ("charmId") REFERENCES "Charm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_charmId_fkey" FOREIGN KEY ("charmId") REFERENCES "Charm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
