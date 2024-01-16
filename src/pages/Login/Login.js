import React, { useState } from "react"
import "./Login.scss"
import Firebase from "../../config/Firebase"

// Material Ui Imports
import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Alert from "@material-ui/lab/Alert"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"

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
  title: {
    fontFamily: "Orbitron",
    color: "#eee"
  },
  text: {
    color: "#eee"
  }
}))

export default function Login({ history }) {
  const classes = useStyles()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [incorrectDetails, setIncorrectDetails] = useState(false)
  const [validEmail, setValidEmail] = useState(true)

  const enableSite = process.env.REACT_APP_ENABLE_SITE

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title}>
          Sign In For FitBook
        </Typography>
        <form onSubmit={e => e.preventDefault() && false}>
          <UserPass
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            enablePassword={true}
            setValidEmail={setValidEmail}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={login}
            disabled={
              !email.length || !password.length || validEmail || enableSite
            }
          >
            Log In
          </Button>
          {incorrectDetails && (
            <Alert severity="error">
              Either Incorrect Email Or Password, Try Again!
            </Alert>
          )}
          <Grid container>
            <Grid item xs>
              <Link
                href="/forgotten-password"
                variant="body2"
                className={classes.text}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2" className={classes.text}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )

  async function login() {
    const loginResponse = await Firebase.login(email, password)
    !loginResponse ? setIncorrectDetails(true) : history.push("/")
  }
}
