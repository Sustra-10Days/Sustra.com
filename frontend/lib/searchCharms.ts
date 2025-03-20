import { gql } from "@apollo/client";

export const search = gql`
query searchCharms($name: String!) {
    searchCharms(name:$name ) {
        id
        name
        category
        imageUrl
        major
        quote
        variant
        rarity
        totalQuantity
        availableQuantity
    }
}
`