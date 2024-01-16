import React, { useState } from "react"
import "./ForgotPassword.scss"
import Firebase from "../../config/Firebase"

// Material Ui Imports
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Alert from "@material-ui/lab/Alert"

import UserPass from "../../components/UserPass"
import { makeStyles } from "@material-ui/core/styles"

import Paper from "@material-ui/core/Paper"

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
    backgroundColor: "#eee",
    borderRadius: "5px"
  },
  title: {
    fontFamily: "Orbitron",
    color: "#eee"
  },
  text: {
    color: "#eee"
  }
}))
export default function ForgotPassword() {
  const classes = useStyles()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [helper, setHelper] = useState(false)
  const [validEmail, setValidEmail] = useState(true)
  const enableSite = process.env.REACT_APP_ENABLE_SITE

  async function resetPassword() {
    const resetResponse = await Firebase.resetPassword(email)
    resetResponse && setHelper(true)
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title}>
          Forgotten Password
        </Typography>
        <form onSubmit={e => e.preventDefault() && false}>
          <UserPass
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            setValidEmail={setValidEmail}
          />
          {helper && (
            <Alert severity="success">
              Password Has Been Reset, Check Your Email!
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={resetPassword}
            disabled={validEmail || enableSite}
            // classes={{
            //   root: classes.button
            // }}
          >
            Reset Password
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
