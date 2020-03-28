import React from "react";
import Link from "next/link";
import isEmpty from "lodash/isEmpty";
import MagicBookIcon from "../../public/static/svg/maginBook.svg";
import { User } from "../../types";

interface IProps {
  shelves: User["shelves"];
}

const UserShelves: React.FC<IProps> = ({ shelves }) => {
  return (
    <div className="userinfo-shelf-wrapper">
      {shelves.map((shelf, index) => (
        <div key={index}>
          <h3>{shelf.name}</h3>
          <div className="userinfo-shelf-bookWrapper">
            {shelf.displays.map((display, index) => (
              <div key={index}>
                <Link href="/book/[id]" as={`/book/${display.book.id}`}>
                  <a>
                    <img className="userinfo-shelf-thumbnail" src={display.book.thumbnail} alt="" />
                  </a>
                </Link>
                <div className="userinfo-shelf-title">{display.book.title}</div>
              </div>
            ))}
            {isEmpty(shelf.displays.map(display => display.book.id)) && (
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
      ))}
    </div>
  );
};
export default UserShelves;
