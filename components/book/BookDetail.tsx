import React from "react";
import styled from "styled-components";

import useUser from "../../hooks/useUser";

const BookDetail: React.FC = () => {
  const { user, isLogged } = useUser();
  console.log(user, isLogged);
  return <div>hello world</div>;
};

export default BookDetail;
