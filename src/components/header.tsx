/* eslint-disable @next/next/no-html-link-for-pages */
import { useEffect, useState } from "react";
import HelpIcon from "@mui/icons-material/Help";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
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
  useEffect(() => {
    if (isShowHelp) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
  }, [isShowHelp]);

  return (
    <>
      {isShowHelp && (
        <div
          css={css`
            transition: 0.5s;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #fff;
            display: flex;
            padding: 0 20px;
            align-items: center;
            opacity: 0.9;
            overflow: scroll;
            z-index: 1000000;
          `}
        >
          <div>
            <div
              css={css`
                margin-bottom: 40px;
              `}
            >
              <HelpListItem text="青森ねぶた祭りのねぶたの位置をスマホで確認できます。" />
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  padding: 10px;
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
                    color: #333;
                    font-weight: bold;
                    padding-left: 8px;
                  `}
                >
                  ねぶたアイコン
                </p>
              </div>
            </div>

            <div
              css={css`
                margin-bottom: 60px;
              `}
            >
              <HelpListItem text="ねぶた祭りの出し物はわかりやすいように色分けされています。" />

              <div
                css={css`
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                  width: 100%;
                  margin-top: 10px;
                `}
              >
                <div>
                  <img
                    css={css`
                      max-width: 50%;
                      height: auto;
                    `}
                    src="https://res.cloudinary.com/drb9hgnv3/image/upload/v1662210447/download_rchsic.png"
                  ></img>
                  ねぶた
                </div>
                <div>
                  <img
                    css={css`
                      max-width: 50%;
                      height: auto;
                    `}
                    src="https://res.cloudinary.com/drb9hgnv3/image/upload/v1662329826/download_2_ad82wo.png"
                  ></img>
                  囃子
                </div>
                <div>
                  <img
                    css={css`
                      max-width: 50%;
                      height: auto;
                    `}
                    src="https://res.cloudinary.com/drb9hgnv3/image/upload/v1662329761/download_1_yjd91x.png"
                  ></img>
                  神輿
                </div>
              </div>
            </div>

            <HelpListItem text="それぞれのねぶたをタッチすると、より詳しい情報が見れます。" />
          </div>

          <IconButton
            aria-label="delete"
            onClick={() => setIsShowHelp(false)}
            css={css`
              position: fixed;
              z-index: 1000000;
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
            font-size: 32px;
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

const HelpListItem: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <InfoIcon
        css={css`
          color: #333;
          margin-right: 8px;
          font-size: 32px;
        `}
      ></InfoIcon>
      <p
        css={css`
          font-size: 18px;
          line-height: 1.5;
        `}
      >
        {text}
      </p>
    </div>
  );
};
