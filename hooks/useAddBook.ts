import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import format from "date-fns/format";
import ADD_BOOK from "../query/book";
import { KakaoSearchResult } from "../components/common/SearchKakaoInput";

type AddBookAuthorType = {
  name: string;
  description?: string;
  photo?: string;
};

export default () => {
  const [title, setTitle] = useState();
  const [authors, setAuthors] = useState<string[]>([]);
  const [gernes, setGernes] = useState([]);
  const [gerneInput, setGerneInput] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [contents, setContents] = useState();
  const [datetime, setDatetime] = useState(null);
  const [isbn, setIsbn] = useState();
  const [price, setPrice] = useState();
  const [publisher, setPublisher] = useState();
  const [saleStatus, setSaleStatus] = useState();
  const [authorsFromDB, setAuthorsFromDB] = useState<AddBookAuthorType[]>([]);

  const [addBookMutation] = useMutation(ADD_BOOK, {
    variables: {
      bookInfos: {
        title,
        gernes,
        thumbnail,
        contents,
        datetime,
        isbn,
        price,
        publisher,
        saleStatus
      },
      authors: authorsFromDB.map((author: AddBookAuthorType) => ({
        name: author.name,
        description: author.description,
        photo: author.photo
      }))
    }
  });
  const onKakaoResultClick = (selected: KakaoSearchResult) => {
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
  const addGerne = e => {
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
    addGerne,
    authorsFromDB,
    setAuthorsFromDB
  };
};
