import React from "react";
import styled from "styled-components";
import { NextPage } from "next";
import Link from "next/link";
import UserbookShelf from "../../public/static/svg/userbooklistBlack.svg";
import colors from "../../style/colors";
import { User, ApolloNextPageContext } from "../../types";
import { GET_LOGGED_USER } from "../../query/user";

const Container = styled.div`
  min-height: 100vh;
  .card-list {
    margin-top: 200px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    @media (max-width: 800px) {
      margin-top: 20px;
    }
    a {
      margin-right: 20px;
      margin-bottom: 20px;
      &:hover {
        text-decoration: none;
      }
    }
    .UserBookShelf {
      width: 240px;
      height: 240px;
      margin-bottom: 30px;
    }
    .card {
      width: 240px;
      height: 374px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid ${colors.gray_600};
      justify-content: flex-end;
      border-radius: 5px;
      padding-bottom: 18px;

      img {
        width: 240px;
        margin-bottom: 30px;
      }

      p {
        color: ${colors.gray_600};
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

interface IProps {
  user: User;
}

const index: NextPage<IProps> = ({ user }) => {
  return (
    <Container>
      <div className="card-list">
        <Link href="/add/book">
          <a>
            <div className="card">
              <img src="/static/image/black-book.png" alt="" />
              <p>책 추가하기</p>
            </div>
          </a>
        </Link>
        <Link href="/me/[id]" as={`/me/${user.id}`}>
          <a>
            <div className="card">
              <UserbookShelf className="UserBookShelf" />
              <p>선반 추가하기</p>
            </div>
          </a>
        </Link>
        <Link href="/add/quote">
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

index.getInitialProps = async (ctx: ApolloNextPageContext) => {
  const { apolloClient } = ctx;
  const { data } = await apolloClient.query({
    query: GET_LOGGED_USER
  });
  return { user: data?.getUser };
};
export default index;
