import React from "react";
import isEmpty from "lodash/isEmpty";
import { User } from "../../types";
import QuoteCard from "../quote/QuoteCard";

interface IProps {
  likeQuotes: User["likeQuotes"];
}

const UserQuotes: React.FC<IProps> = ({ likeQuotes }) => {
  return (
    <div className="userinfo-quote-wapper">
      <h3>내가 좋아하는 명언들</h3>
      <div className="userinfo-quote">
        <div className="userinfo-quote-QuoteCard-Wrapper">
          {likeQuotes.map((quote, index) => (
            <QuoteCard key={index} quote={quote} />
          ))}
        </div>
      </div>
      {isEmpty() && <p>아직 좋아하는 명언이 없습니다.</p>}
    </div>
  );
};

export default UserQuotes;
