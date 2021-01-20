import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import Axios from "axios"
import { Redirect } from "react-router-dom"

import { useStyles } from "./styles.js"
import { Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"

export default function Login() {
  const classes = useStyles()
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSubmit = (ev) => {
    const formData = new FormData()
    formData.append("username", user)
    formData.append("password", password)

    Axios.post("http://localhost:8080/login", formData)
      .then(() => {
        setRedirect(true)
      })
      .catch((err) => {
        if (err.response) {
          handleError()
        }
      })

    ev.preventDefault()
  }

  const handleError = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Login failed!
        </Alert>
      </Snackbar>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={user}
              onChange={(ev) => setUser(ev.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
