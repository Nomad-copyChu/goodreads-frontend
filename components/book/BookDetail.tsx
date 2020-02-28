import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import isEmpty from "lodash/isEmpty";
import TextareaAutosize from "react-textarea-autosize";
import MagicBook from "../../public/static/svg/maginBook.svg";
import ShareArrow from "../../public/static/svg/share-arrow.svg";
import AddToShelfButton from "./AddToShelfButton";
import colors from "../../style/colors";
import { Book } from "../../types";
import useUser from "../../hooks/useUser";
import useBook from "../../hooks/useBook";
import Button from "../common/Button";

const ReactStars = dynamic(import("react-stars"), { ssr: false });

const Container = styled.div`
  margin-top: 20px;
  position: relative;
  .book-wrapper {
    display: flex;
  }
  .kakao-search-sbumit-wrapper {
    width: 385px;
    margin: auto;
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

    .title-share {
      display: flex;
      justify-content: space-between;

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
    padding-bottom: 20px;
    border-bottom: 1px solid ${colors.gray_500};

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
        border: 1px solid ${colors.beige_900};
        color: ${colors.black};
        &:hover {
          background-color: ${colors.beige_500};
          text-decoration: none;
        }
      }
    }
  }
  .book-comments {
    margin-top: 20px;
    h1 {
      font-size: 16px;
      font-weight: bold;
    }
    textarea {
      margin-top: 12px;
      width: 100%;
      min-height: 80px;
      border-radius: 5px;
      border: 1px solid ${colors.gray_500};
      background-color: transparent;
      padding: 12px;
      outline: none;
      resize: none;
      font-size: 14px;
    }
    .book-comment-button-wrapper {
      display: flex;
      margin-top: 8px;
      padding-bottom: 12px;
      border-bottom: 1px solid ${colors.gray_500};
      button {
        margin: 0 0 0 auto;
      }
    }
  }
  .author-info-wrapper {
    width: 280px;
    margin-left: 40px;
    .share {
      white-space: pre;
      margin-left: 20px;
      span {
        color: ${colors.blue_green};
        margin-left: 4px;
      }
      cursor: pointer;
    }
    .author-share-wrapper {
      display: flex;
      justify-content: space-between;
    }
    .author-title {
      font-size: 21px;
    }
    .author-infos {
      margin-top: 20px;
      .author-photo-name-wrapper {
        display: flex;
        align-items: center;
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

interface IProps {
  book: Book;
  rating?: { id: string; count: number };
}

const BookDetail: React.FC<IProps> = ({ book, rating }) => {
  const { user, isLogged, addToShelfMutation, rateBook } = useUser();
  const { getShelvesName } = useBook();
  /**
   * * 유저 선반 리스트
   */
  const shelvesNames = useMemo(() => {
    if (isLogged) {
      return getShelvesName(user?.shelves);
    }
    return [
      { value: "원해요", label: "원해요" },
      { value: "읽는중", label: "읽는중" },
      { value: "읽음", label: "읽음" }
    ];
  }, []);
  /**
   * * 추가할 유저의 선반
   */
  const [shelf, setShelf] = useState(shelvesNames[0]);
  const [starCount, setStarCount] = useState(rating ? rating.count : 0);
  const router = useRouter();
  return (
    <Container>
      <div className="search-input-wrapper">
        <div className="book-wrapper">
          <div className="book-thumbnail-rating">
            <div className="thumbnail-input">
              <img src={book.thumbnail} alt={book.title} />
              {!book.thumbnail && (
                <div className="placeholder-image">
                  <MagicBook />
                  <p>커버 이미지를 추가해 주세요.</p>
                </div>
              )}
            </div>
            <AddToShelfButton
              value={shelf}
              options={shelvesNames}
              onChange={value => setShelf(value)}
              onClick={async () => {
                if (isLogged) {
                  try {
                    await addToShelfMutation({
                      variables: { shelfName: shelf.value, bookId: book.id }
                    }).then(() => alert(`${shelf.value}선반에 추가하였습니다.`));
                  } catch (e) {
                    alert(e.message);
                  }
                } else {
                  alert("로그인이 필요한 기능 입니다.");
                }
              }}
            />
            <div className="ratings">
              <p>{`원해요 : ${book.wantCount}명`}</p>
              <p>{`읽는중 : ${book.readingCount}명`}</p>
              <p>{`읽음 : ${book.readCount}명`}</p>
              <div className="stars-wrapper">
                <ReactStars
                  count={5}
                  value={starCount}
                  onChange={count => {
                    setStarCount(count);
                    rateBook({ variables: { bookId: book.id, count } }).catch(e => alert(e.message));
                  }}
                  size={20}
                  color1={colors.gray_500}
                  color2={colors.yellow_700}
                />
                <p>0 (0명 투표함)</p>
              </div>
            </div>
          </div>
          <div className="book-infos">
            <div className="title-share">
              <p className="title">{book.title}</p>
            </div>
            <p className="contents-textarea">{book.contents}</p>
            <div className="sub-infos">
              <h3>More</h3>
              <div className="info-wrapper">
                <p>ISBN :</p>
                <p>{book.isbn}</p>
              </div>
              {!isEmpty(book.gernes) && (
                <div className="info-wrapper">
                  <p>장르 :</p>
                  {book.gernes.map((gerne, index) => (
                    <span key={index}>{`#${gerne}`}</span>
                  ))}
                </div>
              )}

              <div className="info-wrapper">
                <p>출판사 :</p>
                <p>{book.publisher}</p>
              </div>
              <div className="info-wrapper">
                <p>출간날짜 :</p>
                <p>{book.datetime}</p>
              </div>
              <div className="info-wrapper">
                <p>가격 :</p>
                <p>{book.price}</p>
              </div>
              <div className="info-wrapper">
                <p>판매상태 :</p>
                <p>{book.saleStatus}</p>
              </div>
            </div>
            <div className="buy-book-wrapper">
              <h1>책 구하기</h1>
              <div className="buy-book">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`http://www.yes24.com/Mall/Buyback/Search?SearchDomain=BOOK,FOREIGN&searchWord=${book.isbn}`}
                >
                  Yes24
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=${book.isbn}&orderClick=LAG&Kc=`}
                >
                  교보문고
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.nl.go.kr/kolisnet/search/searchResultList.do?tab=BKGM&historyYn=Y&keywordType1=total&keyword1=${book.isbn}&bookFilter=BKGM`}
                >
                  국립 도서관
                </a>
              </div>
            </div>
            <div className="book-comments">
              <h1>댓글</h1>
              <TextareaAutosize />
              <div className="book-comment-button-wrapper">
                <Button onClick={() => console.log("h")} width="fit-content">
                  추가하기
                </Button>
              </div>
            </div>
          </div>
          <div className="author-info-wrapper">
            <div className="author-share-wrapper">
              <h1 className="author-title">작가</h1>
              <CopyToClipboard text={router?.asPath} onCopy={() => alert(`${router?.asPath} 를 복사했습니다.`)}>
                <div className="share">
                  <ShareArrow />
                  <span>공유하기</span>
                </div>
              </CopyToClipboard>
            </div>
            {book.authors.map((author, index) => (
              <div className="author-infos" key={index}>
                <div className="author-photo-name-wrapper">
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

export default BookDetail;
