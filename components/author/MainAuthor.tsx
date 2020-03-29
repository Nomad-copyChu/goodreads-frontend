import React from "react";
import styled from "styled-components";
import Link from "next/link";
import isEmpty from "lodash/isEmpty";
import { Author } from "../../types";
import colors from "../../style/colors";

const Container = styled.div`
  width: 100%;
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
    height: 100%;
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
    flex-shrink: 0;
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
    flex-wrap: wrap;
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
    overflow: scroll;
  }
  .main-author-booklist-thumbnail {
    margin-right: 12px;
    width: 60px;
    height: 94px;
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    border-radius: 5px;
  }
  .no-main-author-books {
    width: 60px !important;
    margin-top: 4px;
    padding-top: 5px;
    align-items: center;
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.gray_500};
    border-radius: 5px;
    p {
      margin-top: 4px;
      font-size: 12px;
      color: ${colors.gray_600};
      text-align: center;
    }
  }
`;

interface IProps {
  author: Author;
  style?: React.CSSProperties;
}

const MainAuthor: React.FC<IProps> = ({ author, style }) => {
  return (
    <Container style={style}>
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
          {!isEmpty(author?.books) ? (
            <>
              {author?.books.map(book => (
                <Link href="/book/[id]" as={`/book/${book.id} `} key={book.id}>
                  <a>
                    <img className="main-author-booklist-thumbnail" src={book.thumbnail} alt="" />
                  </a>
                </Link>
              ))}
            </>
          ) : (
            <div className="no-main-author-books">
              <img src="/static/svg/sad.svg" alt="" />
              <p>
                책이
                <br />
                없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default MainAuthor;
