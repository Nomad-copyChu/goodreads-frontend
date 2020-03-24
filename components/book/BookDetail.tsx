import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import isEmpty from "lodash/isEmpty";
import Link from "next/link";
import TextareaAutosize from "react-textarea-autosize";
import MagicBook from "../../public/static/svg/maginBook.svg";
import ShareArrow from "../../public/static/svg/share-arrow.svg";
import AddToShelfButton from "./AddToShelfButton";
import colors from "../../style/colors";
import { Book } from "../../types";
import useUser from "../../hooks/useUser";
import useBook from "../../hooks/useBook";
import Button from "../common/Button";
import responsive from "../../style/responsive";

const ReactStars = dynamic(import("react-stars"), { ssr: false });

const Container = styled.div`
  margin-top: 20px;
  position: relative;
  width: fit-content;
  margin: 20px auto;
  @media (max-width: ${responsive.small}) {
    width: 100%;
    margin: 0 auto;
  }
  .book-wrapper {
    width: fit-content;
    display: flex;
    margin: 60px auto;
    @media (max-width: 670px) {
      flex-direction: column;
      margin: 0 auto;
      width: 100%;
    }
    @media (max-width: ${responsive.small}) {
      padding: 20px;
    }
  }

  .book-thumbnail-rating {
    width: 200px;
    position: relative;
    @media (max-width: 670px) {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    @media (max-width: ${responsive.small}) {
      display: block;
    }
    .thumbnail-input {
      input {
        position: absolute;
        width: 100%;
        height: 312px;
        opacity: 0;
        cursor: pointer;
        z-index: 1;
      }
      @media (max-width: 670px) {
        width: 200px;
      }
    }
    .book-sub-infos {
      width: 200px;
      @media (max-width: 670px) {
        margin-top: 30px;
      }
      @media (max-width: ${responsive.small}) {
        margin: 0;
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
    @media (max-width: ${responsive.small}) {
      width: 100%;
      margin: 16px 0 0;
    }
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
    .book-gerne {
      font-size: 14px;
      color: ${colors.gray_800};
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
      button {
        margin: 0 0 0 auto;
      }
    }
    .book-comment {
      padding: 16px 0;
      width: 100%;
      border-top: 1px solid ${colors.gray_500};
      .book-comment-user {
        display: flex;
      }
      img {
        width: 24px;
        height: 24px;
      }
      h3 {
        font-size: 14px;
        margin-left: 12px;
      }
      p {
        font-size: 12px;
        margin-top: 8px;
        color: ${colors.gray_800};
      }
    }
  }
  .author-info-wrapper {
    width: 280px;
    margin-left: 40px;
    @media (max-width: ${responsive.medium}) {
      display: none;
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
          font-size: 16px;
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
  .mobile-author-info {
    margin-bottom: 12px;
    @media (min-width: ${responsive.medium}) {
      display: none;
    }
  }
  .share {
    margin-left: 20px;
    flex-shrink: 0;
    span {
      color: ${colors.blue_green};
      margin-left: 4px;
      white-space: pre;
    }
    cursor: pointer;
  }
`;

interface IProps {
  book: Book;
  rating?: { id: string; count: number };
}

