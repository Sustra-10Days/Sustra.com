import { gql } from "@apollo/client";

export const verify = gql`
query Verify($token: String!) {
    verify(token:$token) {
        success
        user{
            email,
            id
        }
}
}
`;