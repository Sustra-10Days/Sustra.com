import { getUserInventory, addCharmtoInventory } from "../api/inventory";
import { randomizeCharm } from "../api/randomizer";
import { removeExpiredCharms } from "../api/expiration";

export const resolvers = {
  Query: {
    getUserInventory: async (_: any, { userId }: { userId: string }) => {
      try {
        const inventory = await getUserInventory(userId);
        return inventory;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    randomizeCharm: async (_: any, { userId }: { userId: string }) => {
      try {
        const result = await randomizeCharm(userId);
        return result;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    addCharmtoInventory: async (_: any, { userId, charmId, source }: { userId: string, charmId: string, source: "random" | "market" }) => {
      try {
        const inventoryEntry = await addCharmtoInventory(userId, charmId, source);
        return inventoryEntry;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    removeExpiredCharms: async () => {
      try {
        await removeExpiredCharms();
        return {
          message: "Expired charms removed successfully.",
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
