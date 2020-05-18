import React from "react";

export const IconClose = React.forwardRef((props, ref) => {
  return <span ref={ref} {...props} className="icon icon_close" onClick={() => props.onCloseIconClick()}></span>;
});
