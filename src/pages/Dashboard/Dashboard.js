import React, { useEffect, useState } from "react"
import "./Dashboard.scss"

// Full Calendar
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"

import Firebase from "../../config/Firebase"

// Popups
import MeetingScheduler from "../../components/MeetingScheduler"
import PtMeetingScheduler from "../../components/PtMeetingScheduler"

function Dashboard() {
  const [events, setEvents] = useState([])
  const [popup, setPopup] = useState(false)
  const [ptPopup, setPtPopup] = useState(false)
  const [dateSelected, setDateSelected] = useState(null)
  const [meetingType, setMeetingType] = useState(null)
  const [isPt, setIsPt] = useState(
    Firebase.getUserFields("is_pt").then(setIsPt)
  )
  const [editable, setEditable] = useState(true)

  function getMeetings(id) {
    Firebase.db
      .collection("meetings")
      .doc(id)
      .onSnapshot((documents) => {
        setEvents([])
        Object.values(documents.data()).map((values) => {
          setEvents((prevArray) => [...prevArray, values])
        })
      })
  }

  useEffect(() => {
    isPt.then((condition) => {
      if (condition) {
        Firebase.isUserLoggedIn().then((user) => {
          Firebase.db
            .collection("users")
            .get()
            .then((snap) => {
              snap.forEach((doc) => {
                if (
                  user.uid != doc.id &&
                  user.displayName == doc.data()["personal_trainer"]
                ) {
                  getMeetings(doc.id)
                }
              })
            })
        })
      } else {
        Firebase.isUserLoggedIn().then((user) => {
          getMeetings(user.uid)
        })
      }
    })
  }, [])

  const handleDateClick = (arg) => {
    setDateSelected(arg)
    isPt.then((condition) => {
      if (condition) {
        "event" in arg ? setPtPopup(true) : null
      } else {
        "oldEvent" in arg
          ? setMeetingType("edit")
          : "event" in arg
          ? setMeetingType("existing")
          : setMeetingType("new")
        setPopup(true)
      }
    })
  }

  isPt.then((condition) => {
    condition && setEditable(false)
  })

  return (
    <div>
      <div className="header-section">
        <h1>Dashboard</h1>
      </div>
      <FullCalendar
        dateClick={handleDateClick}
        eventClick={handleDateClick}
        eventDrop={handleDateClick}
        // eventResize={handleDateClick} Will be used to change how long the session will be
        defaultView="dayGridMonth"
        header={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        events={events}
        editable={editable}
      />
      <div>
        {popup && (
          <MeetingScheduler
            openDialog={popup}
            setPopup={setPopup}
            dateSelected={dateSelected}
            setDateSelected={setDateSelected}
            meetingType={meetingType}
          />
        )}
        {ptPopup && (
          <PtMeetingScheduler
            openDialog={ptPopup}
            setPopup={setPtPopup}
            dateSelected={dateSelected}
          />
        )}
      </div>
    </div>
  )
}

export default Dashboard
