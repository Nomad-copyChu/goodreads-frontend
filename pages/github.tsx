import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import cookie from "js-cookie";
import { useRouter } from "next/dist/client/router";
import { NextPage } from "next";
import { ApolloNextPageContext } from "../types";
import GITHUB_LOGIN from "../query/github";

interface IProps {
  code?: string | string[];
}

const github: NextPage<IProps> = ({ code }) => {
  const [githublogin] = useMutation<{ githubLogin: { token: string; isFisrt: boolean } }>(GITHUB_LOGIN, {
    variables: { code }
  });
  const router = useRouter();
  const githubLogin = async () => {
    const { data } = await githublogin();
    if (data?.githubLogin) {
      cookie.set("Authorization", data.githubLogin.token);
      if (data.githubLogin.isFisrt) {
        //최초 로그인 이라면
        window.location.href = "/auth/register/success";
      } else {
        window.location.href = "/";
      }
    }
  };
  useEffect(() => {
    if (code) {
      githubLogin();
    } else {
      window.location.href = "https://github.com/login/oauth/authorize?client_id=da15f4e685d7726aa2c9";
    }
  }, []);
  return <div>login...</div>;
};

github.getInitialProps = async ({ query }: ApolloNextPageContext) => {
  const { code } = query;
  return { code };
};

export default github;
