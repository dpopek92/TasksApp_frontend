import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    margin-left: 5px;
  }
`;

interface IProps {
  title: string;
}

const PageHeader: React.FC<IProps> = ({ title }) => {
  return (
    <Wrapper>
      <h1>{title}</h1>
    </Wrapper>
  );
};

export default PageHeader;
