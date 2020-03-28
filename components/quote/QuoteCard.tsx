import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { LIKE_QUOTE } from "../../query/quote";
import { Quote } from "../../types";
import colors from "../../style/colors";

const Container = styled.div`
  width: 468px;
  padding: 8px;
  display: flex;
  align-items: center;
  border: 1px solid ${colors.gray_500};
  border-radius: 5px;
  img {
    width: 64px;
    height: 64px;
  }
  @media (max-width: 520px) {
    width: 100%;
  }
  .quote-infos {
    width: 100%;
    margin-left: 12px;
    .quote-text {
      font-size: 12px;
      width: 100%;
    }
    .quote-author {
      font-size: 12px;
    }
    .quote-info-footer {
      display: flex;
      justify-content: space-between;
    }
    .quote-tags {
      font-size: 12px;
      color: ${colors.gray_600};
    }
    .quote-like-count {
      color: ${colors.gray_600};
    }
  }
  .quote-likes {
    font-size: 12px;
    color: ${colors.green_500};
    cursor: pointer;
    flex-shrink: 0;
    display: flex;
    align-items: flex-end;
    &:hover {
      text-decoration: underline;
    }
  }
`;

interface IProps {
  quote: Quote;
}

const QuoteCard: React.FC<IProps> = ({ quote }) => {
  const [likeQuoteMutation] = useMutation(LIKE_QUOTE, { variables: { quoteId: quote.id } });
  const [likesCount, setLikesCount] = useState(quote.likesCount || 0);
  return (
    <Container>
      <Link href="/author/[id]" as={`/author/${quote?.author?.id}`}>
        <a>
          <img src={quote?.author?.photo} alt="" />
        </a>
      </Link>
      <div className="quote-infos">
        <p className="quote-text">{quote.term}</p>

        <Link href="/author/[id]" as={`/author/${quote?.author?.id}`}>
          <a className="quote-author">― {quote?.author?.name}</a>
        </Link>
        <div className="quote-info-footer">
          <p className="quote-tags">tags : {quote?.tags.map(tag => `#${tag.term} `)}</p>
          <p
            className="quote-likes"
            onClick={async () => {
              try {
                await likeQuoteMutation().then(() => {
                  setLikesCount(likesCount + 1);
                  alert("명언을 좋아요 하였습니다.");
                });
              } catch (e) {
                alert(e.message);
              }
            }}
          >
            {likesCount} likes+
          </p>
        </div>
      </div>
    </Container>
  );
};

export default QuoteCard;
