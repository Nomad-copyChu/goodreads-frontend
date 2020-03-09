import React from "react";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import { Book } from "../../types";

interface IProps {
  books: Book[];
}

const LoggedBookList: React.FC<IProps> = ({ books }) => {
  const { user } = useUser();
  return (
    <div>
      <h2>나의 선반 책들</h2>
      <div className="books-slide">{user?.displays?.map(display => display.book?.title)}</div>
    </div>
  );
};

export default LoggedBookList;
