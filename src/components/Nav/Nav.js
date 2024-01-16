import React, { useState, useEffect } from "react"
import { NavLink, withRouter } from "react-router-dom"
import "./Nav.scss"

import Firebase from "../../config/Firebase"
import Routes from "../Routes"

import IconButton from "@material-ui/core/IconButton"
import AccountCircle from "@material-ui/icons/AccountCircle"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(4)
  }
}))

const NavBar = ({ history }) => {
  const classes = useStyles()
  const [profileMenu, setProfileMenu] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const menuId = "profile-menu"

  useEffect(() => {
    Firebase.auth.onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true)
        setIsAuthenticating(false)
      } else {
        setIsAuthenticating(false)
      }
    })
  }, [])

  const handleMyProfileMenuOpen = event => {
    setProfileMenu(event.currentTarget)
  }

  const handleMyProfileMenuClose = () => {
    setProfileMenu(null)
  }

  const renderMenu = (
    <Menu
      className={classes.root}
      anchorEl={profileMenu}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(profileMenu)}
      onClose={handleMyProfileMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMyProfileMenuClose()
          history.push("/profile")
        }}
      >
        My Profile
      </MenuItem>
      <MenuItem onClick={logout}>Log Out</MenuItem>
    </Menu>
  )

  async function logout() {
    handleMyProfileMenuClose()
    await Firebase.logout()
    setLoggedIn(false)
  }

  if (isAuthenticating) {
    return null
  }

  return (
    <div>
      <div className="nav-bar">
        <ul>
          <li>
            <NavLink
              exact
              to="/"
              activeClassName="active-link"
              className="nav-links"
            >
              Home
            </NavLink>
          </li>
          {loggedIn && (
            <li>
              <NavLink
                to="/dashboard"
                activeClassName="active-link"
                className="nav-links"
              >
                Dashboard
              </NavLink>
            </li>
          )}
          {!loggedIn && (
            <li>
              <NavLink
                to="/register"
                activeClassName="active-link"
                className="nav-links"
              >
                Register
              </NavLink>
            </li>
          )}
          {loggedIn ? (
            <IconButton
              edge="end"
              aria-label="My Profile"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMyProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          ) : (
            <li>
              <NavLink
                to="/login"
                activeClassName="active-link"
                className="nav-links"
              >
                Login
              </NavLink>
            </li>
          )}
          {renderMenu}
        </ul>
      </div>
      <Routes userStatus={loggedIn} />
    </div>
  )
}

export default withRouter(NavBar)
