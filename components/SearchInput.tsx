import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import isEmpty from "lodash/isEmpty";
import SadIcon from "../public/static/svg/sad.svg";
import Input from "./Input";
import SEARCH from "../query/search";
import { Book, User, Author } from "../types";

const Container = styled.div`
  width: 100%;
  position: relative;
  .serach-result-popup {
    height: 150px;
    border: 1px solid black;
    border-radius: 5px;
    position: absolute;
    background-color: white;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .no-search-result {
    text-align: center;
  }
`;

interface IProps {
  value: string;
  onChange: (e) => void;
}
export type SearchResult = Book | User | Author;
const SearchInput: React.FC<IProps> = ({ value, onChange }) => {
  const { data, loading, error } = useQuery<{ search: [SearchResult] }>(SEARCH, {
    skip: value === "",
    variables: { keyword: value },
    fetchPolicy: "network-only"
  });
  const [popupStatus, setPoupStatus] = useState(false);
  console.log(data, loading, error);
  const results = data?.search.map(item => {
    if ((item as Book).title) {
      //책이라면
      return (
        <div className="book-result">
          <img src={(item as Book).thumbnail} alt="" />
          <div>
            <h2>{(item as Book).title}</h2>
            <p>
              {(item as Book).authors?.map((author: Author) => (
                <span>{author.name}</span>
              ))}
            </p>
            <p>{(item as Book).gernes?.map(gerne => gerne.term)}</p>
          </div>
        </div>
      );
    }
    if ((item as User).username) {
      //유저라면
      return <div>{(item as User).username}</div>;
    }
    if ((item as Author).name) {
      //작가라면
      return <div>{(item as Author).name}</div>;
    }
    return null;
  });
  return (
    <Container>
      <Input value={value} onChange={onChange} onFocus={() => setPoupStatus(true)} />
      <div>{loading && <img src="/static/gif/bookgif.gif" alt="" />}</div>
      {popupStatus && (
        <div className="serach-result-popup">
          {!loading && !!data && isEmpty(data?.search) && (
            <>
              <div className="no-search-data">
                <p>검색어를 입력해주세요</p>
              </div>
              <div className="no-search-result">
                <SadIcon />
                <p>{`${value}검색결과가 없습니다. ㅠㅠ`}</p>
              </div>
            </>
          )}
          {results}
        </div>
      )}
    </Container>
  );
};

export default SearchInput;
