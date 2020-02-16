import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import ADD_BOOK from "../query/book";
import { KakaoSearchResult } from "../components/common/SearchKakaoInput";

export default () => {
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
  const onKakaoResultClick = (selected: KakaoSearchResult) => {
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
  };
  const addGenre = e => {
    e.preventDefault();
    setGernes(gerne => [...gerne, gerneInput]);
    setGerneInput("");
  };
  return {
    title,
    authors,
    gernes,
    gerneInput,
    thumbnail,
    contents,
    datetime,
    isbn,
    price,
    publisher,
    saleStatus,
    setGerneInput,
    addBookMutation,
    onKakaoResultClick,
    addGenre
  };
};
