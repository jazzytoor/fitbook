import React from "react"
import ErrorIcon from "@material-ui/icons/Error"
import DoneIcon from "@material-ui/icons/Done"
import DialogContentText from "@material-ui/core/DialogContentText"

import "./PasswordRequirements.scss"

const Requirements = ({ htmlFor, isvalid, validMessage, invalidMessage }) => (
  <DialogContentText>
    <label htmlFor={htmlFor} className="password-requirements">
      {!isvalid ? <ErrorIcon /> : <DoneIcon />}
      {!isvalid ? invalidMessage : validMessage}
    </label>
  </DialogContentText>
)

export default Requirements
