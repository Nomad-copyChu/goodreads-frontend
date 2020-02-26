import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import GET_GERNES from "../../query/gernes";
import { Gerne } from "../../types";
import colors from "../../style/colors";

const Container = styled.div`
  .main-tag {
    margin-top: 2px;
    font-size: 12px;
  }
  span {
    margin-left: 2px;
    color: ${colors.gray_600};
  }
`;

const GetGernes: React.FC = () => {
  const { data } = useQuery<{ getGernes: Gerne[] }>(GET_GERNES);
  return (
    <Container>
      {data?.getGernes?.map((gerne, index) => (
        <div key={index} className="flex">
          <Link href="/gerne/[term]" as={`/gerne/${gerne.term}`}>
            <a className="tag">{gerne.term}</a>
          </Link>
          <span>{`(${gerne.booksCount})`}</span>
        </div>
      ))}
    </Container>
  );
};

export default GetGernes;
