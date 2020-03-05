/* eslint-disable react/no-array-index-key */
import React from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Link from "next/link";
import { NextPage } from "next";
import { ApolloNextPageContext, Book, Author } from "../types";
import { GET_BOOKS } from "../query";
import Banner from "../components/common/Banner";
import GetGernes from "../components/common/GetGernes";
import { GET_AUTHORS } from "../query/author";
import BooksCard from "../components/common/BooksCard";
import AddToShelfButton from "../components/book/AddToShelfButton";
import Reading from "../public/static/svg/readingLabel.svg";
import Readed from "../public/static/svg/readedLabel.svg";
import Noread from "../public/static/svg/noReadLabel.svg";
import useUser from "../hooks/useUser";

interface IProps {
  books: Book[];
  authors: Author[];
}
const ReactStars = dynamic(import("react-stars"), { ssr: false });

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Sidebar = styled.div`
  .LabelWrapper {
    margin-top: 70px;
    margin-left: 12px;
    position: absolute;
  }
  .bookLabel {
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    font-family: Roboto;
    color: #aaaaaa;
    font-size: 12px;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: auto;
  width: 870px;
  scroll-behavior: smooth;
  @media (max-width: 870px) {
    padding: 20px;
    width: 100%;
  }
  h2 {
    font-size: 21px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .books-slide {
    display: flex;
    width: 100%;
    overflow-x: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .main-BooksCard-hover-background {
    position: absolute;
    width: 150px;
    height: 234px;
    background-color: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: 0.5s;
    :hover {
      opacity: 1;
    }
    @media (max-width: 870px) {
      display: none;
    }
    .main-book-hover {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      margin-top: 40px;
      width: 150px;
      height: 170px;
    }
  }
  .main-BooksCard-hover-moreContent {
    width: 91px;
    height: 27px;
    background: rgba(196, 196, 196, 0.2);
    border: 1px solid #ffffff;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main-BooksCard-hover-moreContent-font {
    text-decoration: none;
    font-size: 14px;
    color: white;
  }
  .main-BooksCard-hover-authorName-font {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    padding: 20px;
    color: white;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* ellipsis line */
    -webkit-box-orient: vertical;
  }
  .main-BooksCard-hover-gerne-wrapper {
    margin-right: 2px;
  }
  .main-BooksCard-hover-gerne-font {
    margin-left: 2px;
    span {
      font-size: 12px;
      color: white;
    }
  }
  .main-BooksCard-hover-totalRating {
    font-size: 14px;
    color: white;
  }
  .main-booksCard-wrpper {
    position: relative;
    display: flex;
  }
  .main-booksCard {
    position: relative;
    margin-right: 20px;
  }
  .main-books-title {
    width: 141px;
    height: 38px;
    div {
      margin-top: 10px;
      font-size: 14px;
      color: #7b7164;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* ellipsis line */
      -webkit-box-orient: vertical;
    }
  }
  .main-author-info-wrapper {
    display: flex;
  }
  .author-photo {
    width: 140px;
    height: 100px;
    margin-top: 16px;
    margin-left: 16px;
  }
  .author-name {
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
    justify-content: space-between;
    @media (max-width: 870px) {
      display: block;
    }
  }
  .main-quote-container {
    display: flex;
    @media (max-width: 870px) {
      display: block;
      width: 100%;
    }
  }
  .author-photo-small {
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    width: 63px;
    height: 73px;
  }
  .main-quote-borderbox-wrapper {
    width: 60%;
    display: flex;
    flex-direction: column;
    @media (max-width: 870px) {
      margin-left: 0px;
      width: 100%;
    }
  }
  .main-tags-bestbook-wrapper {
    width: 45%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 870px) {
      margin-left: 0px;
      width: 100%;
    }
  }
  .main-tags-title {
    font-size: 14px;
  }
  .main-borderbox-author {
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    border-radius: 5px;
    width: 425px;
    height: 247px;
    @media (max-width: 870px) {
      width: 100%;
      margin-bottom: 15px;
    }
  }
  .main-borderbox-quote {
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    border-radius: 5px;
    width: 468px;
    height: 89px;
    margin-bottom: 10px;
    @media (max-width: 870px) {
      margin-bottom: 15px;
      width: 100%;
    }
  }
  .main-bestbook-border {
    padding: 8px;
    width: 200px;
    height: 284px;
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    border-radius: 5px;
    .border {
      margin-top: 2px;
      margin-bottom: 4px;
      border: 1px solid #d8d8d8;
      width: 185px;
    }
    .main-bestbook-info {
      display: flex;
    }
    .main-bestbook-column {
      margin-left: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .bestbook-title {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 1; /* ellipsis line */
      -webkit-box-orient: vertical;
    }
    .bestbook-author {
      font-size: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 1; /* ellipsis line */
      -webkit-box-orient: vertical;
    }
    .rating-text {
      font-size: 10px;
      display: flex;
      align-items: center;
    }
    .rating-and-review {
      display: flex;
      font-size: 10px;
      a {
        margin-right: 3px;
      }
    }
    .shelfbutton {
      height: 21px;
    }
    .contents {
      width: 180px;
      color: #aaaaaa;
      font-size: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 10; /* ellipsis line */
      -webkit-box-orient: vertical;
    }
  }
`;

