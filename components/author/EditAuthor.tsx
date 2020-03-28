import React, { useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../common/Button";
import { Author } from "../../types";
import colors from "../../style/colors";
import QuoteCard from "../quote/QuoteCard";
import Input from "../common/Input";
import useUpload from "../../hooks/useUpload";
import useAuthor from "../../hooks/useAuthor";

const Container = styled.div`
  width: 1083px;
  display: flex;
  margin: auto;
  margin-top: 60px;
  justify-content: space-between;
  .edit-author-submit-button {
    position: absolute;
    right: 0;
    top: 8px;
    width: 72px;
  }
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
      .author-photo-wrapper {
        position: relative;
        img {
          width: 300px;
          height: 100%;
          border: 1px solid ${colors.gray_500};
          border-radius: 5px;
        }
        input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
      }

      .author-detail {
        width: 100%;
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
      border-radius: 5px;
      border: 1px solid ${colors.gray_500};
      background-color: transparent;
      padding: 12px;
      outline: none;
      resize: none;
      font-size: 14px;
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
      display: flex;
      .author-book {
        width: 120px;
        margin-right: 30px;
        margin-bottom: 20px;
        img {
          width: 100%;
        }
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

const EditAuthor: React.FC<IProps> = ({ author }) => {
  const [commentText, setCommentText] = useState("");
  const [authorPhoto, setAuthorPhoto] = useState(author?.photo);
  const [authorDescription, setAuthorDescription] = useState(author.description || "");
  const [gerneInput, setGerneInput] = useState("");
  const [authorGernes, setAuthorGernes] = useState<string[]>(author.gernes?.map(gerne => gerne.term) || []);
  const [authorBorn, setAuthorBorn] = useState(author.born || "");
  const [authorDied, setAuthorDied] = useState(author.died || "");

  const { editAuthorMutation } = useAuthor();
  const { fileUploadMuation } = useUpload();
  const addGerne = e => {
    e.preventDefault();
    setAuthorGernes(gerne => [...gerne, gerneInput]);
    setGerneInput("");
  };

  return (
    <Container>
      <div className="author-infos-comments">
        <div className="author-infos">
          <div className="author-photo-detail">
            <div className="author-photo-wrapper">
              <img src={authorPhoto} alt="" />
              <input
                type="file"
                onChange={async e => {
                  const file = e.target.files[0];
                  const { data } = await fileUploadMuation({ variables: { file } });
                  setAuthorPhoto(data?.singleUpload);
                }}
              />
            </div>
            <div className="author-detail">
              <Button
                color="green"
                onClick={() => {
                  editAuthorMutation({
                    variables: {
                      authorId: author.id,
                      editAuthorArgs: {
                        born: authorBorn,
                        died: authorDied,
                        gernes: authorGernes,
                        description: authorDescription,
                        photo: authorPhoto
                      }
                    }
                  })
                    .then(() => {
                      alert("정보를 수정하였습니다.");
                      window.location.href = `/author/${author.id}`;
                    })
                    .catch(e => {
                      alert(e.message);
                    });
                }}
                className="edit-author-submit-button"
              >
                수정하기
              </Button>
              <h1>{author.name}</h1>
              <p>
                장르 :
                {authorGernes.map((gerne, index) => (
                  <span key={index}>{`#${gerne} `}</span>
                ))}
              </p>
              <form onSubmit={addGerne}>
                <Input
                  color="transparent"
                  value={gerneInput}
                  type="text"
                  onChange={e => setGerneInput(e.target.value)}
                  placeholder="장르를 엔터로 추가해 주세요"
                />
              </form>
              <p>출생 :</p>
              <Input
                placeholder="ex) 1990년 6월"
                color="transparent"
                value={authorBorn}
                onChange={e => setAuthorBorn(e.target.value)}
              />
              ~
              <Input
                color="transparent"
                value={authorDied}
                onChange={e => setAuthorDied(e.target.value)}
                placeholder="ex) 1994년 6월"
              />
            </div>
          </div>
          <TextareaAutosize
            className="author-description"
            value={authorDescription}
            onChange={e => setAuthorDescription(e.target.value)}
            placeholder="작가 소개"
          />
          <div className="author-comments">
            <h3>댓글</h3>
            <TextareaAutosize value={commentText} onChange={e => setCommentText(e.target.value)} />
            <div className="author-comment-button-wrapper">
              <Button
                onClick={() => {
                  alert("수정하기 에서는 댓글을 추가 할수 없습니다.");
                }}
              >
                추가하기
              </Button>
            </div>
            {author.comments.map(comment => (
              <div className="author-comment" key={comment.id}>
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
            <div className="author-book" key={book.id}>
              <img src={book.thumbnail} alt="" />
              {book.title}
            </div>
          ))}
        </div>
        <div className="author-no-book" />
        <h3>작가의 명언</h3>
        {author.quotes.map(quote => (
          <QuoteCard quote={quote} key={quote.id} />
        ))}
      </div>
    </Container>
  );
};

export default EditAuthor;
