import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import format from "date-fns/format";
import ADD_BOOK from "../query/book";
import { KakaoSearchResult } from "../components/common/SearchKakaoInput";

export default () => {
  const [title, setTitle] = useState();
  const [authors, setAuthors] = useState();
  const [gernes, setGernes] = useState([]);
  const [gerneInput, setGerneInput] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [contents, setContents] = useState();
  const [datetime, setDatetime] = useState(null);
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
    setDatetime(format(new Date(selected?.datetime), "yyyy-MM-dd"));
    setIsbn(selected?.isbn.split(" ")[1]);
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
    setTitle,
    authors,
    gernes,
    gerneInput,
    thumbnail,
    setThumbnail,
    contents,
    setContents,
    datetime,
    setDatetime,
    isbn,
    setIsbn,
    price,
    setPrice,
    publisher,
    setPublisher,
    saleStatus,
    setSaleStatus,
    setGerneInput,
    addBookMutation,
    onKakaoResultClick,
    addGenre
  };
};
