import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import styles from "../styles/Pages.module.css";

const Pages = observer(() => {
  const { device } = useContext(Context);
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = [];
  console.log(device);
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <div className='mt-3'>
      {pages.map((page) => (
        <div
          key={page}
          className={`${styles.paginationItem} ${
            device.page === page ? styles.paginationItemActive : ""
          }`}
          onClick={() => device.setPage(page)}
        >
          {page}
        </div>
      ))}
    </div>
  );
});

export default Pages;
