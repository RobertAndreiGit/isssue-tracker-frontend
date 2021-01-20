import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import { Button, Typography } from "@material-ui/core"
import Axios from "axios"
import { BASE_URL } from "../../config"
import { useHistory } from "react-router"

import Label from "../Label/Label"
import AddUserToBoard from "../AddUserToBoard/AddUserToBoard"

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function ManageBoard({ boardId, currentUser }) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [members, setMembers] = useState([])
  const history = useHistory()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    Axios.get(`${BASE_URL}/board/${boardId}/users`)
      .then((res) => res.data)
      .then((data) => data.filter((user) => user.username !== currentUser.username))
      .then((filtered) => setMembers(filtered))
  }, [])

  return (
    <div>
      <Button type="button" onClick={handleOpen}>
        Manage users
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          {members?.length > 0 ? (
            <Typography variant="h5">These users have access to your board</Typography>
          ) : (
            <Typography variant="h5">You're alone here. Add some more people.</Typography>
          )}
          {members.map((usr, index) => (
            <Label key={index} username={usr.username} boardId={boardId} />
          ))}
          <AddUserToBoard boardId={boardId} />
        </div>
      </Modal>
    </div>
  )
}
