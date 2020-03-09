import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Author } from "../../types";

const Container = styled.div`
  width: calc((100% - 24px) / 2);
  .main-borderbox-author {
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    @media (max-width: 870px) {
      width: 100%;
      margin-bottom: 15px;
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
`;

interface IProps {
  author: Author;
}

const MainAuthor: React.FC<IProps> = ({ author }) => {
  return (
    <Container>
      <div className="main-borderbox-author">
        <div className="main-author-info-wrapper">
          <img className="author-photo" src={author.photo} alt="" />
          <Link href="/author/[id]" as={`/author/${author.id}`}>
            <a className="author-name">{author.name}</a>
          </Link>
        </div>
        <div className="main-author-booksfont">Books</div>
        <div className="main-author-booklist">
          {author.books.map(book => (
            <img src={book.thumbnail} alt="" key={book.id} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default MainAuthor;
