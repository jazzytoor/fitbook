import React, { useState, useRef } from "react"
import clsx from "clsx"
// import "./PtMeetingScheduler.scss"

// Material Ui Dependencies
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from "@material-ui/core/TextField"
import CircularProgress from "@material-ui/core/CircularProgress"

import { useStyles } from "../Scheduler"
import { PaperComponent } from "../Scheduler"
import { MeetingType } from "../Scheduler"
import Firebase from "../../config/Firebase"
import jmespath from "jmespath"

export default function MeetingScheduler({
  openDialog,
  setPopup,
  dateSelected
}) {
  const classes = useStyles()
  const [open, setOpen] = useState(openDialog)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [accept, setAccept] = useState(true)
  const [decline, setDecline] = useState(true)
  const timer = useRef()

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  })

  const handleClose = () => {
    setOpen(false)
    setPopup(false)
  }

  const acceptMeeting = async (dateSelected, state) => {
    state == "accept" ? setDecline(false) : setAccept(false)
    const name = jmespath.search(dateSelected, "event.title")
    const userId = jmespath.search(dateSelected, "event.id")

    if (!loading) {
      setSuccess(false)
      setLoading(true)
      timer.current = setTimeout(() => {
        Firebase.acceptMeeting(name, userId, state)
        setSuccess(true)
        setLoading(false)
      }, 1000)
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Meeting Scheduler
        </DialogTitle>
        <DialogContent>
          <MeetingType meetingType="pt" dateSelected={dateSelected} />
        </DialogContent>
        <DialogActions>
          {accept && (
            <Button
              disabled={loading}
              variant="contained"
              className={buttonClassname}
              onClick={
                !success ? () => acceptMeeting(dateSelected, "accept") : null
              }
              color="primary"
            >
              {success ? "Meeting Accepted" : "Accept"}
            </Button>
          )}
          {decline && (
            <Button
              disabled={loading}
              variant="contained"
              className={buttonClassname}
              onClick={
                !success ? () => acceptMeeting(dateSelected, "decline") : null
              }
              color="primary"
            >
              {success ? "Meeting Declined" : "Decline"}
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleClose}
            className={buttonClassname}
            color="primary"
          >
            {success ? "Close" : "Cancel"}
          </Button>
          {loading && <CircularProgress size={24} className="buttonProgress" />}
        </DialogActions>
      </Dialog>
    </div>
  )
}
