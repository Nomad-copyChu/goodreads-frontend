import { gql } from "apollo-boost";

/**
 * * 장르들 불러오기
 */
const GET_GERNES = gql`
  query getGernes {
    getGernes {
      id
      term
      booksCount
      books {
        id
        title
        thumbnail
      }
      authors {
        id
        name
        photo
      }
    }
  }
`;

/**
 * * 장르의 아이템들 가져오기
 */
export const GET_GERNE_ITEMS = gql`
  query getGerneItems($term: String!) {
    getGerneItems(term: $term) {
      id
      term
      books {
        id
        title
        authors {
          id
          name
          photo
          description
        }
        gernes {
          id
          term
        }
        comments {
          id
        }
        thumbnail
        contents
        datetime
        isbn
        price
        publisher
        wantCount
        readingCount
        readCount
        totalRating
        ratedUserNum
        totalRating
        avgRating
        addUser {
          id
          username
        }
        createdAt
        updatedAt
      }
      authors {
        id
        name
        photo
        gernes {
          id
          term
        }
        description
        books {
          id
          thumbnail
        }
      }
    }
  }
`;

export default GET_GERNES;
