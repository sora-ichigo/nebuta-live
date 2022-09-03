import React from "react";
import { css } from "@emotion/react";

const header = () => css`
  background-color: yellow;
  width: 100%;
  height: 80px;
  position: fixed;
  margin: 0;
  padding: 0;
  top: 0;
  padding-left: 20px;
  display: flex;
  align-items: center;
`;
const text = css`
  color: red;
  font-size: 40px;
`;

const Header = () => {
  return (
    <div css={header}>
      <h2 css={text}>NEBUTA</h2>
    </div>
  );
};

export default Header;
