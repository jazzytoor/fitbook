import React, { useState, useEffect } from "react"
import Firebase from "../../config/Firebase"
import PasswordRequirements from "../../components/PasswordRequirements"

// Material Ui Imports
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import Alert from "@material-ui/lab/Alert"
import Paper from "@material-ui/core/Paper"

import UserPass from "../../components/UserPass"

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      marginTop: theme.spacing(2)
    },
    width: "100%",
    fontFamily: "Orbitron",
    display: "flex",
    justifyContent: "center",
    alignContent: "center"
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
  field: {
    backgroundColor: "none",
    borderRadius: "5px",
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
  title: {
    fontFamily: "Orbitron",
    color: "#eee"
  },
  input: {
    color: "#eee"
  },
  options: {
    color: "#000"
  }
}))

function Dashboard({ history }) {
  const classes = useStyles()
  const [isPasswordLongEnough, setPasswordLongEnough] = useState(false)
  const [doesPasswordContainNAndL, setPasswordContainNAndL] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [personalTrainer, setPersonalTrainer] = useState(null)
  const [ptsArray, setPtsArray] = useState([])
  const [error, setError] = useState(false)
  const [validationErrors, setValidationErrors] = useState(false)

  const enableSite = process.env.REACT_APP_ENABLE_SITE

  useEffect(() => {
    Firebase.getPersonalTrainers().then(train => {
      setPtsArray(train)
    })
  }, [])

  return (
    <div className="test">
      <Container component="main" maxWidth="xs" className={classes.root}>
        <Paper className={classes.paper} elevation={0}>
          <Typography component="h1" variant="h5" className={classes.title}>
            Sign Up For FitBook
          </Typography>
          <form onSubmit={e => e.preventDefault() && false}>
            <UserPass
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              name={name}
              setName={setName}
              setPasswordLongEnough={setPasswordLongEnough}
              setPasswordContainNAndL={setPasswordContainNAndL}
              enablePassword={true}
              setAnyErrors={setValidationErrors}
            />
            <TextField
              select
              required
              fullWidth
              variant="outlined"
              label="Select Personal Trainer"
              SelectProps={{
                native: true
              }}
              classes={{
                root: classes.field
              }}
              onChange={e => setPersonalTrainer(e.target.value)}
              classes={{
                root: classes.field
              }}
              InputProps={{
                className: classes.input
              }}
            >
              {Object.values(ptsArray).map(trainers => (
                <option
                  key={trainers.value}
                  value={trainers.label}
                  className={classes.options}
                >
                  {trainers.label}
                </option>
              ))}
            </TextField>
            {error && (
              <Alert severity="error">Email Already Taken, Try Another!</Alert>
            )}
            <PasswordRequirements
              length={isPasswordLongEnough}
              characters={doesPasswordContainNAndL}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={onRegister}
              disabled={
                !email.length ||
                !isPasswordLongEnough ||
                !doesPasswordContainNAndL ||
                !personalTrainer ||
                validationErrors ||
                enableSite
              }
            >
              Register
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  )

  async function onRegister() {
    try {
      await Firebase.register(name, personalTrainer, email, password)
      history.push("/")
    } catch {
      setError(true)
    }
  }
}

export default Dashboard
