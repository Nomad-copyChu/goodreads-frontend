import React, { useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useSprings, animated } from "react-spring";
import colors from "../../style/colors";
import BookShelfIcon from "../../public/static/svg/registerSuccess/book-shelf.svg";
import InkPenIcon from "../../public/static/svg/registerSuccess/ink-pen.svg";
import BookIcon from "../../public/static/svg/registerSuccess/open-book.svg";
import TeamIcon from "../../public/static/svg/registerSuccess/team.svg";

const Container = styled.div`
  .content {
    width: 80%;
    margin: 40px auto;

    h1 {
      font-size: 60px;
    }
    .content-list {
      display: flex;
      justify-content: space-between;

      .content-item {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        overflow: hidden;
        svg {
          margin-bottom: 20px;
        }
      }
      .ink-pen {
        svg {
          margin: 0;
        }
      }
      p {
        font-size: 21px;
        color: ${colors.gray_800};
        padding-top: 24px;
        margin-bottom: 16px;
        border-top: 1px solid ${colors.woody_500};
      }
    }
  }
`;

const RegisterSuccess: React.FC = () => {
  const [springs] = useSprings(4, index => ({
    to: { opacity: 1, marginLeft: 0 },
    from: { opacity: 0, marginLeft: -100 },
    delay: index * 500
  }));
  useEffect(() => {}, []);
  return (
    <Container>
      <div className="content">
        <h1>
          Welcome to
          <br />
          goodreadKr
        </h1>
        <div className="content-list">
          <animated.div style={springs[0]} className="content-item">
            <BookIcon />
            <p>좋아하는 책을 검색해보세요!</p>
            <Link href="/bookList">
              <a>도서 목록으로 가기&gt;</a>
            </Link>
          </animated.div>
          <animated.div style={springs[1]} className="content-item ink-pen">
            <InkPenIcon />
            <p>나만의 작가를 찾아보세요!</p>
            <Link href="/authorList">
              <a>도서 목록으로 가기&gt;</a>
            </Link>
          </animated.div>
          <animated.div style={springs[2]} className="content-item">
            <BookShelfIcon />
            <p>나만의 책들을 선반에 모아보세요!</p>
            <Link href="/me/shelf">
              <a>도서 선반으로 가기&gt;</a>
            </Link>
          </animated.div>
          <animated.div style={springs[3]} className="content-item">
            <TeamIcon />
            <p>친구들과 책을 공유하세요!</p>
            <Link href="/">
              <a>친구 검색하러 가기&gt;</a>
            </Link>
          </animated.div>
        </div>
      </div>
    </Container>
  );
};

export default RegisterSuccess;
