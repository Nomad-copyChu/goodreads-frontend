import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OutsideClickHandler from "react-outside-click-handler";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import SadIcon from "../../public/static/svg/sad.svg";
import SearchIcon from "../../public/static/svg/search.svg";
import Input from "./Input";
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
const SearchKakaoInput: React.FC<IProps> = ({ placeholder, onClick }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const serachValue = useDebounce(value, 500);
  const searchToKaKao = async () => {
    setLoading(true);
    const data = await axios.get("https://dapi.kakao.com/v3/search/book?target=title?can", {
      headers: {
        Authorization: "KakaoAK c18fd9563bb5f1308b1995a43bd59c99"
      },
      params: {
        query: "미움"
      }
    });
    console.log(data);
  };
  useEffect(() => {
    searchToKaKao();
  }, [serachValue]);
  const [popupStatus, setPoupStatus] = useState(false);

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
            {loading && <img src="/static/gif/bookgif.gif" alt="" className="search-loading" />}
            {value === "" && (
              <div className="no-search-input">
                <p>검색어를 입력해주세요</p>
              </div>
            )}
            {!loading && !!"data" && (
              <div className="no-search-result">
                <SadIcon />
                <p>{`${value}검색결과가 없습니다. ㅠㅠ`}</p>
              </div>
            )}
            {!loading && "results"}
          </div>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default SearchKakaoInput;
