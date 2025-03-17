import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const removeExpiredCharms = async () =>{
  const now = new Date();

  const expiredCharms = await prisma.inventory.findMany({
    where: {
      expiresAt: { lte: now },
    },
  });
  
  if (expiredCharms.length === 0){
    console.log("No expired charms found.")
    return;
  }

  for (const item of expiredCharms) {
    await prisma.$transaction([
      prisma.inventory.delete({
        where: { id: item.id },
      }),
      prisma.charm.update({
        where: { id: item.charmId },
        data: { availableQuantity: { increment: 1 } },
      }),
    ]);
  }


}