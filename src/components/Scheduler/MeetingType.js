import React from "react"
import DialogContentText from "@material-ui/core/DialogContentText"

import moment from "moment"
import jmespath from "jmespath"

export const MeetingType = ({ meetingType, dateSelected }) =>
  meetingType == "edit" ? (
    <DialogContentText>
      Are you sure you want to edit the following? <br />
      From <br />
      Date:
      {moment(jmespath.search(dateSelected, "oldEvent.start")).format(
        "DD/MM/YYYY"
      )}
      <br />
      Time:
      {moment(jmespath.search(dateSelected, "oldEvent.start")).format(
        "HH:mm A"
      )}
      <br />
      <br />
      To <br />
      Date:
      {moment(jmespath.search(dateSelected, "event.start")).format(
        "DD/MM/YYYY"
      )}
      <br />
      Time:
      {moment(jmespath.search(dateSelected, "event.start")).format("HH:mm A")}
    </DialogContentText>
  ) : meetingType == "existing" ? (
    <DialogContentText>
      Are you sure you want to delete the following? <br />
      Date:
      {moment(jmespath.search(dateSelected, "event.start")).format(
        "DD/MM/YYYY"
      )}
      <br />
      Time:
      {moment(jmespath.search(dateSelected, "event.start")).format("HH:mm A")}
    </DialogContentText>
  ) : meetingType == "pt" ? (
    <DialogContentText>
      Do You Want to Accept Or Decline The Following? <br />
      Name:
      {jmespath.search(dateSelected, "event.title")}
      <br />
      Date:
      {moment(jmespath.search(dateSelected, "event.start")).format(
        "DD/MM/YYYY"
      )}
      <br />
      Time:
      {moment(jmespath.search(dateSelected, "event.start")).format("HH:mm A")}
    </DialogContentText>
  ) : (
    <DialogContentText>
      Are you sure you want to book the following? <br />
      Date:
      {moment(jmespath.search(dateSelected, "dateStr")).format("DD/MM/YYYY")}
      <br />
      Time: {moment(jmespath.search(dateSelected, "dateStr")).format("HH:mm A")}
    </DialogContentText>
  )
