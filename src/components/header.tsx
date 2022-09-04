/* eslint-disable @next/next/no-html-link-for-pages */
import { useState } from "react";
import HelpIcon from "@mui/icons-material/Help";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import TouchAppIcon from "@mui/icons-material/TouchApp";
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
          <>
            <a
              css={css`
                font-family: "游明朝", "Yu Mincho", YuMincho, "Hiragino Mincho Pro", serif;
                top: 10px;

                justify-content: center;
                align-items: center;
              `}
            >
              Help
            </a>
          </>
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 10px;
              margin-right: 10px;
              width: 100%;
            `}
          >
            <InfoIcon
              css={css`
                font-size: 50px;
              `}
            ></InfoIcon>
            青森ねぶた祭りのねぶたの位置をスマホで確認できます。
          </div>
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 10px;
              margin-right: 10px;
              width: 100%;
            `}
          >
            <img
              src="https://res.cloudinary.com/drb9hgnv3/image/upload/v1662210447/download_rchsic.png"
              css={css`
                margin-top: 10px;
                width: 100px;
                height: 75px;
              `}
            />
            <p
              css={css`
                font-family: "游明朝", "Yu Mincho", YuMincho, "Hiragino Mincho Pro", serif;
                color: #1c1c1c;
                font-weight: bold;
              `}
            >
              ねぶたマーカー
            </p>
          </div>
          <p
            css={css`
              font-size: 12px;
            `}
          >
            ねぶた祭りの出し物はわかりやすいように色分けされています。
          </p>
          <>
            <div
              css={css`
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: 10px;
                width: 100%;
              `}
            >
              <div>
                <img
                  css={css`
                    max-width: 50%;
                    height: auto;
                  `}
                  src="https://res.cloudinary.com/ds1kkhh4o/image/upload/v1662290251/download__1_-removebg-preview_a9qunv.png"
                ></img>
                ねぶた
              </div>
              <div>
                <img
                  css={css`
                    max-width: 50%;
                    height: auto;
                  `}
                  src="https://res.cloudinary.com/ds1kkhh4o/image/upload/v1662289900/download-removebg-preview_le2dn5.png"
                ></img>
                囃子
              </div>
              <div>
                <img
                  css={css`
                    max-width: 50%;
                    height: auto;
                  `}
                  src="https://res.cloudinary.com/ds1kkhh4o/image/upload/v1662289918/24275756-removebg-preview_jqioxx.png"
                ></img>
                神輿
              </div>
            </div>
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px;
                margin-right: 10px;
                width: 100%;
              `}
            >
              <InfoIcon
                css={css`
                  font-size: 50px;
                `}
              ></InfoIcon>
              ねぶた Info
            </div>
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px;
                margin-right: 10px;
                width: 100%;
              `}
            >
              <p>ねぶたの詳しい情報はマーカーを</p>
              <TouchAppIcon />
            </div>
            <img src="https://res.cloudinary.com/dk9lw5vg4/image/upload/v1662308142/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-09-05_011516_aowfv2.png"></img>
          </>
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
