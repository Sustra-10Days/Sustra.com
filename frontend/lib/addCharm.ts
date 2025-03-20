import { gql } from "@apollo/client";

export const addCharmtoInventory = gql`
    mutation RandomizeCharm($addCharmtoInventoryUserId2: String!, $charmId: String!, $source: String!) {
        addCharmtoInventory(userId: $addCharmtoInventoryUserId2, charmId: $charmId, source: $source) {
            acquiredAt
            expiresAt
            id
            userId
    }
}
`;