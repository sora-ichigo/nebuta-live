import { css } from "@emotion/react";
import { Button, IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import React from "react";
import HelpIcon from "@mui/icons-material/Help";
import MapIcon from "@mui/icons-material/Map";
import Link from "next/link";

import { Nebuta } from "./RootMain";

export const NebutaPage: React.FC<{ nebuta: Nebuta }> = ({ nebuta }) => {
  return (
    <div
      css={css`
        margin-top: 50px;
      `}
    >
      <ImageListItem key={nebuta.id}>
        <img
          src={`${nebuta.imgUrl}`}
          alt={nebuta.name}
          css={css`
            width: 100%;
            height: 200px;
            object-fit: cover;
          `}
        />
        <ImageListItemBar
          title={nebuta.name}
          subtitle={nebuta.groupName}
          actionIcon={
            <IconButton sx={{ color: "rgba(255, 255, 255, 0.54)" }} aria-label={`info about ${nebuta.name}`}>
              <HelpIcon
                css={css`
                  font-size: 26px;
                `}
              />
            </IconButton>
          }
        />
      </ImageListItem>

      <div
        css={css`
          padding: 30px 20px;
        `}
      >
        <div
          css={css`
            margin-bottom: 27px;
          `}
        >
          <p
            css={css`
              margin-bottom: 4px;
            `}
          >
            {" "}
            製作者: 竹浪　比呂央
          </p>
          <p>カテゴリ: ねぶた</p>
        </div>
        <p
          css={css`
            line-height: 2;
          `}
        >
          法華経に登場し、仏法を守護するとされている八大はちだい龍王。
          水に関する神として、雨乞いや海上安全などにご利益があると信じられている。
          海岸沿いの見晴らしの良い小山に建てられた社殿から浅虫の人々と自然を見守り続け、龍神さまと呼ばれ地元の人々に親しまれている。
        </p>

        <a
          href="https://www.nebuta.jp/archive/nebuta/2022ryouyuukai.html"
          css={css`
            display: block;
            padding-top: 12px;
          `}
        >
          さらに詳しく
        </a>

        <div
          css={css`
            margin-top: 30px;
          `}
        >
          <img
            src="https://res.cloudinary.com/drb9hgnv3/image/upload/v1662298716/Untitled_1_xhi3vv.png"
            alt=""
            css={css`
              width: 100%;
            `}
          />

          <img
            src="https://res.cloudinary.com/drb9hgnv3/image/upload/v1662298713/Untitled_c326wk.png"
            alt=""
            css={css`
              width: 100%;
              margin-top: 20px;
            `}
          />
        </div>
        <div
          css={css`
            margin-top: 30px;
            margin-bottom: 40px;
            text-align: center;
          `}
        >
          <Button
            variant="contained"
            disableElevation
            css={css`
              font-size: 12px;
              padding: 10px 16px;
              border-radius: 25px;
            `}
          >
            <Link href={`/`}>
              <a
                css={css`
                  display: flex;
                  align-items: center;
                  color: inherit;
                `}
              >
                <MapIcon
                  css={css`
                    margin-right: 5px;
                  `}
                ></MapIcon>
                地図に戻る
              </a>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
