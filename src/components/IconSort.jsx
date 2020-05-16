import React from "react";

export const IconSort = (props) => {
  return (
    <span
      className={
        props.sorting === "ascending"
          ? "icon icon_sort icon_sort_ascending"
          : "icon icon_sort icon_sort_descending"
      }
      onClick={props.onClick}
    ></span>
  );
};
