import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import cookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import Logo from "../../public/static/svg/goodreadsKr.svg";
import Input from "../common/Input";
import colors from "../../style/colors";
import { LOGIN } from "../../query/auth";
import Button from "../common/Button";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: absolute;
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
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
    margin-top: 320px;

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
      width: 108px;
      height: 32px;
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
  const [loginMutation] = useMutation<{ login: string }>(LOGIN, { variables: { email, password } });
  const router = useRouter();
  const loginRequest = async () => {
    try {
      const data = await loginMutation();
      const token = data?.data?.login;
      if (token) {
        cookie.set("Authorization", token);
        window.location.href = "/";
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
        {error !== "" && <div className="error">{error}</div>}
        <p>비밀번호를 잃어버리셨나요?</p>
        <Button onClick={loginRequest} className="button">
          로그인
        </Button>
        <div className="button-wrapper">
          <Button color="github" onClick={() => router.push("/github")}>
            깃허브 로그인
          </Button>
        </div>
        <div className="register-text">
          <p>계정이 없으신가요?</p>
          <Link href="/auth/register">
            <a>회원가입</a>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default LoginBox;
