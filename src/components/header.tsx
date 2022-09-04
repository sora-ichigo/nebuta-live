/* eslint-disable @next/next/no-html-link-for-pages */
import { useState } from "react";
import HelpIcon from "@mui/icons-material/Help";
import CloseIcon from "@mui/icons-material/Close";
import { css } from "@emotion/react";
import { IconButton } from "@mui/material";

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
  const [isShowHelp, setIsShowHelp] = useState(false);
  return (
    <>
      {isShowHelp && (
        <div
          css={css`
            transition: 0.5s;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #fff;
            opacity: 0.9;
            z-index: 100;
          `}
        >
          <IconButton
            aria-label="delete"
            onClick={() => setIsShowHelp(false)}
            css={css`
              position: absolute;
              top: 3%;
              right: 6%;
            `}
          >
            <CloseIcon
              css={css`
                font-size: 48px;
              `}
            ></CloseIcon>
          </IconButton>
        </div>
      )}
      <div css={header}>
        <a href="/" css={text}>
          青森ねぶた祭り
        </a>
        <HelpIcon
          css={css`
            color: #f6f6f6;
            font-size: 24px;
            cursor: pointer;
          `}
          onClick={(v) => {
            setIsShowHelp(true);
          }}
        ></HelpIcon>
      </div>
    </>
  );
};

export default Header;
