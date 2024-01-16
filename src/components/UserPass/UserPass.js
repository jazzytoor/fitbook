import React, { useState } from "react"

import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
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
  input: {
    color: "#eee"
  }
})

export default function UserPass({
  email,
  setEmail,
  password,
  setPassword,
  name = false,
  setName = false,
  setPasswordLongEnough = false,
  setPasswordContainNAndL = false,
  enablePassword = false,
  setAnyErrors = false,
  setValidEmail = false
}) {
  const classes = useStyles()

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    name: false
  })

  const validateTextField = (email, password) => {
    let passwordRegex = /(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*/
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let nameRegex = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/

    if (setPasswordLongEnough && setPasswordContainNAndL) {
      password.length < 8
        ? setPasswordLongEnough(false)
        : setPasswordLongEnough(true)
      !passwordRegex.test(password)
        ? setPasswordContainNAndL(false)
        : setPasswordContainNAndL(true)
    }

    if (setValidEmail) {
      emailRegex.test(email) === false
        ? setValidEmail(true)
        : setValidEmail(false)
    }

    if (emailRegex.test(email) === false) {
      return {
        email: true,
        // Maybe don't want to add vaildation here?
        password:
          !password.length < 8 && !passwordRegex.test(password) ? true : false,
        name: !nameRegex.test(name) ? true : false
      }
    } else {
      return {
        email: false,
        password:
          !password.length < 8 && !passwordRegex.test(password) ? true : false,
        name: !nameRegex.test(name) ? true : false
      }
    }
  }

  const errors = validateTextField(email, password, name)

  const textFieldValidation = field => {
    const hasError = errors[field]
    const shouldShow = touched[field]
    return hasError ? shouldShow : false
  }

  const handleTextFieldBlur = field => evt => {
    setTouched({
      [field]: true
    })
  }

  // Used to check any errors, if yes, disable the button
  if (setAnyErrors) {
    setAnyErrors(Object.keys(errors).some(x => errors[x]))
  }

  return (
    <div>
      {setPasswordContainNAndL && setPasswordLongEnough ? (
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Your Name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          type="name"
          onBlur={handleTextFieldBlur("name")}
          error={textFieldValidation("name") ? true : false}
          helperText={textFieldValidation("name") ? "Invalid Name" : null}
          classes={{
            root: classes.field
          }}
          InputProps={{
            className: classes.input
          }}
        />
      ) : null}
      <TextField
        error={textFieldValidation("email") ? true : false}
        helperText={textFieldValidation("email") ? "Invalid Email" : null}
        label="Enter Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        variant="outlined"
        onBlur={handleTextFieldBlur("email")}
        margin="normal"
        required
        fullWidth
        name="email"
        type="email"
        classes={{
          root: classes.field
        }}
        InputProps={{
          className: classes.input
        }}
      />
      {enablePassword && (
        <TextField
          error={
            setPasswordLongEnough && setPasswordContainNAndL
              ? textFieldValidation("password")
                ? true
                : false
              : null
          }
          helperText={
            setPasswordLongEnough && setPasswordContainNAndL
              ? textFieldValidation("password")
                ? "Invalid Password"
                : null
              : null
          }
          label="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          variant="outlined"
          onBlur={handleTextFieldBlur("password")}
          margin="normal"
          required
          fullWidth
          name="password"
          type="password"
          classes={{
            root: classes.field
          }}
          InputProps={{
            className: classes.input
          }}
        />
      )}
    </div>
  )
}
