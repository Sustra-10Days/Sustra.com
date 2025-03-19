import { PrismaClient, Inventory, Charm } from "@prisma/client";
import { addCharmtoInventory } from "./inventory.js";

const prisma = new PrismaClient();

type RandomizedCharmResult = {
  charm: Charm;
  inventory: Inventory;
};

export const randomizeCharm = async (userId: string) => {
  const currentInventory = await prisma.inventory.count({ where: { userId }});
  
  if (currentInventory >= 3) {
    throw new Error("Inventory full! Cannot randomize more charms.")
  }

  const remainingSlots = 3 - currentInventory;


  const availableCharms = await prisma.charm.findMany({
    where: {availableQuantity: { gt: 0 }}
  })

  if (availableCharms.length === 0){
    throw new Error("No available charms to randomize.");
  }

  const randomizedCharms: RandomizedCharmResult[] = [];

  for (let i = 0; i < remainingSlots; i++){
    if (availableCharms.length === 0) break;
    
    const randomIndex = Math.floor(Math.random() * availableCharms.length);
    const selectedCharm = availableCharms[randomIndex];

    const existing = await prisma.inventory.findFirst({
      where: {
        userId,
        charmId: selectedCharm.id,
      },
    });
  
    if (existing) { // Skip, try next
      i--;
      continue;
    }

    const InventoryEntry = await addCharmtoInventory(userId, selectedCharm.id, "market");
    
    
    randomizedCharms.push({
      charm: selectedCharm,
      inventory: InventoryEntry, 
    });

    availableCharms[randomIndex].availableQuantity -= 1;
    if (availableCharms[randomIndex].availableQuantity === 0) {
      availableCharms.splice(randomIndex, 1); // Remove if out of stock
    }

    if (availableCharms.length === 0) break; // No more charms left
  }

  return {
    message: `Randomized ${randomizedCharms.length} charm(s) successfully!`,
    results: randomizedCharms,
  };
};

export const randomizeCharmResolvers = {
  Mutation: {
    randomizeCharm: async (_: any, { userId }: { userId: string }) => {
    try {
        const result = await randomizeCharm(userId);
        return result;
    }catch (error: any) {
        throw new Error(error.message);
    }
    },
  }
}





