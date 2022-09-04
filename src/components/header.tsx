/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import HelpIcon from "@mui/icons-material/Help";
import { css } from "@emotion/react";

const header = () => css`
  // background-image: url("https://res.cloudinary.com/drb9hgnv3/image/upload/v1662254189/unknown_ghbp9e.png");
  background-color: #1976d2;
  background-size: contain;
  width: 100%;
  height: 50px;
  position: fixed;
  margin: 0;
  padding: 0;
  top: 0;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;
const text = css`
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  text-shadow: 1px 1px #000;
  font-weight: bold;
`;

const Header: React.FC = () => {
  return (
    <div css={header}>
      <a href="/" css={text}>
        青森ねぶた祭り
      </a>
      <HelpIcon
        css={css`
          color: #f6f6f6;
          font-size: 24px;
        `}
      ></HelpIcon>
    </div>
  );
};

export default Header;
