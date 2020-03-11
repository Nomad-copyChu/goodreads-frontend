import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Banner from "./common/Banner";
import LoggedBookList from "./book/LoggedBookList";
import BookList from "./book/BookList";
import MainAuthor from "./author/MainAuthor";
import { Book, Author } from "../types";
import useUser from "../hooks/useUser";
import GetGernes from "./common/GetGernes";
import BestBookThisWeek from "./book/BestBookThisWeek";
import Want from "../public/static/svg/wantLabel.svg";
import Reading from "../public/static/svg/readingLabel.svg";
import Readed from "../public/static/svg/noReadLabel.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 100%; */
`;
const MainWrapper = styled.div`
  display: flex;
  justify-content: center;

  .main-contents {
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

    .main-authors-warpper {
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
  }
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

interface IProps {
  books: Book[];
  authors: Author[];
}

const Main: React.FC<IProps> = ({ books, authors }) => {
  const { isLogged } = useUser();
  return (
    <Container>
      <Banner />
      <MainWrapper>
        <div className="main-contents">
          {isLogged ? (
            <div>
              <h2>나의 선반 책들</h2>
              <div className="books-slide">
                <LoggedBookList books={books} />
              </div>
            </div>
          ) : (
            <div>
              <h2>추천하는 도서</h2>
              <div className="books-slide">
                <BookList books={books} />
              </div>
            </div>
          )}
          <h2>추천작가</h2>
          <div className="main-authors-warpper">
            <MainAuthor authors={authors} index={10} />
            <MainAuthor authors={authors} index={9} />
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
              <BestBookThisWeek />
            </div>
          </div>
        </div>
        {isLogged ? (
          <Sidebar>
            <div className="LabelWrapper">
              <div className="bookLabel">
                <Want />
                원하는책
              </div>
              <div className="bookLabel">
                <Reading />
                읽고있는책
              </div>
              <div className="bookLabel">
                <Readed />
                다읽은책
              </div>
            </div>
          </Sidebar>
        ) : null}
      </MainWrapper>
    </Container>
  );
};

export default Main;
