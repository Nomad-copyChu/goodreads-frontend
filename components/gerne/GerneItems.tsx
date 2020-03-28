import React from "react";
import styled from "styled-components";
import { Gerne } from "../../types";
import BookList from "../book/BookList";
import MainAuthor from "../author/MainAuthor";

const Container = styled.div`
  width: 875px;
  margin: auto;
  h1 {
    margin-top: 20px;
    font-size: 21px;
    margin-bottom: 18px;
  }

  .book-list-wrapper {
    overflow: scroll;
  }
  .gerne-author-list-wrapper {
    margin-top: 20px;
    margin-bottom: 60px;
    overflow: scroll;
    .gerne-author-list {
      display: flex;
      flex-wrap: wrap;
      width: max-content;
    }
  }
`;
interface IProps {
  gerne: Gerne;
}

const GerneItems: React.FC<IProps> = ({ gerne }) => {
  return (
    <Container>
      <h1>#{gerne.term}</h1>
      <h1>{gerne.term} 책들</h1>
      <div className="book-list-wrapper">
        <BookList books={gerne?.books} />
      </div>
      <h1>{gerne.term} 작가들</h1>

      <div className="gerne-author-list-wrapper">
        <div className="gerne-author-list ">
          {gerne?.authors?.map(author => (
            <MainAuthor author={author} style={{ marginRight: "20px", width: "400px" }} key={author.id} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default GerneItems;
