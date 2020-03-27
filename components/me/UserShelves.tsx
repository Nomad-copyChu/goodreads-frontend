import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { User } from "../../types";

interface IProps {
  user: User;
}

const UserShelves: React.FC<IProps> = ({ user }) => {
  return (
    <div className="userinfo-shelf-wrapper">
      <h3>원해요</h3>
      <div className="userinfo-shelf-bookWrapper">
        {user.displays.map(display =>
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
      </div>
      <h3>읽는중</h3>
      <div className="userinfo-shelf-bookWrapper">
        {user.displays.map(display =>
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
      </div>
      <h3>다읽음</h3>
      <div className="userinfo-shelf-bookWrapper">
        {user.displays.map(display =>
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
      </div>
    </div>
  );
};
export default UserShelves;
