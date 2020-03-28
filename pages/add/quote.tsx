import React from "react";
import TextArea from "react-textarea-autosize";
import { NextPage } from "next";
import styled from "styled-components";
import SearchInput from "../../components/common/SearchInput";
import { Quote, ApolloNextPageContext } from "../../types";
import QuoteCard from "../../components/quote/QuoteCard";
import { GET_QUOTES } from "../../query/quote";
import colors from "../../style/colors";
import Logo from "../../public/static/svg/goodreadsKr.svg";
import useAddQuote from "../../hooks/useAddQuote";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  .add-quote-search {
    width: 385px;
    margin: 20px auto 0px;
  }
  .add-quote-contents {
    margin: auto;
    margin-top: 80px;
    width: 875px;
    display: flex;
    .add-quote-anotherQuote {
      display: flex;
      flex-direction: column;
      h3 {
        font-size: 21px;
        margin-bottom: 30px;
        font-weight: 550;
      }
      .add-quote-card-wrapper {
        height: 382px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        ::-webkit-scrollbar {
          display: none;
        }
        .add-quote-card {
          margin-bottom: 8px;
        }
      }
    }
    .add-quote-AddBox {
      position: relative;
      margin-left: 112px;
      background-color: white;
      border: 1px solid ${colors.gray_500};
      border-radius: 5px;
      width: 350px;
      padding: 20px 39px;
      display: flex;
      flex-direction: column;
      .add-quote-addBox-logo {
        align-self: center;
        width: 219px;
        height: 48px;
        margin-bottom: 26px;
      }
      h3 {
        font-weight: normal;
        font-size: 21px;
        margin-bottom: 10px;
      }
      .term-textarea {
        border: 1px solid #b9ad99;
        box-sizing: border-box;
        border-radius: 5px;
        width: 258px;
        min-height: 108px;
        margin-bottom: 19px;
        outline: none;
        resize: none;
        padding: 6px;
      }
      h5 {
        font-size: 12px;
      }
      .authorName-input {
        margin-bottom: 15px;
      }
      .quote-tag-form {
        margin-bottom: 16px;
      }
      .quote-submit-wrapper {
        width: 74px;
        margin: 0 0 0 auto;
      }
    }
  }
`;

interface IProps {
  quotes: Quote[];
}

const quote: NextPage<IProps> = ({ quotes }) => {
  const state = useAddQuote();
  return (
    <Container>
      <div className="add-quote-search">
        <SearchInput placeholder="궁금한 것을 검색해 보세요." />
      </div>
      <div className="add-quote-contents">
        <div className="add-quote-anotherQuote">
          <h3>다른 명언들</h3>
          <div className="add-quote-card-wrapper">
            {quotes.map((quote, i) => (
              <div key={i} className="add-quote-card">
                <QuoteCard quote={quote} key={quote.id} />
              </div>
            ))}
            {state.addedQuote.map(quote => (
              <div key={quote.id} className="add-quote-card">
                <QuoteCard quote={quote} />
              </div>
            ))}
          </div>
        </div>
        <div className="add-quote-AddBox">
          <Logo className="add-quote-addBox-logo" />
          <h3>명언 추가하기</h3>
          <TextArea
            color="transparent"
            className="term-textarea"
            value={state.term}
            type="text"
            onChange={e => state.setTerm(e.target.value)}
            placeholder="&#34;명언...&#34;"
          />
          <h5>작가</h5>
          <Input
            color="transparent"
            className="authorName-input"
            value={state.authorName}
            type="text"
            onChange={e => state.setAuthorName(e.target.value)}
            placeholder="작가 이름"
            width="100%"
          />
          <h5>태그</h5>
          <form onSubmit={state.addTags} className="quote-tag-form">
            {state.tags.map((tag, i) => (
              <span key={i}>{`#${tag}`}</span>
            ))}
            <Input
              color="transparent"
              value={state.tagInput}
              type="text"
              onChange={e => state.setTagInput(e.target.value)}
              placeholder="엔터로 추가해 주세요"
            />
          </form>
          <div className="quote-submit-wrapper">
            <Button
              color="green"
              onClick={async () => {
                try {
                  await state.addQuoteMutation();
                } catch (e) {
                  alert(e.message);
                }
              }}
            >
              추가하기
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

quote.getInitialProps = async (ctx: ApolloNextPageContext) => {
  const { apolloClient } = ctx;
  //Posts 불러오기
  const [quoteData] = await Promise.all([
    await apolloClient.query({
      query: GET_QUOTES,
      variables: { limit: 10 },
      fetchPolicy: "network-only"
    })
  ]);
  return { quotes: quoteData?.data?.getQuotes };
};

export default quote;
