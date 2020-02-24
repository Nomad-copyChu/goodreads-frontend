/* eslint-disable react/no-array-index-key */
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { NextPage } from "next";
import { ApolloNextPageContext, Book, Author } from "../types";
import { GET_BOOKS } from "../query";
import Banner from "../components/common/Banner";
import GetGernes from "../components/common/GetGernes";
import { GET_AUTHORS } from "../query/author";
import BooksCard from "../components/common/BooksCard";

interface IProps {
  books: Book[];
  authors: Author[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Main = styled.div`
  overflow: auto;
  margin: 0 auto;
  scroll-behavior: smooth;
  .main-title-font {
    font-size: 21px;
    font-weight: 500;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .main-authtitle-font {
    font-size: 21px;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .books-slide {
    display: flex;
    width: 875px;
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  /* .main-BooksCard-hover {
    position: absolute;
  }
  .main-booksCard-wrpper {
    display: flex;
  } */
  .main-booksCard {
    position: static;
    margin-right: 20px;
  }
  .books-title {
    max-width: 141px;
    margin-top: 10px;
    font-size: 14px;
  }
  .author-photo {
    width: 140px;
    height: 100px;
    margin-top: 16px;
    margin-left: 16px;
  }
  .author-name {
    position: absolute;
    margin-top: 16px;
    margin-left: 16px;
  }
  .author-desc {
    display: flex;
  }
  .main-author-booksfont {
    margin-left: 16px;
    margin-top: 4px;
    margin-bottom: 3px;
    font-size: 12px;
  }
  .main-author-booklist {
    margin-left: 16px;
    margin-right: 12px;
    display: flex;
    align-items: center;
  }
  .muti-box {
    display: flex;
    @media (max-width: 700px) {
      display: block;
      margin-left: 15px;
    }
  }
  .author-container {
    display: flex;
  }
  .author-photo-small {
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    width: 63px;
    height: 73px;
  }
  .main-author-desc {
    display: flex;
    flex-direction: column;
    @media (min-width: 700px) {
      margin-left: 0px;
    }
  }
  .tags {
    margin-left: 24px;
    font-size: 12px;
    margin-bottom: 2px;
  }
  .main-tags-font {
    font-size: 14px;
  }
  .main-borderbox-author {
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    border-radius: 5px;
    width: 425px;
    height: 247px;
    margin-right: 25px;
    @media (max-width: 700px) {
      margin-bottom: 15px;
    }
  }
  .main-borderbox-quote {
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    border-radius: 5px;
    width: 468px;
    height: 89px;
    margin-right: 25px;
    margin-bottom: 10px;
    @media (max-width: 700px) {
      margin-bottom: 15px;
    }
  }
`;

const index: NextPage<IProps> = ({ books, authors }) => {
  return (
    <Container>
      <Banner />
      <Main>
        <div className="main-title-font">추천하는 도서</div>
        <div className="books-slide">
          {books.map((book, index) => (
            <span key={index}>
              {/* <div className="main-booksCard-wrpper"> */}
              <BooksCard size="large" className="main-booksCard" src={book.thumbnail} alt="" />
              {/* <span className="main-BooksCard-hover">hi</span> */}
              {/* </div> */}
              <div className="books-title">{book.title}</div>
            </span>
          ))}
        </div>
        <div className="main-authtitle-font">추천작가</div>
        <div className="muti-box">
          <div>
            <div className="main-borderbox-author">
              <img className="author-photo" src={authors[0]?.photo} alt="" />
              <Link href="/authList">
                <a className="author-name">{authors[0]?.name}</a>
              </Link>
              <div className="main-author-booksfont">Books</div>
              <div className="main-author-booklist">
                <BooksCard size="small" src={books[0]?.thumbnail} alt="" />
              </div>
            </div>
          </div>
          <div className="main-borderbox-author">
            <div>
              <img className="author-photo" src={authors[1]?.photo} alt="" />
              <Link href="/authList">
                <a className="author-name">{authors[1]?.name}</a>
              </Link>
              <div className="main-author-booksfont">Books</div>
              <div className="main-author-booklist">
                <BooksCard size="small" src={books[1]?.thumbnail} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="main-title-font">작가의 명언</div>
        <div className="author-container">
          <div className="main-author-desc">
            <div className="main-borderbox-quote">
              <img className="author-photo-small" src={books[2]?.authors[0]?.photo} alt="" />
            </div>
            <div className="main-borderbox-quote">
              <img className="author-photo-small" src={books[2]?.authors[0]?.photo} alt="" />
            </div>
            <div className="main-borderbox-quote">
              <img className="author-photo-small" src={books[2]?.authors[0]?.photo} alt="" />
            </div>
          </div>
          <div className="tags">
            <Link href="tags">
              <a className="main-tags-font">Tags</a>
            </Link>
            <GetGernes />
          </div>
        </div>
      </Main>
    </Container>
  );
};

index.getInitialProps = async (ctx: ApolloNextPageContext) => {
  const { apolloClient } = ctx;
  //Posts 불러오기
  const bookData = await apolloClient.query({
    query: GET_BOOKS,
    fetchPolicy: "network-only"
  });
  const authorData = await apolloClient.query({
    query: GET_AUTHORS,
    fetchPolicy: "network-only"
  });

  return { books: bookData?.data?.getBooks, authors: authorData?.data?.getAuthors };
};

export default index;
