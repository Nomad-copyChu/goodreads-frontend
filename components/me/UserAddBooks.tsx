import React, { useState } from "react";
import { User } from "../../types";
import Input from "../common/Input";
import useAddShelf from "../../hooks/useAddShelf";
import Button from "../common/Button";

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
  return (
    <div className="userinfo-AddBooks-wrapper">
      <h3>{name}님의 선반 Category</h3>
      <div className="userinfo-AddBooks-shelf-wrapper">
        <div className="userinfo-AddBooks-shelf-borderbox-Wrapper">
          {shelves.map((shelf, index) => (
            <div key={index} className="userinfo-AddBooks-shelf-borderbox">
              {shelf.name}
            </div>
          ))}
          {state.addedShelfName.map(shelf => (
            <div key={shelf.id} className="userinfo-AddBooks-shelf-borderbox">
              {shelf}
            </div>
          ))}
        </div>
        <div role="button" className="userinfo-AddBooks-shelf-borderbox-addbutton" onClick={toggleAddButton}>
          추가하기
        </div>
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
                await state.AddShelfMutation();
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
      {shelves.map((shelf, index) => (
        <h3 key={index}>
          {name}님의 선반 {shelf.name}
        </h3>
      ))}
    </div>
  );
};

export default UserAddBooks;
