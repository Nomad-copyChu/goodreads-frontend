import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import cookie from "js-cookie";
import { useRouter } from "next/dist/client/router";
import Logo from "../public/static/svg/goodreadsKr.svg";
import Input from "./Input";
import colors from "../style/colors";
import Button from "./Button";
import LOGIN from "../query/auth";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  .button {
    width: 108px;
    height: 32px;
  }
  .login-background {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .text {
    margin-top: 80px;
    margin-left: 80px;
    margin-bottom: 60px;
    position: relative;
    font-family: Hoefler Text;
    font-style: normal;
    font-weight: bold;
    font-size: 60px;
    z-index: 4;
    height: 150px;

    p {
      color: white;
      margin-bottom: 18px;
    }
  }
  .login-box {
    position: relative;
    z-index: 10;
    margin-left: 80px;
    background-color: white;
    border: 1px solid ${colors.gray_500};
    border-radius: 5px;
    width: 350px;
    height: 435px;
    padding: 20px 40px;

    h1 {
      margin: 25px 0px;
      font-size: 21px;
    }
    label {
      color: ${colors.gray_800};
      font-size: 12px;
    }
    input {
      margin-top: 2px;
      margin-bottom: 12px;
    }
    p {
      margin-bottom: 10px;
      color: ${colors.gray_600};
      font-size: 10px;
    }
    .forget-password {
      color: ${colors.gray_600};
      font-size: 10px;
      margin: 10px 0;
    }
  }
`;

const LoginBox: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation] = useMutation<{ login: string }>(LOGIN, { variables: { email, password } });
  const router = useRouter();
  const loginRequest = async () => {
    const data = await loginMutation();
    const token = data?.data?.login;
    if (token) {
      cookie.set("Authorization", token);
      router.push("/");
    }
  };
  return (
    <Container>
      <div className="text">
        <p>Meet you next </p>
        <p>favorite book</p>
      </div>
      <img className="login-background" src="https://media.giphy.com/media/h0cVMLhAiBtug/giphy.gif" alt="" />
      <div className="login-box">
        <Logo />
        <h1>로그인</h1>
        <label>이메일</label>
        <Input value={email} onChange={e => setEmail(e.target.value)} color="transparent" />
        <label>비밀번호</label>
        <Input value={password} onChange={e => setPassword(e.target.value)} type="password" color="transparent" />
        <p>비밀번호를 잃어버리셨나요?</p>
        <Button onClick={loginRequest} className="button">
          로그인
        </Button>
      </div>
    </Container>
  );
};

export default LoginBox;
