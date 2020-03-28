import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Gerne } from "../../types";
import colors from "../../style/colors";

const Container = styled.div`
  margin-top: 8px;
  .flex {
    font-size: 14px;
    margin-top: 2px;
  }
  span {
    margin-left: 2px;
    color: ${colors.gray_600};
  }
`;

interface IProps {
  gernes: Gerne[];
}

const GetGernes: React.FC<IProps> = ({ gernes }) => {
  return (
    <Container>
      {gernes.map((gerne, index) => (
        <div key={index} className="flex">
          <Link href="/gerne/[term]" as={`/gerne/${gerne.term}`}>
            <a className="main-tag">{gerne.term}</a>
          </Link>
          <span>{`(${gerne.booksCount})`}</span>
        </div>
      ))}
    </Container>
  );
};

export default GetGernes;
