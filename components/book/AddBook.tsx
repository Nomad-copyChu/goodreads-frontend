import React, { useEffect } from "react";
import TextArea from "react-textarea-autosize";
import dynamic from "next/dynamic";
import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import MagicBook from "../../public/static/svg/maginBook.svg";
import SearchKakaoInput from "../common/SearchKakaoInput";
import Input from "../common/Input";
import useAddBook from "../../hooks/useAddBook";
import ShareArrow from "../../public/static/svg/share-arrow.svg";
import useUpload from "../../hooks/useUpload";
import Button from "../common/Button";
import AddToShelfButton from "./AddToShelfButton";
import colors from "../../style/colors";
import DatePicker from "../common/DatePicker";
import { GET_AUTHORS_WITH_NAME } from "../../query/author";
import responsive from "../../style/responsive";

const ReactStars = dynamic(import("react-stars"), { ssr: false });

const Container = styled.div`
  margin-top: 20px;
  position: relative;
  .book-wrapper {
    width: fit-content;
    display: flex;
    margin: 60px auto;
    z-index: 9;
    @media (max-width: 670px) {
      flex-direction: column;
      margin: 0 auto;
      width: 100%;
    }
    @media (max-width: ${responsive.small}) {
      padding: 20px;
    }
  }
  .kakao-search-sbumit-wrapper {
    width: 385px;
    margin: auto;
    @media (max-width: 670px) {
      width: calc(100% - 140px);
      margin: 0 20px;
    }
    .book-submit {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      right: 20px;
      top: 0;
      width: fit-content;
      button {
        width: fit-content;
      }
      p {
        margin-top: 8px;
        max-width: 300px;
        color: ${colors.red_500};
      }
    }
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

    .thumbnail-input {
      input {
        position: absolute;
        width: 100%;
        height: 312px;
        opacity: 0;
        cursor: pointer;
        z-index: 1;
      }
    }
    img {
      width: 100%;
      min-height: 312px;
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
    @media (max-width: 670px) {
      margin: 0;
      margin-top: 20px;
    }
    @media (max-width: ${responsive.small}) {
      width: 100%;
    }
    .title-share {
      display: flex;
      justify-content: space-between;
      cursor: pointer;

      .title {
        font-size: 21px;
        font-weight: bold;
        margin-bottom: 8px;
        width: fit-content;
        width: 100%;
        ::placeholder {
          color: ${colors.gray_600};
        }
      }
      .share {
        white-space: pre;
        margin-left: 20px;
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
    form {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
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
  .buy-book-wrapper {
    margin-top: 20px;
    h1 {
      font-size: 16px;
      font-weight: bold;
    }
    .buy-book {
      display: flex;
      margin-top: 12px;
      a {
        padding: 0px 12px;
        height: 32px;
        margin-right: 20px;
        border-radius: 5px;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid ${colors.woody_500};
        color: ${colors.black};
        &:hover {
          background-color: ${colors.woody_600};
          text-decoration: none;
        }
      }
    }
  }
  .author-info-wrapper {
    width: 280px;
    margin-left: 40px;
    @media (max-width: ${responsive.medium}) {
      display: none;
    }
    .author-title {
      font-size: 21px;
    }
    .author-infos {
      margin-top: 20px;
      .author-photo-name-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        .plus-button {
          position: absolute;
          font-size: 32px;
          display: block;
          left: 15px;
          color: ${colors.gray_700};
        }
        .author-photo-input {
          position: absolute;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          cursor: pointer;
          opacity: 0;
        }
        .author-profile-photo {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid ${colors.gray_300};
        }
        .author-name {
          margin-left: 20px;
          span {
            font-size: 16px;
            color: ${colors.blue_green};
            margin-right: 4px;
          }
        }
      }
      .author-description {
        width: 100%;
        margin-top: 20px;
        width: 100%;
        border: 0;
        outline: none;
        font-size: 16px;
        min-height: 180px;
        width: 100%;
        resize: none;
        background-color: transparent;
      }
      .author-books {
        font-size: 21px;
        margin-top: 20px;
      }
      .author-other-book {
        img {
          width: 60px;
          margin-top: 12px;
          border-radius: 5px;
        }
      }
    }
  }
  .mobile-author-info-wrapper {
    width: 280px;
    margin-bottom: 18px;
    .author-title {
      font-size: 21px;
    }
    .author-infos {
      margin-top: 20px;
      .author-photo-name-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        .plus-button {
          position: absolute;
          font-size: 32px;
          display: block;
          left: 15px;
          color: ${colors.gray_700};
        }
        .author-photo-input {
          position: absolute;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          cursor: pointer;
          opacity: 0;
        }
        .author-profile-photo {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid ${colors.gray_300};
        }
        .author-name {
          margin-left: 20px;
          span {
            font-size: 16px;
            color: ${colors.blue_green};
            margin-right: 4px;
          }
        }
      }
      .author-description {
        width: 100%;
        margin-top: 20px;
        width: 100%;
        border: 0;
        outline: none;
        font-size: 16px;
        min-height: 180px;
        width: 100%;
        resize: none;
        background-color: transparent;
      }
      .author-books {
        font-size: 21px;
        margin-top: 20px;
      }
      .author-other-book {
        img {
          width: 60px;
          margin-top: 12px;
          border-radius: 5px;
        }
      }
    }
  }
`;

