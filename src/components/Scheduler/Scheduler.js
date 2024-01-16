import React from "react"

// Material Ui Dependencies
import { makeStyles } from "@material-ui/core/styles"
import { green } from "@material-ui/core/colors"
import Paper from "@material-ui/core/Paper"
import Draggable from "react-draggable"

export const useStyles = makeStyles(() => ({
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[900]
    }
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}))

export function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}
