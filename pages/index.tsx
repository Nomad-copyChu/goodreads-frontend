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

const Container = styled.div``;
const Main = styled.div`
  padding-left: 312px;
  padding-right: 312px;
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
    margin-top: 8px;
    display: flex;
    margin-left: 16px;
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
        <BorderBox size="md">
          <img className="author-photo" src={data[0].authors[0].photo} alt="" />
          <Link href="/authList">
            <a className="author-name">{data[0].authors[0].name}</a>
          </Link>
        </BorderBox>
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
