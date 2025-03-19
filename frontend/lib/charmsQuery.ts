import { gql } from "@apollo/client";

export const charmsQuery = gql`
    query getCharmsQuery($categories: [Category], $majors: [Major], $rarities: [Rarity]) {
        filterCharms(categories: $categories, majors: $majors,rarities: $rarities ) {
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
`;