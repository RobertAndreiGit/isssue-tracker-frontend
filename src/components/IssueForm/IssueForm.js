import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import {
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core"
import Axios from "axios"
import { BASE_URL, categories, priorities, stages } from "../../config"

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

export default function IssueForm({ boardId }) {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const history = useHistory()
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [label, setLabel] = useState("")
  const [labelColour, setLabelColour] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [stageId, setStageId] = useState("")
  const [priorityId, setPriorityId] = useState("")
  const [storyPoints, setStoryPoints] = useState("")
  const [username, setUsername] = useState("")

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (event) => {
    Axios.post(`${BASE_URL}/board/issues/create`, {
      method: "POST",
      title: title,
      text: text,
      label: label,
      labelColour: labelColour,
      categoryId: categoryId,
      stageId: stageId,
      priorityId: priorityId,
      storyPoints: storyPoints,
      boardId: boardId,
      username: username,
    }).then(() => {
      history.go(0)
    })

    event.preventDefault()
  }

  return (
    <div>
      <Button type="button" onClick={handleOpen}>
        New Issue
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <Typography variant="h5">Create a new issue</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="text"
              label="Text"
              name="text"
              autoFocus
              value={text}
              onChange={(ev) => setText(ev.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="label"
              label="Label"
              name="label"
              autoFocus
              value={label}
              onChange={(ev) => setLabel(ev.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="labelColour"
              label="Label Color"
              name="labelColour"
              autoFocus
              value={labelColour}
              onChange={(ev) => setLabelColour(ev.target.value)}
            />
            <FormControl variant="outlined" fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryId}
                onChange={(ev) => setCategoryId(ev.target.value)}
                label="Category"
              >
                {categories.map((val, index) => (
                  <MenuItem value={val.id} key={index}>
                    {val.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth required>
              <InputLabel>Stage</InputLabel>
              <Select
                value={stageId}
                onChange={(ev) => setStageId(ev.target.value)}
                label="Stage"
              >
                {stages.map((val, index) => (
                  <MenuItem value={val.id} key={index}>
                    {val.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth required>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priorityId}
                onChange={(ev) => setPriorityId(ev.target.value)}
                label="Priority"
              >
                {priorities.map((val, index) => (
                  <MenuItem value={val.id} key={index}>
                    {val.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="storyPoints"
              label="Story Points"
              name="storyPoints"
              autoFocus
              value={storyPoints}
              onChange={(ev) => setStoryPoints(ev.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="assignedTo"
              label="Assigned To"
              name="assignedTo"
              autoFocus
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  )
}
