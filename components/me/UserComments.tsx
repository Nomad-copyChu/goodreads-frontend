import React from "react";
import Link from "next/link";
import isEmpty from "lodash/isEmpty";
import { User } from "../../types";

interface IProps {
  bookComments: User["bookComments"];
}

const UserComments: React.FC<IProps> = ({ bookComments }) => {
  return (
    <div className="userinfo-comment-wrapper">
      <h3>내가 쓴 댓글들</h3>
      <div className="userinfo-comment-contents">
        {bookComments.map((comment, i) => (
          <div key={i}>
            <div className="userinfo-border" />
            <div className="userinfo-comment-bookthumbnail-wapper">
              <Link href="/book/[id]" as={`/book/${comment.book.id} `} key={comment.book.id}>
                <a className="userinfo-comment-bookthumbnail-link">
                  <img className="userinfo-comment-bookthumbnail" src={comment.book.thumbnail} alt="" />
                </a>
              </Link>
              <div className="userinfo-comment-info">
                <div className="userinfo-comment-userinfo">
                  <img className="userinfo-comment-photo" src={comment.user.profilePhoto} alt="" />
                  <span>{comment.user.username}</span>
                </div>
                <p className="userinfo-comment-text">{comment.text}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="userinfo-border" />
        {isEmpty(bookComments.map(comment => comment.text)) && <p>아직 쓴 댓글이 없습니다.</p>}
      </div>
    </div>
  );
};

export default UserComments;
