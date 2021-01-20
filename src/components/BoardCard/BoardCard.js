import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import EditIssue from "../EditIssue/EditIssue"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid black",
    marginBottom: "5px",
    borderRadius: "10px",
  },
  inline: {
    display: "inline",
  },
}))

export default function BoardCard({ values }) {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ListItem alignItems="flex-start" className={classes.root} onClick={handleOpen}>
      <ListItemAvatar>
        <Avatar alt={values.category.name} src="." />
      </ListItemAvatar>
      <ListItemText
        primary={values.title}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {values.text}
            </Typography>
          </React.Fragment>
        }
      />
      <EditIssue values={values} />
    </ListItem>
  )
}
