import React from "react";

export const Button = (props) => {
  return (
    <input
      type={props.type}
      value={props.value}
      className="button"
      onClick={props.onClick ? (e) => props.onClick() : (e) => {}}
      onSubmit={props.onSubmit ? (e) => props.onSubmit() : (e) => {}}
    />
  );
};
