import React, { useState, useRef } from "react"
import clsx from "clsx"
import "./MeetingScheduler.scss"

// Material Ui Dependencies
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from "@material-ui/core/TextField"
import CircularProgress from "@material-ui/core/CircularProgress"

import Firebase from "../../config/Firebase"
import moment from "moment"
import jmespath from "jmespath"

import { MeetingType } from "../Scheduler"
import { useStyles } from "../Scheduler"
import { PaperComponent } from "../Scheduler"

export default function MeetingScheduler({
  openDialog,
  setPopup,
  dateSelected,
  setDateSelected,
  meetingType
}) {
  const classes = useStyles()
  const [open, setOpen] = useState(openDialog)
  const [name, setName] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const timer = useRef()

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  })

  const handleClose = () => {
    setOpen(false)
    setPopup(false)
    setDateSelected(null)
  }

  const addMeeting = async dateSelected => {
    const date = moment(
      jmespath.search(
        dateSelected,
        meetingType == "new" ? "dateStr" : "event.start"
      )
    ).format()
    const allDay = jmespath.search(
      dateSelected,
      meetingType == "new" ? "allDay" : "event.allDay"
    )
    const sessionName =
      meetingType == "new" ? name : jmespath.search(dateSelected, "event.title")

    if (!loading) {
      setSuccess(false)
      setLoading(true)
      timer.current = setTimeout(() => {
        Firebase.addMeeting(allDay, date, sessionName).then(() => {
          setSuccess(true)
          setLoading(false)
        })
      }, 1000)
    }
  }

  const deleteMeeting = async dateSelected => {
    const name = jmespath.search(dateSelected, "event.title")
    if (!loading) {
      setSuccess(false)
      setLoading(true)
      timer.current = setTimeout(() => {
        Firebase.deleteMeeting(name)
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
          <MeetingType meetingType={meetingType} dateSelected={dateSelected} />
          {meetingType == "new" ? (
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="Enter Meeting Name"
              fullWidth
              value={name}
              onChange={e => setName(e.target.value)}
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          {meetingType == "edit" ? (
            <Button
              disabled={loading}
              variant="contained"
              className={buttonClassname}
              onClick={!success ? () => addMeeting(dateSelected) : null}
              color="primary"
            >
              {success ? "Meeting Edited" : "Edit"}
            </Button>
          ) : meetingType == "existing" ? (
            <Button
              disabled={loading}
              variant="contained"
              className={buttonClassname}
              onClick={!success ? () => deleteMeeting(dateSelected) : null}
              color="primary"
            >
              {success ? "Deleted Meeting" : "Delete"}
            </Button>
          ) : (
            <Button
              disabled={!name.length || loading}
              variant="contained"
              className={buttonClassname}
              onClick={!success ? () => addMeeting(dateSelected) : null}
              color="primary"
            >
              {success ? "Meeting Booked" : "Book"}
            </Button>
          )}
          {loading && <CircularProgress size={24} className="buttonProgress" />}
          <Button
            variant="contained"
            onClick={handleClose}
            className={buttonClassname}
            color="primary"
          >
            {success ? "Close" : "Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
