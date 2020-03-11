import React from "react";
import Link from "next/link";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import { Book } from "../../types";
import Want from "../../public/static/svg/wantLabel.svg";
import Reading from "../../public/static/svg/readingLabel.svg";
import Read from "../../public/static/svg/noReadLabel.svg";

const Container = styled.div`
  display: flex;
  .main-booksCard-wrpper {
    position: relative;
    display: flex;
    margin-top: 10px;
  }
  .main-booksCard {
    position: relative;
    width: 150px;
    height: 234px;
  }
  .main-booksCard-interval {
    margin-right: 20px;
  }
  .main-booksCard-Label {
    width: 25px;
    height: 40px;
  }
  .booksCard-Label-overlay {
    position: absolute;
    margin-left: 114px;
    margin-top: -10px;
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
`;

interface IProps {
  books: Book[];
}
const LoggedBookList: React.FC<IProps> = ({ books }) => {
  const { user } = useUser();
  return (
    <Container>
      {user?.displays?.map((display, index) => (
        <span key={index}>
          <div className="main-booksCard-wrpper">
            <Link href="/book/[id]" as={`/book/${display.book?.id}`}>
              <a className="main-booksCard-interval">
                <img className="main-booksCard" src={display.book?.thumbnail} alt={display.book?.title} />
              </a>
            </Link>
            {display.shelves?.map((shelf, i) => {
              switch (shelf?.name) {
                case "want":
                  return (
                    <div key={i} className="booksCard-Label-overlay">
                      <Want className="main-booksCard-Label" />
                    </div>
                  );
                case "read":
                  return (
                    <div key={i} className="booksCard-Label-overlay">
                      <Read className="main-booksCard-Label" />
                    </div>
                  );
                case "reading":
                  return (
                    <div key={i} className="booksCard-Label-overlay">
                      <Reading className="main-booksCard-Label" />
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>

          <div className="main-books-title">
            <div>{display.book.title}</div>
          </div>
        </span>
      ))}
    </Container>
  );
};

export default LoggedBookList;