const index: NextPage<IProps> = ({ books, authors }) => {
  const { user, isLogged } = useUser();
  const LoginBook = () => {
    if (isLogged === true) {
      return (
        <div>
          <h2>나의 선반 책들</h2>
          <div className="books-slide">hello</div>
        </div>
      );
    }
    return (
      <div>
        <h2>추천하는 도서</h2>
        <div className="books-slide">
          {books.map((book, index) => (
            <span key={index}>
              <div className="main-booksCard-wrpper">
                <Link href="/book/[id]" as={`/book/${book.id}`}>
                  <a>
                    <BooksCard size="large" className="main-booksCard" src={book.thumbnail} alt="" />
                  </a>
                </Link>
                <div className="main-BooksCard-hover-background">
                  <span className="main-book-hover">
                    <div className="main-BooksCard-hover-moreContent">
                      <Link href="/book/[id]" as={`/book/${book.id}`}>
                        <a className="main-BooksCard-hover-moreContent-font">더 알아보기</a>
                      </Link>
                    </div>
                    <div className="main-BooksCard-hover-authorName-font">
                      by {book.authors.map(author => author.name)}
                    </div>
                    <div className="main-BooksCard-hover-gerne-Wrapper">
                      {book.gernes.map((gerne, index) => (
                        <span key={index} className="main-BooksCard-hover-gerne-font">
                          <span className="main-BooksCard-hover-gerne-font">#</span>
                          <span className="main-BooksCard-hover-gerne-font">{gerne.term}</span>
                        </span>
                      ))}
                    </div>
                    <ReactStars
                      count={5}
                      value={book.avgRating}
                      edit={false}
                      size={20}
                      color1="#D8D8D8"
                      color2="#FA604A"
                    />
                    <div className="main-BooksCard-hover-totalRating">{book.avgRating.toFixed(2)}</div>
                  </span>
                </div>
              </div>
              <div className="main-books-title">
                <div>{book.title}</div>
              </div>
            </span>
          ))}
        </div>
      </div>
    );
  };

  const LoginLabel = () => {
    if (isLogged === true) {
      return (
        <Sidebar>
          <div className="LabelWrapper">
            <div className="bookLabel">
              <Readed />
              다읽은책
            </div>
            <div className="bookLabel">
              <Reading />
              읽고있는책
            </div>
            <div className="bookLabel">
              <Noread />
              안읽는책
            </div>
          </div>
        </Sidebar>
      );
    }
    return null;
  };

  return (
    <Container>
      <Banner />
      <MainWrapper>
        <Main>
          {LoginBook()}
          <h2>추천작가</h2>
          <div className="muti-box">
            <div className="main-borderbox-author">
              <div className="main-author-info-wrapper">
                <img className="author-photo" src={authors[0]?.photo} alt="" />
                <Link href="/author/[id]" as={`/author/${authors[0]?.id}`}>
                  <a className="author-name">{authors[0]?.name}</a>
                </Link>
              </div>
              <div className="main-author-booksfont">Books</div>
              <div className="main-author-booklist">
                <BooksCard size="small" src={books[0]?.thumbnail} alt="" />
              </div>
            </div>
            <div className="main-borderbox-author">
              <div className="main-author-info-wrapper">
                <img className="author-photo" src={authors[1]?.photo} alt="" />
                <Link href="/author/[id]" as={`/author/${authors[1]?.id}`}>
                  <a className="author-name">{authors[1]?.name}</a>
                </Link>
              </div>
              <div className="main-author-booksfont">Books</div>
              <div className="main-author-booklist">
                <BooksCard size="small" src={books[1]?.thumbnail} alt="" />
              </div>
            </div>
          </div>
          <h2>작가의 명언</h2>
          <div className="main-quote-container">
            <div className="main-quote-borderbox-wrapper">
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
            <div className="main-tags-bestbook-wrapper">
              <div>
                <Link href="tags">
                  <a className="main-tags-title">Tags</a>
                </Link>
                <GetGernes />
              </div>
              <div className="main-bestbook-border">
                <h3>이주의 배스트 책</h3>
                <div className="border" />
                <div className="main-bestbook-info">
                  <BooksCard size="medium" src={books[7]?.thumbnail} alt="" />
                  <div className="main-bestbook-column">
                    <div>
                      <Link href="/book/[id]" as={`/book/${books[7]?.id}`}>
                        <a className="bestbook-title">{books[7]?.title}</a>
                      </Link>
                    </div>
                    <div className="bestbook-author">
                      <span>by</span>
                      <Link href="/author/[id]" as={`/author/${books[7]?.authors.map(author => author.name)}`}>
                        <a>{books[7]?.authors.map(author => author.name)}</a>
                      </Link>
                    </div>
                    <div className="rating-text">
                      <ReactStars
                        count={5}
                        edit={false}
                        value={books[7]?.avgRating}
                        size={12}
                        color1="#D8D8D8"
                        color2="#FA604A"
                      />
                      <span>{books[7]?.avgRating.toFixed(2)}</span>
                    </div>
                    <div className="rating-and-review">
                      <Link href="/book/[id]" as={`/book/${books[7]?.id}`}>
                        <a>{books[7].ratedUserNum} ratings</a>
                      </Link>
                      <Link href="/book/[id]" as={`/book/${books[7]?.id}`}>
                        <a>{books[7].comments.length} review</a>
                      </Link>
                    </div>
                    <AddToShelfButton className="shelfbutton" size="medium" />
                  </div>
                </div>
                <div className="contents">{books[7].contents}</div>
              </div>
            </div>
          </div>
        </Main>
        {LoginLabel()}
      </MainWrapper>
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
