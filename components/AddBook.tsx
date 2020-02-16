/* eslint-disable react/no-array-index-key */
import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import styled from "styled-components";
import ADD_BOOK from "../query/book";
import SearchKakaoInput from "./common/SearchKakaoInput";
import Input from "./common/Input";

const Container = styled.div`
  .search-input-wrapper {
    width: 385px;
    margin: 20px auto;
  }
`;

const AddBook: React.FC = () => {
  const [title, setTitle] = useState();
  const [authors, setAuthors] = useState();
  const [gernes, setGernes] = useState([]);
  const [gerneInput, setGerneInput] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [contents, setContents] = useState();
  const [datetime, setDatetime] = useState();
  const [isbn, setIsbn] = useState();
  const [price, setPrice] = useState();
  const [publisher, setPublisher] = useState();
  const [saleStatus, setSaleStatus] = useState();
  const [addBookMutation] = useMutation(ADD_BOOK, {
    variables: {
      title,
      authors,
      gernes,
      thumbnail,
      contents,
      datetime,
      isbn,
      price,
      publisher,
      saleStatus
    }
  });
  return (
    <Container>
      <div className="search-input-wrapper">
        <SearchKakaoInput
          onClick={selected => {
            console.log(selected);
            setTitle(selected?.title);
            setAuthors(selected?.authors);
            setThumbnail(selected?.thumbnail);
            setContents(selected?.contents);
            setDatetime(selected?.datetime);
            setIsbn(selected?.isbn.split(" ")[0]);
            setPrice(selected?.price);
            setPublisher(selected?.publisher);
            setSaleStatus(selected?.status);
          }}
        />

        <form
          onSubmit={e => {
            e.preventDefault();
            setGernes(gerne => [...gerne, gerneInput]);
            setGerneInput("");
          }}
        >
          {gernes.map((gerne, index) => (
            <span key={index}>{`#${gerne}`}</span>
          ))}
          <Input color="transparent" value={gerneInput} onChange={e => setGerneInput(e.target.value)} />
        </form>
      </div>
    </Container>
  );
};

export default AddBook;
