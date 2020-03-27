import React from "react";
import styled from "styled-components";
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
              <img className="userinfo-comment-bookthumbnail" src={comment.book.thumbnail} alt="" />
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
      </div>
    </div>
  );
};

export default UserComments;
