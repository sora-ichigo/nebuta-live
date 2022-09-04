import React from "react";
import { css } from "@emotion/react";

const header = () => css`
  background-image: url("https://res.cloudinary.com/drb9hgnv3/image/upload/v1662254189/unknown_ghbp9e.png");
  background-size: contain;
  width: 100%;
  height: 80px;
  position: fixed;
  margin: 0;
  padding: 0;
  top: 0;
  padding-left: 20px;
  display: flex;
  align-items: center;
  z-index: 10;
`;
const text = css`
  color: #fff;
  font-size: 28px;
  text-shadow: 1px 1px #000;
  font-weight: bold;
`;

const Header: React.FC = () => {
  return (
    <div css={header}>
      <h2 css={text}>青森ねぶた祭り</h2>
    </div>
  );
};

export default Header;
