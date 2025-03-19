import { gql } from "@apollo/client";

export const getUserInventory = gql`
  query GetUserInventory($userId: String!) {
    getUserInventory(userId: $userId) {
      charmId
      expiresAt
    }
  }
`;