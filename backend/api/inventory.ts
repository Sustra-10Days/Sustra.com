import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserInventory = async (userId: string) => {
  return await prisma.inventory.findMany({
    where: {userId},
    include: { charm: true }
  });
};

export const addCharmtoInventory = async (userId: string, charmId: string, source: "random" | "market") => {
  const currentAmount = await prisma.inventory.count({ where: { userId } });

  if (currentAmount >= 3){
    throw new Error("Inventory full! You can only hold 3 charms at a time.")
  }
  if (source === "market") {
    const charm = await prisma.charm.findUnique({
      where: {id: charmId}
    })

    if(!charm){
      throw new Error("Charm not found");
    }
    if(charm.availableQuantity <= 0){
      throw new Error("Charm is out of stock.");
    }

    await prisma.charm.update({
      where: {id: charmId},
      data: { availableQuantity: {decrement: 1} },
    })
  }

  if (source === 'random') {
    const lastRandomized = await prisma.user.findUnique({
      where: { id: userId },
      select: { lastRandomized: true },
    });
    const now = new Date();
    if (lastRandomized?.lastRandomized && new Date(lastRandomized.lastRandomized).toDateString() === now.toDateString()) {
      throw new Error("You have already randomized a charm today.");
    }

    await prisma.user.update({
      where: { id: userId },
      data: { lastRandomized: now },
    });
  }

  return await prisma.inventory.create({
    data: {
      userId,
      charmId,
      acquiredAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });
}
