import { gql } from "@apollo/client";

export const getCharmById = gql`
  query FilterCharms($charmId: String!) {
    filterCharms(charmId: $charmId) {
      id
      name
      category
      imageUrl
      major
      quote
      variant
      rarity
      availableQuantity
    }
  }
`;