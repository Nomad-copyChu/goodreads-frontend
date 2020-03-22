import React from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Link from "next/link";
import Router from "next/router";
import AddToShelfButton from "./AddToShelfButton";
import colors from "../../style/colors";
import { Book } from "../../types";

const ReactStars = dynamic(import("react-stars"), { ssr: false });

const Container = styled.div`
  padding: 8px;
  width: 200px;
  height: 284px;
  border: 1px solid #d8d8d8;
  box-sizing: border-box;
  border-radius: 5px;
  overflow: hidden;
  flex-shrink: 0;
  h3 {
    font-size: 16px;
    margin-bottom: 1px solid ${colors.gray_500};
  }
  .border {
    margin-top: 2px;
    margin-bottom: 4px;
    border: 1px solid #d8d8d8;
    width: 185px;
  }
  .main-bestbook-info {
    display: flex;
    img {
      width: 80px;
      height: 113px;
    }
    .booksCard {
      width: 80px;
      height: 113px;
      border: 1px solid #d8d8d8;
      box-sizing: border-box;
      border-radius: 5px;
    }
    .main-bestbook-column {
      margin-left: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
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
    }
  }
  .contents {
    margin-top: 9px;
    width: 180px;
    color: #aaaaaa;
    font-size: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 8; /* ellipsis line */
    -webkit-box-orient: vertical;
  }
`;
interface IProps {
  book: Book;
  className?: string;
}

const BestBookThisWeek: React.FC<IProps> = ({ book, className }) => {
  console.log(book);
  return (
    <Container className={className}>
      <h3>이주의 배스트 책</h3>
      <div className="border" />
      <div className="main-bestbook-info">
        <img className="booksCard" src={book.thumbnail} alt="" />
        <div className="main-bestbook-column">
          <div>
            <Link href="/book/[id]" as={`/book/${book.id}`}>
              <a className="bestbook-title">{book.title}</a>
            </Link>
          </div>
          <div className="bestbook-author">
            <span>by</span>
            {book.authors.map(author => (
              <Link href="/author/[id]" as={`/author/${author.id}`}>
                <a key={author.id}>{author.name}</a>
              </Link>
            ))}
          </div>
          <div className="rating-text">
            <ReactStars count={5} edit={false} value={book.avgRating} size={12} color1="#D8D8D8" color2="#FA604A" />
            <span>{book.avgRating.toFixed(2)}</span>
          </div>
          <div className="rating-and-review">
            <Link href="/book/[id]" as={`/book/${book.id}`}>
              <a>{book.ratedUserNum} ratings</a>
            </Link>
            <Link href="/book/[id]" as={`/book/${book.id}`}>
              <a>{book.comments.length} review</a>
            </Link>
          </div>
          <AddToShelfButton className="shelfbutton" onClick={() => Router.push(`/book/${book.id}`)} size="medium" />
        </div>
      </div>
      <div className="contents">{book.contents}</div>
    </Container>
  );
};

export default BestBookThisWeek;
