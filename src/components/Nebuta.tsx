/* eslint-disable @next/next/no-html-link-for-pages */
import { css } from "@emotion/react";
import { Button, IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import React from "react";
import HelpIcon from "@mui/icons-material/Help";
import MapIcon from "@mui/icons-material/Map";

import { Nebuta } from "./RootMain";

export const NebutaPage: React.FC<{ nebuta: Nebuta }> = ({ nebuta }) => {
  return (
    <div
      css={css`
        margin-top: 50px;
        position: relative;
        height: 100vh;
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
            製作者: {nebuta.creator}
          </p>
          <p>カテゴリ: {nebuta.category}</p>
        </div>
        <p
          css={css`
            line-height: 2;
          `}
        >
          {nebuta.details}
        </p>

        <a
          href={nebuta.detailUrl}
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
            src={nebuta.detailImgUrl}
            alt=""
            css={css`
              width: 100%;
            `}
          />

          <img
            src={nebuta.detailImgUrl1}
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
            <a
              href="/"
              css={css`
                display: flex;
                align-items: center;
                color: inherit;
                text-decoration: none;
              `}
            >
              <MapIcon
                css={css`
                  margin-right: 5px;
                `}
              ></MapIcon>
              地図に戻る
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
