import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import { Button, TextField, Typography } from "@material-ui/core"
import Axios from "axios"
import { BASE_URL } from "../../config"

import { useHistory } from "react-router"

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function AddUserToBoard({ boardId }) {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState("")
  const history = useHistory()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (event) => {
    Axios.post(`${BASE_URL}/board/users/add`, {
      method: "POST",
      username: username,
      boardId: boardId,
    }).finally(() => {
      history.go(0)
    })

    event.preventDefault()
  }

  const handleChange = (event) => {
    setUsername(event.target.value)
  }

  return (
    <div>
      <Button type="button" onClick={handleOpen}>
        Add User
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <Typography variant="h5">Add User</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
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
              value={username}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add User
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  )
}
