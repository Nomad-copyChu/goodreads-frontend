import { NextPage } from "next";
import styled, { css } from "styled-components";
import { useState } from "react";
import Link from "next/link";
import SearchInput from "../../components/common/SearchInput";
import { ApolloNextPageContext, Gerne, Book } from "../../types";
import { GET_BOOKS } from "../../query";
import GET_GERNES from "../../query/gernes";
import BestBookThisWeek from "../../components/book/BestBookThisWeek";
import colors from "../../style/colors";
import Nav from "../../public/static/svg/navigation.svg";

type MenuType = "menu" | "nav";

const getMenuType = (menutype: MenuType) => {
  switch (menutype) {
    case "menu":
      return css`
        display: flex;
        position: relative;
      `;
    case "nav":
      return css`
        width: 0px;
      `;
    default:
      return null;
  }
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  .side-menu {
    z-index: 10px;
    position: relative;
    overflow-y: auto;
    padding-left: 24px;
    width: 392px;
    border: 1px solid #d6d0c4;
    height: 100%;
    display: flex;
    transition: 0.5s;
    background-color: ${colors.beige_700};
    flex-direction: column;
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
    }
    @media (max-width: 1110px) {
      position: absolute;
      display: none;
    }
    .side-menu-contents {
      .search {
        margin-top: 60px;
        width: 254px;
        border-radius: 5px;
      }
      h2 {
        margin-top: 24px;
        margin-bottom: 24px;
      }
      .gerne-wrapper {
        display: flex;
        flex-direction: column;
        .gerne-interval {
          margin-bottom: 20px;
        }
      }
      .division-border {
        width: 240px;
        border: 1px solid #d6d0c4;
        display: flex;
        margin-bottom: 24px;
      }
      .bestbook {
        background-color: ${colors.beige_400};
        margin-bottom: 20px;
      }
    }
  }
  .book-list-Wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    h3 {
      font-size: 21px;
      margin-top: 60px;
      margin-bottom: 20px;
    }
    .books-new {
      margin-left: 42.5px;
      width: 50%;
      overflow-y: auto;
      ::-webkit-scrollbar-thumb {
        border-radius: 10px;
      }
      .new-book-list-wrapper {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .new-book-list {
          width: 150px;
          margin-right: 20px;
          @media (max-width: 801px) {
            width: 120px;
          }
          .new-book-thumbnail {
            height: 234px;
            @media (max-width: 801px) {
              height: 180px;
            }
          }
          .new-book-title {
            margin-bottom: 20px;
            font-size: 15px;
            color: #7b7164;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 1; /* ellipsis line */
            -webkit-box-orient: vertical;
          }
        }
      }
    }
    .books-popular {
      margin-left: 42.5px;
      width: 50%;
      overflow-y: auto;
      ::-webkit-scrollbar-thumb {
        border-radius: 10px;
      }
      .popular-book-list-wrapper {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .popular-book-list {
          width: 150px;
          margin-right: 20px;
          @media (max-width: 801px) {
            width: 120px;
          }
          .popular-book-thumbnail {
            height: 234px;
            @media (max-width: 801px) {
              height: 180px;
            }
          }
          .popular-book-title {
            margin-bottom: 20px;
            font-size: 15px;
            color: #7b7164;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 1; /* ellipsis line */
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
  .navigation {
    top: 10px;
    left: 10px;
    position: absolute;
    cursor: pointer;
    @media (min-width: 1110px) {
      display: none;
    }
  }
`;

interface IProps {
  books: Book[];
  gernes: Gerne[];
}

const index: NextPage<IProps> = ({ gernes, books }) => {
  const [show, setShow] = useState(false);
  const toggleSidebar = () => {
    setShow(!show);
  };
  const SideMenu = () => {
    const max = gernes
      .sort((a, b) => {
        return a.booksCount < b.booksCount ? 1 : -1;
      })
      .slice(0, 6);
    return (
      <div>
        <div className="side-menu-contents">
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
          <div>
            <BestBookThisWeek books={books} index={1} className="bestbook" />
            <BestBookThisWeek books={books} index={2} className="bestbook" />
            <BestBookThisWeek books={books} index={3} className="bestbook" />
          </div>
        </div>
      </div>
    );
  };
  return (
    <Container>
      <div className="side-menu">{SideMenu()}</div>
      {/* <div role="button" className="navigation">
        <Nav onClick={toggleSidebar} />
        {show && SideMenu()}
      </div> */}
      <div className="book-list-Wrapper">
        <div role="button" className="navigation">
          <Nav onClick={toggleSidebar} />
          {show && SideMenu()}
        </div>
        <div className="books-new">
          <h3>새로나온책</h3>
          <div className="new-book-list-wrapper">
            {books.map((book, i) => (
              <div key={i} className="new-book-list">
                <img src={book.thumbnail} alt="" className="new-book-thumbnail" />
                <div className="new-book-title">{book.title}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="books-popular">
          <h3>인기있는책</h3>
          <div className="popular-book-list-wrapper">
            {books.map((book, i) => (
              <div key={i} className="popular-book-list">
                <img src={book.thumbnail} alt="" className="popular-book-thumbnail" />
                <div className="popular-book-title">{book.title}</div>
              </div>
            ))}
          </div>
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