const AddBook: React.FC = () => {
  const state = useAddBook();
  const { fileUploadMuation } = useUpload();
  //작가 이름들로 DB작가 조회하기
  const { data, refetch, loading } = useQuery(GET_AUTHORS_WITH_NAME, {
    skip: isEmpty(state.authors),
    variables: { authors: state.authors }
  });

  useEffect(() => {
    if (data?.getAuthorsWithName) {
      //서버에서 작가 데이터를 받으면
      state.setAuthorsFromDB(data?.getAuthorsWithName);
    }
  }, [data]);
  useEffect(() => {
    //검색된 작가가 들어오면 서버에 작가 검색
    if (!isEmpty(state.authors)) {
      refetch();
    }
  }, [state.authors]);
  const changeThumbnail = async e => {
    const file = e.target.files[0];
    const { data } = await fileUploadMuation({ variables: { file } });
    state.setThumbnail(data?.singleUpload);
  };

  const changeAuthorPhoto = async (e, index) => {
    const file = e.target.files[0];
    const { data } = await fileUploadMuation({ variables: { file } });
    state.setAuthorsFromDB(authors => {
      const newAuthors = cloneDeep(authors);
      newAuthors[index].photo = data?.singleUpload;
      return newAuthors;
    });
  };

  return (
    <Container>
      <div className="kakao-search-sbumit-wrapper">
        <SearchKakaoInput onClick={state.onKakaoResultClick} placeholder="추가할 책을 검색해주세요." />
        <div className="book-submit">
          <Button color="green" onClick={() => state.addBookMutation()}>
            책 등록하기
          </Button>
          <p>{state.addBookMutationError?.message}</p>
        </div>
      </div>
      <div className="search-input-wrapper">
        <div className="book-wrapper">
          <div className="book-thumbnail-rating">
            <div className="thumbnail-input">
              <input type="file" onChange={changeThumbnail} />
              <img src={state.thumbnail} alt="" />
              {!state.thumbnail && (
                <div className="placeholder-image">
                  <MagicBook />
                  <p>커버 이미지를 추가해 주세요.</p>
                </div>
              )}
            </div>
            <AddToShelfButton
              size="large"
              onClick={() => alert("책을 추가해 주세요")}
              onChange={() => console.warn()}
              options={[
                { value: "원해요", label: "원해요" },
                { value: "읽는중", label: "읽는중" },
                { value: "읽음", label: "읽음" }
              ]}
            />
            <div className="ratings">
              <p>원해요 : 0명</p>
              <p>읽는중 : 0명</p>
              <p>읽음 : 0명</p>
              <div className="stars-wrapper">
                <ReactStars count={5} value={0} size={19} color1="#D8D8D8" color2="#F5A523" />
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
                placeholder="제목..."
                width="100%"
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
              placeholder="책 소개..."
            />
            <div className="mobile-author-info-wrapper">
              <h1 className="author-title">작가</h1>
              {loading && "loading..."}
              {state.authorsFromDB.map((author, index) => (
                <div className="author-infos" key={index}>
                  <div className="author-photo-name-wrapper">
                    {!author.photo && <span className="plus-button">+</span>}
                    <input className="author-photo-input" type="file" onChange={e => changeAuthorPhoto(e, index)} />
                    <img src={author.photo || "  "} alt="" className="author-profile-photo" />
                    <p className="author-name">{author.name}</p>
                  </div>
                </div>
              ))}
            </div>
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
                <form onSubmit={state.addGerne}>
                  {state.gernes.map((gerne, index) => (
                    <span key={index}>{`#${gerne}`}</span>
                  ))}
                  <Input
                    color="transparent"
                    value={state.gerneInput}
                    type="text"
                    onChange={e => state.setGerneInput(e.target.value)}
                    placeholder="엔터로 추가해 주세요"
                  />
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
                  onChange={e => state.setPrice(e.target.value)}
                  placeholder="20000만원..."
                />
              </div>
              <div className="info-wrapper">
                <p>판매상태 :</p>
                <Input
                  color="transparent"
                  value={state.saleStatus}
                  type="text"
                  onChange={e => state.setSaleStatus(e.target.value)}
                  placeholder="정상판매..."
                />
              </div>
            </div>
            <div className="buy-book-wrapper">
              <h1>책 구하기</h1>
              <div className="buy-book">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`http://www.yes24.com/Mall/Buyback/Search?SearchDomain=BOOK,FOREIGN&searchWord=${state.isbn}`}
                >
                  Yes24
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=${state.isbn}&orderClick=LAG&Kc=`}
                >
                  교보문고
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.nl.go.kr/kolisnet/search/searchResultList.do?tab=BKGM&historyYn=Y&keywordType1=total&keyword1=${state.isbn}&bookFilter=BKGM`}
                >
                  국립 도서관
                </a>
              </div>
            </div>
          </div>
          <div className="author-info-wrapper">
            <h1 className="author-title">작가</h1>
            {loading && "loading..."}
            {state.authorsFromDB.map((author, index) => (
              <div className="author-infos" key={index}>
                <div className="author-photo-name-wrapper">
                  {!author.photo && <span className="plus-button">+</span>}
                  <input className="author-photo-input" type="file" onChange={e => changeAuthorPhoto(e, index)} />
                  <img src={author.photo || "  "} alt="" className="author-profile-photo" />
                  <p className="author-name">{author.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddBook;
