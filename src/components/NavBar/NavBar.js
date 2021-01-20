import React, { useState } from "react"
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core"
import axios from "axios"
import { Redirect } from "react-router-dom"

export default function NavBar() {
  const [redirect, setRedirect] = useState(false)

  const handleLogout = () => {
    axios.post("http://localhost:8080/logout").then(() => setRedirect(true))
  }

  if (redirect) {
    return <Redirect to="/login" />
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Boards</Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}
