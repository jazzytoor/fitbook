import React, { useState, useEffect } from "react"

// Material Ui
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Avatar from "@material-ui/core/Avatar"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import IconButton from "@material-ui/core/IconButton"
import PhotoCamera from "@material-ui/icons/PhotoCamera"
import Badge from "@material-ui/core/Badge"

import Firebase from "../../config/Firebase"

const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(5)
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    },
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.8)"
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  snackbar: {
    marginBottom: theme.spacing(11)
  },
  input: {
    display: "none"
  },
  field: {
    "& label.Mui-focused": {
      color: "#eee"
    },
    "& label": {
      color: "#eee"
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#eee"
      },
      "& fieldset": {
        borderColor: "#eee"
      },
      "&:hover fieldset": {
        borderColor: "blue"
      }
    }
  },
  fieldText: {
    color: "#eee"
  }
}))

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function UserProfile() {
  const classes = useStyles()

  const [firstName, setFirstName] = useState("")
  const [secondName, setSecondName] = useState("")
  const [goals, setGoals] = useState("")
  const [personalTrainer, setPersonalTrainer] = useState("")
  const [disableButton, setDisableButton] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [url, setUrl] = useState(null)

  useEffect(() => {
    Firebase.getUserFields("first_name").then(setFirstName)
    Firebase.getUserFields("second_name").then(setSecondName)
    Firebase.getUserFields("goals").then(setGoals)
    Firebase.getUserFields("personal_trainer").then(setPersonalTrainer)
    Firebase.isUserLoggedIn().then(user => {
      Firebase.db
        .collection("users")
        .doc(user.uid)
        .onSnapshot(documents => {
          setUrl(documents.data()["url"])
        })
    })
  }, [])

  const [userDetails, setUserDetails] = useState({})

  const updateProfile = () => {
    Firebase.updateProfile(userDetails).then(() => {
      setDisableButton(true)
      setSuccess(true)
    })
  }

  const handleTextFieldBlur = (field, value) => evt => {
    setUserDetails(prevState => ({
      ...prevState,
      [field]: value
    }))
    setDisableButton(false)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setSuccess(false)
    setError(false)
  }

  const uploadImage = async event => {
    const image = event.target.files[0]
    const uploadPictureResponse = await Firebase.uploadPicture(image)
    uploadPictureResponse ? setSuccess(true) : setError(true)
  }

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            className={classes.header}
          >
            <input
              accept="image/*"
              className={classes.input}
              id="my-profile-picture"
              type="file"
              onChange={uploadImage}
            />
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              badgeContent={
                <label htmlFor="my-profile-picture">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              }
            >
              <Avatar
                alt="My Profile Picture"
                src={url}
                className={classes.avatar}
              />
            </Badge>
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                variant="outlined"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                onBlur={handleTextFieldBlur("first_name", firstName)}
                classes={{
                  root: classes.field
                }}
                InputProps={{
                  className: classes.fieldText
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                variant="outlined"
                value={secondName}
                onChange={e => setSecondName(e.target.value)}
                onBlur={handleTextFieldBlur("second_name", secondName)}
                classes={{
                  root: classes.field
                }}
                InputProps={{
                  className: classes.fieldText
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="goals"
                name="goals"
                label="Personal Goals"
                fullWidth
                variant="outlined"
                value={goals}
                onChange={e => setGoals(e.target.value)}
                onBlur={handleTextFieldBlur("goals", goals)}
                classes={{
                  root: classes.field
                }}
                InputProps={{
                  className: classes.fieldText
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="personalTrainer"
                name="personalTrainer"
                label="Your Personal Trainer"
                fullWidth
                variant="outlined"
                value={personalTrainer}
                classes={{
                  root: classes.field
                }}
                InputProps={{
                  className: classes.fieldText
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                className={classes.snackbar}
              >
                <Alert onClose={handleClose} severity="success">
                  Profile Has Been Updated!
                </Alert>
              </Snackbar>
              <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={handleClose}
                className={classes.snackbar}
              >
                <Alert onClose={handleClose} severity="error">
                  Unable To Update Profile!
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            <Button
              disabled={disableButton}
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={updateProfile}
            >
              Update
            </Button>
          </div>
        </Paper>
      </main>
    </React.Fragment>
  )
}
