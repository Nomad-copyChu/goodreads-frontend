import React from "react";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import Link from "next/link";
import MagicBookIcon from "../../public/static/svg/maginBook.svg";
import { User } from "../../types";

interface IProps {
  displays: User["displays"];
}

const UserShelves: React.FC<IProps> = ({ displays }) => {
  return (
    <div className="userinfo-shelf-wrapper">
      <h3>원해요</h3>
      <div className="userinfo-shelf-bookWrapper">
        {displays.map(display =>
          display.shelves.map((shelf, i) => {
            if (shelf.name === "want") {
              return (
                <div key={i}>
                  <Link href="/book/[id]" as={`/book/${display.book.id}`}>
                    <a>
                      <img className="userinfo-shelf-thumbnail" src={display.book.thumbnail} alt="" />
                    </a>
                  </Link>
                  <div className="userinfo-shelf-title">{display.book.title}</div>
                </div>
              );
            }
            return null;
          })
        )}
        {isEmpty(displays) && (
          <Link href="/book">
            <a>
              <div className="not-exist-logged-book-card-wrapper">
                <MagicBookIcon />
                <p>
                  선반에 책을 추가해
                  <br />
                  보세요!!
                </p>
              </div>
            </a>
          </Link>
        )}
      </div>
      <h3>읽는중</h3>
      <div className="userinfo-shelf-bookWrapper">
        {displays.map(display =>
          display.shelves.map((shelf, index) => {
            if (shelf.name === "reading") {
              return (
                <div key={index}>
                  <Link href="/book/[id]" as={`/book/${display.book.id}`}>
                    <a>
                      <img className="userinfo-shelf-thumbnail" src={display.book.thumbnail} alt="" />
                    </a>
                  </Link>
                  <div className="userinfo-shelf-title">{display.book.title}</div>
                </div>
              );
            }
            return null;
          })
        )}
        {isEmpty(displays) && (
          <Link href="/book">
            <a>
              <div className="not-exist-logged-book-card-wrapper">
                <MagicBookIcon />
                <p>
                  선반에 책을 추가해
                  <br />
                  보세요!!
                </p>
              </div>
            </a>
          </Link>
        )}
      </div>
      <h3>다읽음</h3>
      <div className="userinfo-shelf-bookWrapper">
        {displays.map(display =>
          display.shelves.map((shelf, i) => {
            if (shelf.name === "read") {
              return (
                <div key={i}>
                  <Link href="/book/[id]" as={`/book/${display.book.id}`}>
                    <a>
                      <img className="userinfo-shelf-thumbnail" src={display.book.thumbnail} alt="" />
                    </a>
                  </Link>
                  <div className="userinfo-shelf-title">{display.book.title}</div>
                </div>
              );
            }
            return null;
          })
        )}
        {isEmpty(displays) && (
          <Link href="/book">
            <a>
              <div className="not-exist-logged-book-card-wrapper">
                <MagicBookIcon />
                <p>
                  선반에 책을 추가해
                  <br />
                  보세요!!
                </p>
              </div>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};
export default UserShelves;
