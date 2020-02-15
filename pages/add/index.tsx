import React from "react";
import styled from "styled-components";
import Link from "next/link";
import InkPen from "../../public/static/svg/registerSuccess/ink-pen.svg";
import colors from "../../style/colors";

const Container = styled.div`
  .card-list {
    margin-top: 200px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    a {
      &:hover {
        text-decoration: none;
      }
    }
    .card {
      width: 240px;
      height: 374px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid ${colors.gray_500};
      justify-content: flex-end;
      border-radius: 5px;
      padding-bottom: 18px;

      img {
        width: 240px;
        margin-bottom: 30px;
      }

      p {
        color: ${colors.gray_500};
      }
      .quote {
        color: ${colors.gray_800};
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 21px;
        line-height: 30px;
      }
      &:hover {
        p {
          color: ${colors.black};
        }
        border-color: ${colors.black};
      }
      cursor: pointer;
    }
  }
`;

const index: React.FC = () => {
  return (
    <Container>
      <div className="card-list">
        <Link href="add/book">
          <a>
            <div className="card">
              <img src="/static/image/black-book.png" alt="" />
              <p>책 추가하기</p>
            </div>
          </a>
        </Link>
        <Link href="add/author">
          <a>
            <div className="card">
              <InkPen />
              <p>작가 추가하기</p>
            </div>
          </a>
        </Link>
        <Link href="add/quote">
          <a>
            <div className="card">
              <p className="quote">
                “닭을 죽인자는 미워하되
                <br />
                튀긴자는 미워하지 말라"
              </p>
              <p>명언 추가하기</p>
            </div>
          </a>
        </Link>
      </div>
    </Container>
  );
};

export default index;
