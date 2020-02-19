/* eslint-disable react/no-array-index-key */
import React from "react";
import TextArea from "react-textarea-autosize";
import dynamic from "next/dynamic";
import format from "date-fns/format";
import styled from "styled-components";
import MagicBook from "../public/static/svg/maginBook.svg";
import SearchKakaoInput from "./common/SearchKakaoInput";
import Input from "./common/Input";
import useAddBook from "../hooks/useAddBook";
import ShareArrow from "../public/static/svg/share-arrow.svg";
import useUpload from "../hooks/useUpload";
import Button from "./common/Button";
import Selector from "./common/Selector";
import colors from "../style/colors";
import DatePicker from "./common/DatePicker";

const ReactStars = dynamic(import("react-stars"), { ssr: false });

const Container = styled.div`
  .book-wrapper {
    display: flex;
  }
  .kakao-search-wrapper {
    width: 385px;
    margin: auto;
    margin-top: 20px;
  }
  .search-input-wrapper {
    width: fit-content;
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
  .book-infos {
    width: 385px;
    margin-left: 30px;

    .title-share {
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 21px;
        font-weight: bold;
        margin-bottom: 8px;
        width: fit-content;
        ::placeholder {
          color: ${colors.gray_600};
        }
      }
      .share {
        span {
          color: ${colors.blue_green};
          margin-left: 4px;
        }
        cursor: pointer;
      }
    }
    .contents-textarea {
      width: 100%;
      border: 0;
      outline: none;
      font-size: 16px;
      min-height: 180px;
      width: 100%;
      resize: none;
      background-color: transparent;
    }
  }
  .sub-infos {
    width: 100%;
    border-bottom: 1px solid ${colors.gray_500};
    border-top: 1px solid ${colors.gray_500};

    padding: 16px 0;
    .info-wrapper {
      display: flex;
      align-items: center;
      margin-top: 8px;
    }
    h3 {
      font-size: 16px;
      font-weight: bold;
    }
    p {
      font-size: 14px;
      color: ${colors.gray_800};
      margin-top: 4px;
      margin-right: 8px;
      flex-shrink: 0;
    }
  }
`;

const AddBook: React.FC = () => {
  const state = useAddBook();
  const { fileUploadMuation } = useUpload();
  return (
    <Container>
      <div className="kakao-search-wrapper">
        <SearchKakaoInput onClick={state.onKakaoResultClick} />
      </div>
      <div className="search-input-wrapper">
        <div className="book-wrapper">
          <div className="book-thumbnail-rating">
            <img src={state.thumbnail} alt="" />
            {!state.thumbnail && (
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
            <div className="title-share">
              <Input
                color="transparent"
                value={state.title}
                className="title"
                type="text"
                onChange={e => state.setTitle(e.target.value)}
                placeholder="Title..."
              />
              <div className="share">
                <ShareArrow />
                <span>공유하기</span>
              </div>
            </div>
            <TextArea
              color="transparent"
              className="contents-textarea"
              value={state.contents}
              type="text"
              onChange={e => state.setContents(e.target.value)}
              placeholder="Contents..."
            />
            <div className="sub-infos">
              <h3>More</h3>
              <div className="info-wrapper">
                <p>ISBN :</p>
                <Input
                  color="transparent"
                  value={state.isbn}
                  type="text"
                  onChange={e => state.setIsbn(e.target.value)}
                  placeholder="1234567..."
                />
              </div>
              <div className="info-wrapper">
                <p>장르 :</p>
                <form onSubmit={state.addGenre}>
                  <Input
                    color="transparent"
                    value={state.gerneInput}
                    type="text"
                    onChange={e => state.setGerneInput(e.target.value)}
                    placeholder="#해커톤 #노예 #아이패드"
                  />
                  {state.gernes.map((gerne, index) => (
                    <span key={index}>{`#${gerne}`}</span>
                  ))}
                </form>
              </div>
              <div className="info-wrapper">
                <p>출판사 :</p>
                <Input
                  color="transparent"
                  value={state.publisher}
                  type="text"
                  onChange={e => state.setPublisher(e.target.value)}
                  placeholder="제리출판사..."
                />
              </div>
              <div className="info-wrapper">
                <p>출간날짜 :</p>
                <DatePicker value={state.datetime} onChange={date => state.setDatetime(date)} />
              </div>
              <div className="info-wrapper">
                <p>가격 :</p>
                <Input
                  color="transparent"
                  value={state.price}
                  type="text"
                  onChange={e => state.setDatetime(e.target.value)}
                  placeholder="1234567..."
                />
              </div>
              <div className="info-wrapper">
                <p>판매상태 :</p>
                <Input
                  color="transparent"
                  value={state.saleStatus}
                  type="text"
                  onChange={e => state.setSaleStatus(e.target.value)}
                  placeholder="1234567..."
                />
              </div>
            </div>
            <div className="buy-book">
              <Button onClick={() => console.log("hi")}>Amazon</Button>
              <Button onClick={() => console.log("hi")}>알라딘</Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddBook;
