import React from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Book } from "../../types";

const ReactStars = dynamic(import("react-stars"), { ssr: false });

const Container = styled.div`
  display: flex;
  .main-booksCard-wrpper {
    position: relative;
    display: flex;
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

  .main-booksCard {
    position: relative;
    width: 150px;
    height: 234px;
  }
  .main-booksCard-interval {
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
`;

interface IProps {
  books: Book[];
}

const BookList: React.FC<IProps> = ({ books }) => {
  return (
    <Container>
      {books.map((book, index) => (
        <span key={index}>
          <div className="main-booksCard-wrpper">
            <Link href="/book/[id]" as={`/book/${book.id}`}>
              <a className="main-booksCard-interval">
                <img className="main-booksCard" src={book.thumbnail} alt={book.title} />
              </a>
            </Link>
            <div className="main-BooksCard-hover-background">
              <div className="main-book-hover">
                <div className="main-BooksCard-hover-moreContent">
                  <Link href="/book/[id]" as={`/book/${book.id}`}>
                    <a className="main-BooksCard-hover-moreContent-font">더 알아보기</a>
                  </Link>
                </div>
                <div className="main-BooksCard-hover-authorName-font">by {book.authors.map(author => author.name)}</div>
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
                  value={book?.avgRating}
                  edit={false}
                  size={20}
                  color1="#D8D8D8"
                  color2="#FA604A"
                />
                <div className="main-BooksCard-hover-totalRating">{book?.avgRating?.toFixed(2)}</div>
              </div>
            </div>
          </div>
          <div className="main-books-title">
            <div>{book.title}</div>
          </div>
        </span>
      ))}
    </Container>
  );
};

export default BookList;
