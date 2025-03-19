import { gql } from "@apollo/client";

export const verify = gql`
query getUserbyId($uid: String!) {
    getUserbyId(uid:$uid){
        name
        major
    }
}
`;