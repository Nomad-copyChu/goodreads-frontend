import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Author } from "../../types";

const Container = styled.div`
  width: calc((100% - 24px) / 2);
  @media (max-width: 870px) {
    width: 100%;
    &:last-child {
      display: none;
    }
  }
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
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    border-radius: 5px;
  }
  .author-name {
    font-size: 16px;
  }

  .author-description-wrpper {
    margin-top: 16px;
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .author-description {
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* ellipsis line */
    -webkit-box-orient: vertical;
  }
  .author-gerne-wrapper {
    display: flex;
    margin-right: 3px;
  }
  .author-gerne {
    font-size: 14px;
    color: #767676;
  }
  .main-author-booksfont {
    margin-left: 16px;
    margin-top: 4px;
    font-size: 12px;
  }
  .main-author-booklist {
    margin-left: 16px;
    display: flex;
    margin-bottom: 7px;
    align-items: center;
  }
  .main-author-booklist-thumbnail {
    margin-right: 12px;
    width: 60px;
    height: 94px;
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    border-radius: 5px;
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
          <img className="author-photo" src={author?.photo} alt="" />
          <div className="author-description-wrpper">
            <Link href="/author/[id]" as={`/author/${author?.id}`}>
              <a className="author-name">{author?.name}</a>
            </Link>
            <p className="author-description">{author?.description}</p>
            <span className="author-gerne-wrapper">
              {author?.gernes?.map(gerne => (
                <div className="author-gerne" key={gerne.id}>
                  #{gerne.term}
                </div>
              ))}
            </span>
          </div>
        </div>
        <div className="main-author-booksfont">{author?.name}의 책들</div>
        <div className="main-author-booklist">
          {author?.books.map(book => (
            <Link href="/book/[id]" as={`/book/${book.id} `} key={book.id}>
              <a>
                <img className="main-author-booklist-thumbnail" src={book.thumbnail} alt="" />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default MainAuthor;
