import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { NextPage } from "next";
import { ApolloNextPageContext, Book } from "../types";
import { GET_BOOKS } from "../query";
import Banner from "../components/common/Banner";
import BorderBox from "../components/common/BorderBox";

interface IProps {
  data: Book[];
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
    position: relative;
    margin-top: 0px;
    margin-left: 16px;
  }
  .author-desc {
    margin-top: 8px;
    display: flex;
    margin-left: 16px;
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
  .author-photo-small {
    width: 63px;
    height: 73px;
  }
`;

const index: NextPage<IProps> = ({ data }) => {
  return (
    <Container>
      <Banner />
      <Main>
        <div className="suggested-font">추천하는 도서</div>
        <div className="books-slide">
          {data.map(book => (
            <span>
              <img className="books-thumnail" src={book.thumbnail} alt="" />
              <div className="books-title">{book.title}</div>
            </span>
          ))}
        </div>
        <div className="suggested-font">추천작가</div>
        <div className="muti-box">
          <BorderBox size="lg" className="box">
            <img className="author-photo" src={data[0].authors[0].photo} alt="" />
            <Link href="/authList">
              <a className="author-name">{data[0].authors[0].name}</a>
            </Link>
            <div className="books-font">Books</div>
            <div>
              <img className="author-books" src={data[0].thumbnail} alt="" />
            </div>
          </BorderBox>
          <BorderBox size="lg">
            <img className="author-photo" src={data[2].authors[0].photo} alt="" />
            <Link href="/authList">
              <a className="author-name">{data[2].authors[0].name}</a>
            </Link>
            <div className="books-font">Books</div>
            <div>
              <img className="author-books" src={data[2].thumbnail} alt="" />
            </div>
          </BorderBox>
        </div>
        <div className="suggested-font">작가의 명언</div>
        <div>
          <BorderBox size="sm">{/* <img className="author-photo-small" src={data[0].authors[0].photo} /> */}</BorderBox>
        </div>
      </Main>
    </Container>
  );
};

index.getInitialProps = async (ctx: ApolloNextPageContext) => {
  const { apolloClient } = ctx;
  //Posts 불러오기
  const { data }: { data: { getBooks: Book[] } } = await apolloClient.query({
    query: GET_BOOKS,
    fetchPolicy: "network-only"
  });
  return { data: data.getBooks };
};

export default index;
