import { PrismaClient, $Enums } from "@prisma/client";

const prisma = new PrismaClient();

// Function to get charms based on multiple filters
export const getFilteredCharms = async (
  categories?: $Enums.Category[],
  majors?: $Enums.Major[],
  rarities?: $Enums.Rarity[],
  name?: string
) => {
  // Start building the query filters
  const filters: any = {
    AND: [
      categories ? { category: { in: categories } } : {},
      majors ? { major: { in: majors } } : {},
      rarities ? { rarity: { in: rarities } } : {},
    ],
  };

  // If a name is provided, apply a search filter for the name
  if (name) {
    filters.AND.push({
      name: {
        contains: name,
        mode: "insensitive", // Case-insensitive search
      },
    });
  }

  // Perform the query with the combined filters
  return await prisma.charm.findMany({
    where: filters,
  });
};

// Resolver for GraphQL queries and mutations
export const charmResolvers = {
  Query: {
    // Get all marketplace charms with filters (optional)
    getMarketplaceCharms: async () => {
      try {
        return await getFilteredCharms(); // No filters, get all charms
      } catch (error: any) {
        throw new Error("Failed to fetch marketplace charms: " + error.message);
      }
    },

    // Search for charms by name, with optional filters
    searchCharms: async (_: any, { name }: { name: string }) => {
      try {
        return await prisma.charm.findMany({
          where: {
            name: {
              contains: name,
              mode: "insensitive", // Case-insensitive search
            },
          },
        });
      } catch (error: any) {
        throw new Error("Failed to search charms: " + error.message);
      }
    },

    // Filter charms by multiple categories, majors, and rarities, then search by name (optional)
    filterCharms: async (
      _: any,
      { categories, majors, rarities, name }: { categories?: $Enums.Category[]; majors?: $Enums.Major[]; rarities?: $Enums.Rarity[]; name?: string }
    ) => {
      try {
        return await getFilteredCharms(categories, majors, rarities, name); // Call the combined function
      } catch (error: any) {
        throw new Error("Failed to filter charms: " + error.message);
      }
    },
  },
};

export default charmResolvers;
