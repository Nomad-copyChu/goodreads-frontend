import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import OutsideClickHandler from "react-outside-click-handler";
import isEmpty from "lodash/isEmpty";
import SadIcon from "../public/static/svg/sad.svg";
import Input from "./Input";
import SEARCH from "../query/search";
import { Book, User, Author } from "../types";
import colors from "../style/colors";

const Container = styled.div`
  width: 100%;
  position: relative;
  .serach-result-popup {
    height: 150px;
    border: 1px solid ${colors.woody_500};
    border-radius: 5px;
    position: absolute;
    background-color: white;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    .search-loading {
      width: 100%;
      height: 100%;
    }
  }
  .no-search-input {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .no-search-result {
    text-align: center;
  }
  .book-result {
    width: 100%;
    display: flex;
    border-bottom: 1px solid ${colors.gray_500};
    transition: 0.2s ease-in-out;
    padding: 8px;

    img {
      width: 34px;
      height: 50px;
    }
    &:hover {
      background-color: ${colors.beige_400};
    }
    .book-result-infos {
      margin-left: 16px;
    }
  }
  .result-user {
    width: 100%;
    display: flex;
    border-bottom: 1px solid ${colors.gray_500};
    padding: 8px;

    &:hover {
      background-color: ${colors.beige_400};
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .result-author {
    width: 100%;
    display: flex;
    border-bottom: 1px solid ${colors.gray_500};
    padding: 8px;
    &:hover {
      background-color: ${colors.beige_400};
    }
    img {
      width: 50px;
      height: 50px;
    }
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
  console.log(data);
  const [popupStatus, setPoupStatus] = useState(false);
  const results = data?.search.map(item => {
    if ((item as Book).title) {
      //책이라면
      return (
        <div className="book-result">
          <img src={(item as Book).thumbnail} alt="" />
          <div className="book-result-infos">
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
      return (
        <li className="result-user">
          <img src={(item as User).profilePhoto} alt="" />
          <p>{(item as User).username}</p>
        </li>
      );
    }
    if ((item as Author).name) {
      //작가라면
      return (
        <li className="result-author">
          <img src={(item as Author).photo} alt={(item as Author).name} />
          <div className="author-result-infos">
            <h2>{(item as Author).name}</h2>
            <p>{(item as Author).gernes?.map(gerne => `#${gerne.term} `)}</p>
          </div>
        </li>
      );
    }
    return null;
  });
  return (
    <Container>
      <OutsideClickHandler onOutsideClick={() => setPoupStatus(false)}>
        <Input value={value} onChange={onChange} onFocus={() => setPoupStatus(true)} />
        {popupStatus && (
          <div className="serach-result-popup">
            {loading && <img src="/static/gif/bookgif.gif" alt="" className="search-loading" />}
            {value === "" && (
              <div className="no-search-input">
                <p>검색어를 입력해주세요</p>
              </div>
            )}
            {!loading && !!data && isEmpty(data?.search) && (
              <div className="no-search-result">
                <SadIcon />
                <p>{`${value}검색결과가 없습니다. ㅠㅠ`}</p>
              </div>
            )}
            {results}
          </div>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default SearchInput;