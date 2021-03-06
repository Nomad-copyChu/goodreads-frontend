import { NextPage } from "next";
import styled from "styled-components";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import SearchInput from "../../components/common/SearchInput";
import { ApolloNextPageContext, Gerne, Book } from "../../types";
import { GET_BOOKS } from "../../query/book";
import GET_GERNES from "../../query/gernes";
import BestBookThisWeek from "../../components/book/BestBookThisWeek";
import colors from "../../style/colors";
import Nav from "../../public/static/svg/navigation.svg";
import Close from "../../public/static/svg/common/closeXButton.svg";

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
    min-width: 280px;
    border: 1px solid #d6d0c4;
    height: 100%;
    display: flex;
    flex-direction: column;
    ::-webkit-scrollbar {
      display: none;
    }
    @media (max-width: 1110px) {
      position: absolute;
      display: none;
    }
  }
  .nav-menu {
    z-index: 10px;
    position: absolute;
    overflow-y: auto;
    padding-left: 24px;
    border: 1px solid #d6d0c4;
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: 0.5s;
    background-color: #f4f1ea;
    transform: translateX(-300px);
    ::-webkit-scrollbar {
      display: none;
    }
    @media (min-width: 1110px) {
      position: absolute;
      display: none;
    }
  }
  .right300 {
    transform: translateX(0px);
  }
  .side-menu-contents {
    .search {
      margin-top: 40px;
      margin-bottom: 16px;
      width: calc(100% - 20px);
      border-radius: 5px;
    }
    .side-menu-header {
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
      /* display: flex; */
      margin-bottom: 24px;
    }
    .bestbook {
      background-color: ${colors.beige_400};
      margin-bottom: 20px;
    }
  }
  .book-list-Wrapper {
    position: relative;
    display: flex;
    h3 {
      font-size: 21px;
      margin: 60px 20px 20px;
    }
    .books-new {
      overflow-y: auto;
      ::-webkit-scrollbar {
        display: none;
      }
      .new-book-list-wrapper {
        display: flex;
        flex-wrap: wrap;
        border-right: 4px solid ${colors.beige_900};
        padding: 0 20px;
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
            -webkit-line-clamp: 2; /* ellipsis line */
            -webkit-box-orient: vertical;
          }
        }
      }
    }
    .books-popular {
      overflow-y: auto;
      ::-webkit-scrollbar {
        display: none;
      }
      .popular-book-list-wrapper {
        display: flex;
        flex-wrap: wrap;
        padding: 0 20px;
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
            -webkit-line-clamp: 2; /* ellipsis line */
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
  .navigation-close {
    position: absolute;
    right: 0;
    width: 16px;
    height: 16px;
    margin-top: 10px;
    margin-right: 10px;
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
      <>
        <Head>
          <title>도서 목록 | 굿리즈</title>
        </Head>
        <div className="side-menu-contents">
          <div role="button" onClick={() => setShow(!show)}>
            <Close className="navigation-close" />
          </div>
          <div className="search">
            <SearchInput placeholder="궁금한 책을 검색하세요." />
          </div>
          <h2 className="side-menu-header">인기있는 장르</h2>
          {max.map((gerne, index) => (
            <div key={index} className="gerne-wrapper">
              <Link href="/gerne/[term]" as={`/gerne/${gerne.term}`}>
                <a className="gerne-interval">#{gerne.term}</a>
              </Link>
            </div>
          ))}
          <div className="division-border" />
          <div className="bestbook-Wrapper">
            <BestBookThisWeek book={books[1]} className="bestbook" />
            <BestBookThisWeek book={books[2]} className="bestbook" />
            <BestBookThisWeek book={books[3]} className="bestbook" />
          </div>
        </div>
      </>
    );
  };
  return (
    <Container>
      <div className="side-menu">{SideMenu()}</div>
      <div className="book-list-Wrapper">
        <div role="button">
          <Nav onClick={toggleSidebar} className="navigation" />
          <div className={`nav-menu ${show ? "right300" : ""}`}>{SideMenu()}</div>
        </div>
        <div className="books-new">
          <h3>새로나온책</h3>
          <div className="new-book-list-wrapper">
            {books.map((book, i) => (
              <div key={i} className="new-book-list">
                <Link href="/book/[id]" as={`/book/${book.id}`}>
                  <a>
                    <img src={book.thumbnail} alt="" className="new-book-thumbnail" />
                  </a>
                </Link>
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
                <Link href="/book/[id]" as={`/book/${book.id}`}>
                  <a>
                    <img src={book.thumbnail} alt="" className="popular-book-thumbnail" />
                  </a>
                </Link>
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
      query: GET_BOOKS
    }),
    await apolloClient.query({
      query: GET_GERNES
    })
  ]);
  return { books: bookData?.data?.getBooks, gernes: gerneData?.data?.getGernes };
};

export default index;
