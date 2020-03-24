import React from "react";
import Link from "next/link";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import Want from "../../public/static/svg/wantLabel.svg";
import Reading from "../../public/static/svg/readingLabel.svg";
import Read from "../../public/static/svg/noReadLabel.svg";
import { Display } from "../../types/index";
import MagicBook from "../../public/static/svg/maginBook.svg";
import colors from "../../style/colors";

const Container = styled.div`
  display: flex;
  .logged-book-card-wrapper {
    position: relative;
    width: 150px;
    margin-right: 20px;
  }
  .logged-book-card-thumbnail {
    position: relative;
    width: 100%;
    height: 234px;
    border: 1px solid ${colors.gray_500};
    border-radius: 5px;
  }

  .logged-book-card-Label {
    width: 25px;
    height: 40px;
  }
  .logged-book-card-label-overlay {
    position: absolute;
    top: 9px;
    margin-left: 120px;
    margin-top: -10px;
  }
  .logged-book-card-title {
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
  .not-exist-logged-book-card-wrapper {
    width: 150px;
    margin-right: 20px;
    height: 234px;
    border: 1px solid ${colors.gray_500};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 24px;
    p {
      text-align: center;
      color: ${colors.gray_600};
    }
  }
`;

interface IProps {
  displays: Display[];
}
const LoggedBookList: React.FC<IProps> = ({ displays }) => {
  return (
    <Container>
      {displays?.map((display, i) => (
        <div className="logged-book-card-wrapper" key={i}>
          <Link href="/book/[id]" as={`/book/${display.book?.id}`}>
            <a>
              <img className="logged-book-card-thumbnail" src={display.book?.thumbnail} alt={display.book?.title} />
            </a>
          </Link>
          {display.shelves?.map((shelf, i) => {
            switch (shelf?.name) {
              case "want":
                return (
                  <div key={i} className="logged-book-card-label-overlay">
                    <Want className="logged-book-card-Label" />
                  </div>
                );
              case "read":
                return (
                  <div key={i} className="logged-book-card-label-overlay">
                    <Read className="logged-book-card-Label" />
                  </div>
                );
              case "reading":
                return (
                  <div key={i} className="logged-book-card-label-overlay">
                    <Reading className="logged-book-card-Label" />
                  </div>
                );
              default:
                return null;
            }
          })}
          <p className="logged-book-card-title">{display.book.title}</p>
        </div>
      ))}
      {isEmpty(displays) && (
        <Link href="/add/book">
          <a>
            <div className="not-exist-logged-book-card-wrapper">
              <MagicBook />
              <p>
                선반에 책을 추가해
                <br />
                보세요!!
              </p>
            </div>
          </a>
        </Link>
      )}
    </Container>
  );
};

export default LoggedBookList;
