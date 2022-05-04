
import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

export const CyanButton = withStyles({
    root: {
      background: "transparent",
      border: "1px white solid",
      borderRadius: 100,
      color: "#3ee4cf",
      width: "autofit",
      height: 25,  
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 255, 255, 0.1)",
      textUnderline: "always" ,
      '&:hover':{
        background:  "#3ee4cf",
        color: 'black'
      }
    },
    label: {
      textTransform: "capitalize"
    },
  })(props => <Button {...props} />)

export const WhiteButton = withStyles({
  root: {
    background: "transparent",
    border: "1px white solid",
    borderRadius: 100,
    color: "white",
    width: "autofit",
    height: 25,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 255, 255, 0.1)",
    '&:hover':{
      background:  "white",
      color: 'black'
    }
  },
  label: {
    textTransform: "capitalize"
  },
})(props => <Button {...props} />)