const BookDetail: React.FC<IProps> = ({ book, rating }) => {
  const { user, isLogged, addToShelfMutation, rateBookMutation } = useUser();
  const { getShelvesName, addCommentMutation } = useBook();
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
  /**
   * * 로컬 원해요,읽는중,읽음 카운트
   */
  const [wantCount, setWantCount] = useState(book.wantCount);
  const [readingCount, setReadingCount] = useState(book.readingCount);
  const [readCount, setReadCount] = useState(book.readCount);

  /**
   * * 로컬 유저의 별점
   */
  const [starCount, setStarCount] = useState(rating ? rating.count : 0);

  /**
   * * 로컬 평균별점 & 평가한 유저 수
   */
  const [avgStarCount, setAvgStarCount] = useState(book.avgRating);
  const [staredCount, setStaredCount] = useState(book.ratedUserNum);

  /**
   * * 로컬 댓글 텍스트
   */
  const [commentList, setCommentList] = useState(book.comments);
  /**
   * * 로컬 유저의 추가할 댓글 텍스트
   */
  const [commentText, setCommentText] = useState("");
  const router = useRouter();
  return (
    <Container>
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
          <div className="book-sub-infos">
            <AddToShelfButton
              size="large"
              value={shelf}
              options={shelvesNames}
              onChange={value => setShelf(value)}
              onClick={async () => {
                if (isLogged) {
                  try {
                    await addToShelfMutation({
                      variables: { shelfName: shelf.value, bookId: book.id }
                    }).then(() => {
                      alert(`${shelf.label}선반에 추가하였습니다.`);
                      if (shelf.value === "want") {
                        setWantCount(count => count + 1);
                      } else if (shelf.value === "reading") {
                        setReadingCount(count => count + 1);
                      } else if (shelf.value === "read") {
                        setReadCount(count => count + 1);
                      }
                    });
                  } catch (e) {
                    alert(e.message);
                  }
                } else {
                  alert("로그인이 필요한 기능 입니다.");
                }
              }}
            />
            <div className="ratings">
              <p>{`원해요 : ${wantCount}명`}</p>
              <p>{`읽는중 : ${readingCount}명`}</p>
              <p>{`읽음 : ${readCount}명`}</p>
              <div className="stars-wrapper">
                <ReactStars
                  count={5}
                  value={starCount}
                  onChange={count => {
                    setStarCount(count);
                    rateBookMutation({ variables: { bookId: book.id, count } })
                      .then(() => {
                        if (rating) {
                          //평가한적이 있따면
                          const newTotalCount = book.totalRating - rating.count + count;
                          setAvgStarCount(newTotalCount / book.ratedUserNum);
                        } else {
                          //평가한적이 없다면
                          const newTotalCount = (book.totalRating || 0) + count;
                          setAvgStarCount(newTotalCount / (book.ratedUserNum + 1));
                          setStaredCount(count => count + 1);
                        }
                      })
                      .catch(e => {
                        alert(e.message);
                        setStarCount(0);
                      });
                  }}
                  size={20}
                  color1={colors.gray_500}
                  color2={colors.yellow_700}
                />
                <p>{`${avgStarCount} (${staredCount}명)`}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="book-infos">
          <div className="title-share">
            <p className="title">{book.title}</p>
            <CopyToClipboard text={router?.asPath} onCopy={() => alert(`${router?.asPath} 를 복사했습니다.`)}>
              <div className="share">
                <ShareArrow />
                <span>공유하기</span>
              </div>
            </CopyToClipboard>
          </div>
          <div className="mobile-author-info">
            {book.authors.map((author, index) => (
              <div className="author-infos" key={index}>
                by &nbsp;
                <Link href="/author/[id]" as={`/author/${author.name}`}>
                  <a className="author-name">{author.name}</a>
                </Link>
              </div>
            ))}
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
                  <span key={index} className="book-gerne">{`#${gerne.term}`}</span>
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
            <TextareaAutosize value={commentText} onChange={e => setCommentText(e.target.value)} />
            <div className="book-comment-button-wrapper">
              <Button
                onClick={() => {
                  try {
                    if (commentText === "") {
                      throw Error("댓글을 입력해 주세요.");
                    }
                    addCommentMutation({ variables: { bookId: book.id, text: commentText } })
                      .then(res => {
                        setCommentList([{ ...res.data.commentBook }, ...commentList]);
                        setCommentText("");
                      })
                      .catch(e => {
                        alert(e.message);
                      });
                  } catch (e) {
                    alert(e.message);
                  }
                }}
                width="fit-content"
              >
                추가하기
              </Button>
            </div>
            {commentList.map(comment => (
              <div className="book-comment" key={comment.id}>
                <div className="book-comment-user">
                  <img src={comment.user.profilePhoto} alt="" />
                  <h3>{comment.user.username}</h3>
                </div>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="author-info-wrapper">
          <div className="author-share-wrapper">
            <h1 className="author-title">작가</h1>
          </div>
          {book.authors.map((author, index) => (
            <div className="author-infos" key={index}>
              <div className="author-photo-name-wrapper">
                <img src={author.photo || "  "} alt="" className="author-profile-photo" />
                <Link href="/author/[id]" as={`/author/${author.id}`}>
                  <a className="author-name">{author.name}</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BookDetail;
