import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import SadIcon from "../public/static/svg/sad.svg";
import Input from "./Input";
import SEARCH from "../query/search";
import { Book, User, Author } from "../types";
import isEmpty from "lodash/isEmpty";

const Container = styled.div`
  width: 100%;
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
      <Input value={value} onChange={onChange} />
      <div>{loading && <img src="/static/gif/bookgif.gif" alt="" />}</div>
      <div>
        {!loading && !!data && isEmpty(data?.search) && (
          <div className="no-search-result">
            <SadIcon />
            <p>{`${value}검색결과가 없습니다. ㅠㅠ`}</p>
          </div>
        )}
        {results}
      </div>
    </Container>
  );
};

export default SearchInput;
