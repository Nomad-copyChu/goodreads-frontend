import React, { useState } from "react";
import Link from "next/link";
import isEmpty from "lodash/isEmpty";
import { User } from "../../types";
import Input from "../common/Input";
import useAddShelf from "../../hooks/useAddShelf";
import Button from "../common/Button";
import useUser from "../../hooks/useUser";

interface IProps {
  name: User["username"];
  shelves: User["shelves"];
}

const UserAddBooks: React.FC<IProps> = ({ name, shelves }) => {
  const state = useAddShelf();
  const [addButtonShow, setAddButtonShow] = useState(false);
  const toggleAddButton = () => {
    setAddButtonShow(!addButtonShow);
  };
  const { user } = useUser();
  return (
    <div className="userinfo-AddBooks-wrapper">
      <h3>{name}님의 선반 Category</h3>
      <div className="userinfo-AddBooks-shelf-wrapper">
        <div className="userinfo-AddBooks-shelf-borderbox-Wrapper">
          {shelves.map((shelf, index) => (
            <Button key={index} width="fit-content" onClick={() => {}} className="mr-12">
              {shelf.name}
            </Button>
          ))}
          {state.addedShelfName.map(shelf => (
            <Button key={shelf.id} width="fit-content" className="mr-12" onClick={() => {}}>
              {shelf.name}
            </Button>
          ))}
        </div>
        {name === user.username && (
          <Button width="fit-content" className="add-shelf-button" onClick={toggleAddButton}>
            추가하기
          </Button>
        )}
      </div>
      {addButtonShow && (
        <div className="AddshelfInputWraaper">
          <Input
            color="transparent"
            value={state.name}
            type="text"
            onChange={e => state.setName(e.target.value)}
            placeholder="선반 이름을 입력해주세요"
          />
          <Button
            color="green"
            onClick={async () => {
              try {
                if (state.name === "") {
                  throw Error("선반 이름을 입력해주세요");
                }
                await state.AddShelfMutation();
                toggleAddButton();
              } catch (e) {
                alert(e.message);
              }
            }}
          >
            선반추가하기
          </Button>
        </div>
      )}
      <div className="AddshelfBorderLine" />
      <div className="shelf-booklist-wrapper">
        {shelves.map((shelf, index) => (
          <div key={index}>
            {shelf.displays.map((display, index) => (
              <div key={index}>
                {isEmpty() && (
                  <div>
                    <h3>{shelf.name}</h3>
                    <div className="shelf-booklist">
                      {shelf.displays.map((display, index) => (
                        <div key={index} className="booklist-thumbnail-title-wrapper">
                          <Link href="/book/[id]" as={`/book/${display.book.id}`}>
                            <a>
                              <img src={display.book.thumbnail} alt="" />
                            </a>
                          </Link>
                          <p>{display.book.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAddBooks;
