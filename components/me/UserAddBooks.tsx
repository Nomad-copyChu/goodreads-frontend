import React from "react";
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
  return (
    <div className="userinfo-AddBooks-wrapper">
      <h3>{name}님의 선반 Category</h3>
      <div className="userinfo-AddBooks-shelf-borderbox-Wrapper">
        {shelves.map((shelve, index) => (
          <div key={index} className="userinfo-AddBooks-shelf-borderbox">
            {shelve.name}
          </div>
        ))}
      </div>
      <Input
        color="transparent"
        value={state.addShelfName}
        type="text"
        onChange={e => state.setAddShelfName(e.target.value)}
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
  );
};

export default UserAddBooks;
