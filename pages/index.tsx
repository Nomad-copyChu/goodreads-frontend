/* eslint-disable react/no-array-index-key */
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { NextPage } from "next";
import { ApolloNextPageContext, Book, Author } from "../types";
import { GET_BOOKS } from "../query";
import Banner from "../components/common/Banner";
import BorderBox from "../components/common/BorderBox";
import GetGernes from "../components/common/GetGernes";
import { GET_AUTHORS } from "../query/author";

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
  .suggested-font {
    font-size: 21px;
    font-weight: 500;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .books-slide {
    display: flex;
  }
  .books-thumnail {
    width: 150px;
    height: 234px;
    margin-right: 20px;
  }
  .books-title {
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
  .books-font {
    margin-left: 16px;
    margin-top: 4px;
    margin-bottom: 3px;
    font-size: 12px;
  }
  .author-books {
    width: 60px;
    height: 94px;
    margin-left: 16px;
    margin-right: 12px;
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    border-radius: 5px;
  }
  .muti-box {
    display: flex;
    @media (max-width: 700px) {
      display: block;
      margin-left: 15px;
    }
  }
  .box {
    margin-right: 25px;
    @media (max-width: 700px) {
      margin-bottom: 15px;
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
  .author-desc {
    display: flex;
    flex-direction: column;
    @media (min-width: 700px) {
      margin-left: 0px;
    }
  }
  .small-box {
    margin-bottom: 10px;
  }
  .tags {
    margin-left: 24px;
    font-size: 12px;
    margin-bottom: 2px;
  }
  .tags-font {
    font-size: 14px;
  }
`;

const index: NextPage<IProps> = ({ books, authors }) => {
  return (
    <Container>
      <Banner />
      <Main>
        <div className="suggested-font">추천하는 도서</div>
        <div className="books-slide">
          {books.map((book, index) => (
            <span key={index}>
              <img className="books-thumnail" src={book.thumbnail} alt="" />
              <div className="books-title">{book.title}</div>
            </span>
          ))}
        </div>
        <div className="suggested-font">추천작가</div>
        <div className="muti-box">
          <div>
            {authors.map(author => (
              <BorderBox size="lg" className="box">
                <img className="author-photo" src={author.photo} alt="" />
                <Link href="/authList">
                  <a className="authorname">{author.name}</a>
                </Link>
                <div className="books-font">Books</div>
                <div>
                  <img className="author-books" src={books[0]?.thumbnail} alt="" />
                </div>
              </BorderBox>
            ))}
          </div>
          <BorderBox size="lg">
            <div>
              <img className="author-photo" src={books[2]?.authors[0]?.photo} alt="" />
              <Link href="/authList">
                <a className="author-name">{books[2]?.authors[0]?.name}</a>
              </Link>
              <div className="books-font">Books</div>
              <div>
                <img className="author-books" src={books[2]?.thumbnail} alt="" />
              </div>
            </div>
          </BorderBox>
        </div>
        <div className="suggested-font">작가의 명언</div>
        <div className="author-container">
          <div className="author-desc">
            <BorderBox className="small-box" size="sm">
              <img className="author-photo-small" src={books[2]?.authors[0]?.photo} alt="" />
            </BorderBox>
            <BorderBox className="small-box" size="sm">
              <img className="author-photo-small" src={books[2]?.authors[0]?.photo} alt="" />
            </BorderBox>
            <BorderBox className="small-box" size="sm">
              <img className="author-photo-small" src={books[2]?.authors[0]?.photo} alt="" />
            </BorderBox>
          </div>
          <div className="tags">
            <Link href="tags">
              <a className="tags-font">Tags</a>
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
