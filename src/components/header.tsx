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
  ::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 8px;
    background-color: #f6f6f6;
  }
`;
const text = css`
  color: #fff;
  font-size: 18px;
  text-shadow: 1px 1px #000;
  font-weight: bold;
`;

const Header: React.FC = () => {
  return (
    <div css={header}>
      <h2 css={text}>青森ねぶた祭り</h2>
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
