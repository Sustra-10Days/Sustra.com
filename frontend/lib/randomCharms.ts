import { gql } from "@apollo/client";

export const random = gql`
    mutation randomizeCharm($userId: String!) {
        randomizeCharm(userId: $userId) {
            message
        }
}
`;