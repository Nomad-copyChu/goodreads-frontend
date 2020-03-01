import React, { useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import Link from "next/link";
import format from "date-fns/format";
import isEmpty from "lodash/isEmpty";
import Button from "../common/Button";
import { Author } from "../../types";
import colors from "../../style/colors";
import useAuthor from "../../hooks/useAuthor";

const Container = styled.div`
  width: 1083px;
  display: flex;
  margin: auto;
  margin-top: 60px;
  justify-content: space-between;

  .author-infos-comments {
    width: 575px;
    .author-infos {
      width: 100%;
    }
    .author-photo-detail {
      width: 100%;
      height: 215px;
      position: relative;
      display: flex;
      img {
        width: 300px;
        height: 100%;
        border: 1px solid ${colors.gray_500};
        border-radius: 5px;
      }
      .author-detail {
        margin-left: 20px;
        h1 {
          font-size: 16px;
          font-weight: bold;
          margin-top: 8px;
        }
        p {
          margin-top: 8px;
          font-size: 14px;
          color: ${colors.gray_800};
          &:first-child {
            margin-top: 12px;
          }
        }
        a {
          position: absolute;
          right: 0;
          bottom: 0;
          font-size: 14px;
        }
      }
    }
    .author-description {
      margin-top: 20px;
      min-height: 200px;
      width: 100%;
    }
    .author-comments {
      margin-top: 16px;
      textarea {
        margin-top: 12px;
        width: 100%;
        min-height: 80px;
        max-height: 200px;
        border-radius: 5px;
        border: 1px solid ${colors.gray_500};
        background-color: transparent;
        padding: 12px;
        outline: none;
        resize: none;
        font-size: 14px;
      }
      .author-comment-button-wrapper {
        display: flex;
        margin-top: 12px;
        margin-bottom: 12px;
        button {
          width: fit-content;
          margin: 0 0 0 auto;
        }
      }
      .author-comment {
        padding: 16px 0;
        width: 100%;
        border-top: 1px solid ${colors.gray_500};
        .author-comment-user {
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
  }
  .author-books-quotes {
    width: 468px;
    h2 {
      font-size: 21px;
    }
    .author-books {
      margin: 20px 0;
      flex-wrap: wrap;
      .author-book {
        width: 120px;
        height: 188px;
        margin-right: 30px;
        margin-bottom: 20px;
        & :nth-child(3n) {
          margin-right: 0;
        }
      }
    }
    h3 {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
`;

interface IProps {
  author: Author;
}

const AuthorDetail: React.FC<IProps> = ({ author }) => {
  const [commentList, setCommentList] = useState(author.comments);
  const [commentText, setCommentText] = useState("");
  const { addCommentMutation } = useAuthor();
  console.log(author);
  return (
    <Container>
      <div className="author-infos-comments">
        <div className="author-infos">
          <div className="author-photo-detail">
            <img src={author.photo} alt="" />
            <div className="author-detail">
              <h1>{author.name}</h1>
              {!isEmpty(author.gernes) && (
                <p>
                  장르 :
                  {author.gernes.map(gerne => (
                    <span key={gerne.id}>gerne.term</span>
                  ))}
                </p>
              )}
              {author.born && (
                <p>
                  출생 :
                  <span>
                    {`${format(new Date(author.born), "yyyy.MM.dd")}~${format(new Date(author.died), "yyyy.MM.dd")}`}
                  </span>
                </p>
              )}
              <Link href="/add/book/[id]" as={`/add/author?${author.id}`}>
                <a>...수정하기</a>
              </Link>
            </div>
          </div>
          <div className="author-description">{author.description || "작가의 소개가 없습니다. :("}</div>
          <div className="author-comments">
            <h3>댓글</h3>
            <TextareaAutosize value={commentText} onChange={e => setCommentText(e.target.value)} />
            <div className="author-comment-button-wrapper">
              <Button
                onClick={() => {
                  try {
                    if (commentText === "") {
                      throw Error("댓글을 입력해 주세요.");
                    }
                    addCommentMutation({ variables: { authorId: author.id, text: commentText } }).then(res => {
                      setCommentList([{ ...res.data.commentAuthor }, ...commentList]);
                      setCommentText("");
                    });
                  } catch (e) {
                    alert(e.message);
                  }
                }}
              >
                추가하기
              </Button>
            </div>
            {commentList.map(comment => (
              <div className="author-comment">
                <div className="author-comment-user">
                  <img src={comment?.user?.profilePhoto} alt={comment?.user?.username} />
                  <h3>{comment.user?.username}</h3>
                </div>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="author-books-quotes">
        <h2>작가의 책들</h2>
        <div className="author-books">
          {author.books.map(book => (
            <div className="author-book">{book.title}</div>
          ))}
        </div>
        <div className="author-no-book" />
        <h3>작가의 명언</h3>
        author.quotes
      </div>
    </Container>
  );
};

export default AuthorDetail;
