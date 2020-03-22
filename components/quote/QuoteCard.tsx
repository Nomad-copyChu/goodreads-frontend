import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Quote } from "../../types";
import colors from "../../style/colors";

const Container = styled.div`
  width: 468px;
  padding: 8px;
  display: flex;
  align-items: center;
  img {
    width: 64px;
    height: 64px;
  }
  quote-infos {
    width: 100%;
    .quote-text {
      font-size: 12px;
      width: 100%;
      margin-bottom: 4px;
    }
    .quote-info-footer {
      display: flex;
      justify-content: space-between;
    }
    .quote-tags {
      color: ${colors.gray_600};
    }
    .quote-like-count {
      color: ${colors.gray_600};
    }
  }
`;

interface IProps {
  quote: Quote;
}

const QuoteCard: React.FC<IProps> = ({ quote }) => {
  return (
    <Container>
      <img src={quote?.author?.photo} alt="" />
      <div className="quote-infos">
        <p className="quote-text">{quote.term}</p>
        <Link href="/author/[id]" as={`/author/${quote.author.id}`}>
          <a>{quote?.author?.name}</a>
        </Link>
        <div className="quote-info-footer">
          <p className="quote-tags">tags : {quote?.tags.map(tag => tag.term)}</p>
          <p className="quote-like-count">{quote?.likesCount}</p>
        </div>
      </div>
    </Container>
  );
};

export default QuoteCard;
