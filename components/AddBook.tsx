/* eslint-disable react/no-array-index-key */
import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import ReactStars from "react-stars";
import styled from "styled-components";
import ADD_BOOK from "../query/book";
import MagicBook from "../public/static/svg/maginBook.svg";
import SearchKakaoInput from "./common/SearchKakaoInput";
import Input from "./common/Input";
import useAddBook from "../hooks/useAddBook";
import useUpload from "../hooks/useUpload";
import Button from "./common/Button";
import Selector from "./common/Selector";
import colors from "../style/colors";

const Container = styled.div`
  .search-input-wrapper {
    width: 385px;
    margin: 20px auto;
  }
  .search-input-wrapper {
    margin-top: 30px;
    display: flex;
  }
  .book-thumbnail-rating {
    width: 200px;
    position: relative;
    img {
      width: 100%;
      height: 312px;
      margin-bottom: 12px;
    }
    .placeholder-image {
      position: absolute;
      top: 90px;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      p {
        color: ${colors.gray_500};
        font-size: 16px;
        margin-top: 15px;
      }
    }
    .ratings {
      margin-top: 12px;
      p {
        margin-bottom: 8px;
        &:last-child {
          margin: 0;
        }
      }
      .stars-wrapper {
        display: flex;
        justify-content: space-between;
      }
    }
  }
`;

const AddBook: React.FC = () => {
  const {
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
  } = useAddBook();
  const { fileUploadMuation } = useUpload();
  return (
    <Container>
      <SearchKakaoInput onClick={onKakaoResultClick} />
      <div className="search-input-wrapper">
        <div className="book-wrapper">
          <div className="book-thumbnail-rating">
            <img src={thumbnail} alt="" />
            {!thumbnail && (
              <div className="placeholder-image">
                <MagicBook />
                <p>커버 이미지를 추가해 주세요.</p>
              </div>
            )}
            <Button
              onClick={() => {
                console.log("addToShelf");
              }}
            >
              <Selector />
              <p>선반에 추가하기</p>
            </Button>
            <div className="ratings">
              <p>원해요 : 0명</p>
              <p>읽는중 : 0명</p>
              <p>읽음 : 0명</p>
              <div className="stars-wrapper">
                <ReactStars
                  count={5}
                  value={0}
                  onChange={e => console.log(e)}
                  size={20}
                  color1="#D8D8D8"
                  color2="#F5A523"
                />
                <p>0 (0명 투표함)</p>
              </div>
            </div>
          </div>
          <div className="book-infos">
            <div className="title-share" />
          </div>
        </div>

        <form onSubmit={addGenre}>
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
