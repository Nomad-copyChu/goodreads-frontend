import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import OutsideClickHandler from "react-outside-click-handler";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/dist/client/router";
import SadIcon from "../../public/static/svg/sad.svg";
import SearchIcon from "../../public/static/svg/search.svg";
import Input from "./Input";
import SEARCH from "../../query/search";
import { Book, User, Author } from "../../types";
import colors from "../../style/colors";
import useDebounce from "../../hooks/useDebounce";

const Container = styled.div`
  width: 100%;
  position: relative;
  .search-icon {
    position: absolute;
    right: 12px;
    top: 8px;
  }
  .serach-result-popup {
    height: 250px;
    z-index: 1;
    border: 1px solid ${colors.woody_500};
    border-radius: 5px;
    position: absolute;
    background-color: white;
    width: 100%;
    overflow: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    .search-loading {
      border-radius: 5px;
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
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .book-result {
    width: 100%;
    display: flex;
    border-bottom: 1px solid ${colors.gray_500};
    transition: 0.2s ease-in-out;
    padding: 8px;
    background-color: white;
    cursor: pointer;
    min-height: fit-content;
    img {
      width: 34px;
      height: 50px;
    }
    &:hover {
      background-color: ${colors.beige_400};
    }
    .book-result-infos {
      margin-left: 28px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h2 {
      }
      p {
        span {
          margin-right: 8px;
          :last-child {
            margin: 0;
          }
        }
      }
      .gerne {
        color: ${colors.gray_800};
      }
    }
  }
  .result-user {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${colors.gray_500};
    padding: 8px;
    background-color: white;
    cursor: pointer;
    &:hover {
      background-color: ${colors.beige_400};
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    p {
      margin-left: 12px;
    }
  }
  .author-result-infos {
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      margin-bottom: 8px;
    }
    p {
      color: ${colors.gray_800};
    }
  }
  .result-author {
    width: 100%;
    display: flex;
    border-bottom: 1px solid ${colors.gray_500};
    padding: 8px;
    background-color: white;
    cursor: pointer;

    &:hover {
      background-color: ${colors.beige_400};
    }
    img {
      width: 50px;
      height: 50px;
    }
  }
`;

export type SearchResult = Book | User | Author;
interface IProps {
  placeholder?: string;
  onClick?: (selected: SearchResult) => void;
}
const SearchInput: React.FC<IProps> = ({ placeholder }) => {
  const [value, setValue] = useState("");
  const serachValue = useDebounce(value, 500);

  const { data, loading } = useQuery<{ search: [SearchResult] }>(SEARCH, {
    skip: serachValue === "" || value === "",
    variables: { keyword: serachValue }
  });
  const searchLoading = useMemo(() => value !== serachValue || loading, [value, serachValue, loading]);
  const [popupStatus, setPopupStatus] = useState(false);
  const router = useRouter();
  const results = data?.search.map((item, index) => {
    if ((item as Book).title) {
      //책이라면
      return (
        <li
          key={index}
          className="book-result"
          role="presentation"
          onClick={async () => {
            router.push(`/book/${(item as Book).id}`);
            setPopupStatus(false);
          }}
        >
          <img src={(item as Book).thumbnail} alt="" />
          <div className="book-result-infos">
            <h2>{(item as Book).title}</h2>
            <p>
              {(item as Book).authors?.map((author: Author, index) => (
                <span key={index}>{author.name}</span>
              ))}
            </p>
            <p className="gerne">{(item as Book).gernes?.map(gerne => `#${gerne.term} `)}</p>
          </div>
        </li>
      );
    }
    if ((item as User).username) {
      //유저라면
      return (
        <li
          key={index}
          className="result-user"
          role="presentation"
          onClick={() => {
            router.push(`/me/${(item as User).id}`);
            setPopupStatus(false);
          }}
        >
          <img src={(item as User).profilePhoto} alt="" />
          <p>{(item as User).username}</p>
        </li>
      );
    }
    if ((item as Author).name) {
      //작가라면
      return (
        <li
          key={index}
          className="result-author"
          role="presentation"
          onClick={() => {
            router.push(`/author/${(item as Author).id}`);
            setPopupStatus(false);
          }}
        >
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
      <OutsideClickHandler onOutsideClick={() => setPopupStatus(false)}>
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setPopupStatus(true)}
          placeholder={placeholder}
        />
        <SearchIcon className="search-icon" />
        {popupStatus && (
          <div className="serach-result-popup">
            {searchLoading && <img src="/static/gif/bookgif.gif" alt="" className="search-loading" />}
            {!searchLoading && value === "" && (
              <div className="no-search-input">
                <p>검색어를 입력해주세요</p>
              </div>
            )}
            {!searchLoading && !!data && isEmpty(data?.search) && (
              <div className="no-search-result">
                <SadIcon />
                <p>{`${value}검색결과가 없습니다. ㅠㅠ`}</p>
              </div>
            )}
            {!searchLoading && results}
          </div>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default SearchInput;
