import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import OutsideClickHandler from "react-outside-click-handler";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import SadIcon from "../../public/static/svg/sad.svg";
import SearchIcon from "../../public/static/svg/search.svg";
import Input from "./Input";
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
    z-index: 10;
    border: 1px solid ${colors.woody_500};
    border-radius: 5px;
    position: absolute;
    background-color: white;
    width: 100%;
    overflow: scroll;
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
  .kakao-book-result {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid ${colors.gray_500};
    padding: 8px;
    cursor: pointer;
    &:hover {
      background-color: ${colors.beige_400};
    }
    img {
      height: 50px;
    }
    .book-infos {
      margin-left: 12px;
      .book-authors {
        margin-top: 8px;
        color: ${colors.gray_800};
        span {
          margin-right: 8px;
        }
      }
    }
  }
`;

interface IProps {
  placeholder?: string;
  onClick?: (selected: KakaoSearchResult) => void;
  target?: "title" | "isbn" | "publisher" | "person";
}

export type KakaoSearchResult = {
  authors: string[];
  contents: string;
  datetime: Date;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
};

const SearchKakaoInput: React.FC<IProps> = ({ placeholder, onClick, target }) => {
  const [value, setValue] = useState("");
  const searchValue = useDebounce(value, 500);
  const [bookList, setBookList] = useState<KakaoSearchResult[]>([]);
  const [popupStatus, setPoupStatus] = useState(false);
  const loading = useMemo(() => value !== searchValue, [value, searchValue]);

  const searchToKaKao = useCallback(async () => {
    if (searchValue !== "") {
      await axios
        .get(`https://dapi.kakao.com/v3/search/book?target=${target}`, {
          headers: {
            Authorization: "KakaoAK c18fd9563bb5f1308b1995a43bd59c99"
          },
          params: {
            query: searchValue
          }
        })
        .then(res => {
          setBookList(res.data.documents);
        });
    }
  }, [searchValue]);
  useEffect(() => {
    searchToKaKao();
  }, [searchValue]);

  return (
    <Container>
      <OutsideClickHandler onOutsideClick={() => setPoupStatus(false)}>
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setPoupStatus(true)}
          placeholder={placeholder}
        />
        <SearchIcon className="search-icon" />
        {popupStatus && (
          <div className="serach-result-popup">
            {value !== "" && loading && <img src="/static/gif/bookgif.gif" alt="" className="search-loading" />}
            {value === "" && (
              <div className="no-search-input">
                <p>검색어를 입력해주세요</p>
              </div>
            )}
            {!loading && value !== "" && isEmpty(bookList) && (
              <div className="no-search-result">
                <SadIcon />
                <p>{`${value}검색결과가 없습니다. ㅠㅠ`}</p>
              </div>
            )}
            {//prettier-ignore
            value !== ""
              && !loading
              && bookList.map((book) => (
                <div
                  key={book.isbn}
                  className="kakao-book-result"
                  role="button"
                  onClick={() => {
                    onClick(book);
                    setPoupStatus(false);
                  }}
                >
                  <img src={book.thumbnail} alt="" />
                  <div className="book-infos">
                    <p>{book.title}</p>
                    <p className="book-authors">{book.authors.map((author) => <span key={author}>{author}</span>)}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default SearchKakaoInput;
