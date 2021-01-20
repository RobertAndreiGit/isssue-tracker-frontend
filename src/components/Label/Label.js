import React from "react"
import { makeStyles } from "@material-ui/core"
import { Close } from "@material-ui/icons"
import Axios from "axios"
import { BASE_URL } from "../../config"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  label: {
    border: "1px solid black",
    width: "fit-content",
    padding: "5px 10px",
    borderRadius: "10%",
    display: "flex",
  },
  closeBtn: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}))

export default function Label({ username, boardId }) {
  const classes = useStyles()
  const history = useHistory()

  const handleRemove = () => {
    Axios.delete(`${BASE_URL}/board/${boardId}/users/delete/${username}`).then(() =>
      history.go(0)
    )
  }

  return (
    <p className={classes.label}>
      {username}
      <Close className={classes.closeBtn} onClick={handleRemove} />
    </p>
  )
}
