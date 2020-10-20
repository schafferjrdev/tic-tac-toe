import React from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import { ReactComponent as Xis } from "./assets/image/xis.svg";
import { ReactComponent as Zero } from "./assets/image/zero.svg";

const Square = (props) => {
  let className = "square";

  if (props.winSquare && props.winSquare.indexOf(props.keySquare) !== -1) {
    className += " win";
  }

  const valToSvg = {
    X: <Xis />,
    O: <Zero />,
  };

  return (
    <ButtonBase>
      <span className={className} onClick={props.onClick}>
        {valToSvg[props.value]}
      </span>
    </ButtonBase>
  );
};

export default Square;
