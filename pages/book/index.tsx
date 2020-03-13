import { NextPage } from "next";
import styled from "styled-components";
import Link from "next/link";
import SearchInput from "../../components/common/SearchInput";
import { ApolloNextPageContext, Gerne, Book } from "../../types";
import { GET_BOOKS } from "../../query";
import GET_GERNES from "../../query/gernes";
import BestBookThisWeek from "../../components/book/BestBookThisWeek";

const Container = styled.div`
  width: 100%;
  height: 100%;
  .side-menu {
    width: 300px;
    border: 1px solid #d6d0c4;
    display: flex;
    flex-direction: column;
    .search {
      margin-top: 60px;
      margin-left: 23px;
      width: 254px;
      border-radius: 5px;
    }
    h2 {
      padding: 30px;
    }
    .gerne-wrapper {
      display: flex;
      flex-direction: column;
      margin-left: 30px;
      .gerne-interval {
        margin-bottom: 20px;
      }
    }
    .division-border {
      width: 240px;
      border: 1px solid #d6d0c4;
      display: flex;
      margin-left: 30px;
      margin-bottom: 24px;
    }
    .bestbook-Wrapper {
      margin-left: 30px;
    }
    .bestbook {
      margin-bottom: 20px;
    }
  }
`;
interface IProps {
  books: Book[];
  gernes: Gerne[];
}

const index: NextPage<IProps> = ({ gernes, books }) => {
  const max = gernes
    .sort((a, b) => {
      return a.booksCount < b.booksCount ? 1 : -1;
    })
    .slice(0, 6);
  return (
    <Container>
      <div className="side-menu">
        <div className="search">
          <SearchInput placeholder="궁금한 책을 검색하세요." />
        </div>
        <h2>인기있는 장르</h2>
        {max.map((gerne, index) => (
          <div key={index} className="gerne-wrapper">
            <Link href="/gerne">
              <a className="gerne-interval">#{gerne.term}</a>
            </Link>
          </div>
        ))}
        <div className="division-border" />
        <div className="bestbook-Wrapper">
          <BestBookThisWeek books={books} index={7} className="bestbook" />
          <BestBookThisWeek books={books} index={8} className="bestbook" />
          <BestBookThisWeek books={books} index={9} className="bestbook" />
        </div>
      </div>
    </Container>
  );
};

index.getInitialProps = async (ctx: ApolloNextPageContext) => {
  const { apolloClient } = ctx;
  //Posts 불러오기
  const [bookData, gerneData] = await Promise.all([
    await apolloClient.query({
      query: GET_BOOKS,
      fetchPolicy: "network-only"
    }),
    await apolloClient.query({
      query: GET_GERNES,
      fetchPolicy: "network-only"
    })
  ]);
  return { books: bookData?.data?.getBooks, gernes: gerneData?.data?.getGernes };
};

export default index;
