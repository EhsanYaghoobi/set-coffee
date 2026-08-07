"use client";
import React from "react";
import styles from "./tabs.module.css";
import { useState } from "react";
import Description from "./Description";
import MoreInfoes from "./MoreInfoes";
import Comments from "./Comments";
import { ProductProps } from "@/types/product";
import { IComment } from "@/models/Comment";

const Tabs = ({ product }: ProductProps) => {
  const [tab, setTab] = useState("description");

  return (
    <div data-aos="fade-left" className={styles.tabs}>
      <ul>
        <li>
          <button
            className={tab === "description" ? styles.active_tab : ""}
            onClick={() => setTab("description")}
          >
            توضیحات
          </button>
        </li>
        <li>
          <button
            className={tab === "moreInfoes" ? styles.active_tab : ""}
            onClick={() => setTab("moreInfoes")}
          >
            اطلاعات بیشتر
          </button>
        </li>
        <li>
          <button
            className={tab === "comments" ? styles.active_tab : ""}
            onClick={() => setTab("comments")}
          >
            نظرات (
            {
              product.comments.filter((comment: IComment) => comment.isAccept)
                .length
            }
            )
          </button>
        </li>
      </ul>

      <div className={styles.contents}>
        <section>
          {tab === "description" && <Description />}
          {tab === "moreInfoes" && (
            <MoreInfoes product={JSON.parse(JSON.stringify(product))} />
          )}
          {tab === "comments" && (
            <Comments product={JSON.parse(JSON.stringify(product))} />
          )}
        </section>
      </div>
    </div>
  );
};

export default Tabs;
