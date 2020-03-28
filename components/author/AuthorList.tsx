import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Author } from "../../types";
import MainAuthor from "./MainAuthor";

const Container = styled.div`
  width: 875px;
  margin: auto;
  margin-top: 60px;
  @media (max-width: 920px) {
    width: 100%;
    padding: 20px;
    margin-top: 0;
  }
  h1 {
    font-size: 21px;
    margin-bottom: 20px;
  }
  .ood-author-wrapper {
    width: 100%;
    @media (max-width: 920px) {
      display: none;
    }
  }
  .even-author-wrapper {
    width: 100%;
    margin-top: 20px;
    margin-left: 20px;
    @media (max-width: 920px) {
      display: none;
    }
  }
  .main-borderbox-author {
    margin-bottom: 20px;
  }
  .author-list-wrapper {
    display: flex;
    max-width: 960px;
    margin: auto;
    justify-content: space-between;
  }
  .mobile-author-list-wrapper {
    @media (min-width: 920px) {
      display: none;
    }
  }
`;

interface IProps {
  authors: Author[];
}

const AuthorList: React.FC<IProps> = ({ authors }) => {
  const [oddAuthors, setOddAuthors] = useState([]);
  const [evenAuthors, setEvenAuthors] = useState([]);

  useEffect(() => {
    const odd = [];
    const even = [];
    authors.map((author, index) => {
      if (index % 2 === 0) {
        odd.push(author);
      } else {
        even.push(author);
      }
    });
    setOddAuthors(odd as any);
    setEvenAuthors(even as any);
  }, []);
  return (
    <Container>
      <h1>작가 목록</h1>
      <div className="author-list-wrapper">
        <div className="ood-author-wrapper">
          {oddAuthors.map(author => {
            return <MainAuthor author={author} key={author.id} />;
          })}
        </div>
        <div className="even-author-wrapper">
          {evenAuthors.map(author => {
            return <MainAuthor author={author} key={author.id} />;
          })}
        </div>
      </div>
      <div className="mobile-author-list-wrapper">
        {authors.map(author => (
          <MainAuthor author={author} key={author.id} />
        ))}
      </div>
    </Container>
  );
};

export default AuthorList;
