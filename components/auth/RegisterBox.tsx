import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import cookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import Logo from "../../public/static/svg/goodreadsKr.svg";
import Input from "../common/Input";
import colors from "../../style/colors";
import Button from "../common/Button";
import { REGISTER_USER } from "../../query/auth";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: absolute;
  @media (max-width: 795px) {
    justify-content: center;
  }
  .button {
    width: 108px;
    height: 32px;
  }
  .login-box {
    position: relative;
    z-index: 10;
    margin-left: 80px;
    background-color: white;
    border: 1px solid ${colors.gray_500};
    border-radius: 5px;
    width: 350px;
    height: fit-content;
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
    margin-top: 320px;
    @media (max-width: 795px) {
      margin-top: 0px;
      margin-left: 0px;
      align-self: center;
    }
    @media (max-width: 350px) {
      width: 280px;
    }
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
    .error {
      color: #fa604a;
      margin: 0 0 6px;
      font-size: 14px;
    }
    .forget-password {
      color: ${colors.gray_600};
      font-size: 10px;
      margin: 10px 0;
    }
    .button-wrapper {
      margin-top: 12px;
      width: 110px;
      height: 32px;
    }
    .button-font {
      font-size: 13px;
    }
    .register-text {
      display: flex;
      margin-top: 20px;
      width: 100%;
      justify-content: center;
      align-items: center;
      a {
        font-size: 12px;
        margin-left: 4px;
      }
      p {
        margin: 0;
      }
    }
  }
`;

const LoginBox: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [registerMutation] = useMutation<{ createUser: string }>(REGISTER_USER, {
    variables: { email, password, username }
  });
  const router = useRouter();
  const registerRequest = async () => {
    try {
      if (username === "") {
        throw Error("유저네임을 입력해주세요");
      }
      const data = await registerMutation();
      const token = data?.data?.createUser;
      if (token) {
        cookie.set("Authorization", token);
        router.push("/auth/register/success");
      }
    } catch (e) {
      setError(e.message.replace("GraphQL error: ", ""));
    }
  };
  return (
    <Container>
      <div className="login-box">
        <Logo />
        <h1>로그인</h1>
        <label>이메일</label>
        <Input value={email} onChange={e => setEmail(e.target.value)} color="transparent" />
        <label>비밀번호</label>
        <Input value={password} onChange={e => setPassword(e.target.value)} type="password" color="transparent" />
        <label>사용자 이름</label>
        <Input value={username} onChange={e => setUsername(e.target.value)} color="transparent" />
        {error !== "" && <div className="error">{error}</div>}
        <p>비밀번호를 잃어버리셨나요?</p>
        <Button onClick={registerRequest} className="button">
          회원가입
        </Button>
        <div className="button-wrapper">
          <Button className="button-font" color="github" onClick={() => router.push("/github")}>
            깃허브 회원가입
          </Button>
        </div>
        <div className="register-text">
          <p>계정이 있으신가요?</p>
          <Link href="/auth/login">
            <a>로그인</a>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default LoginBox;
