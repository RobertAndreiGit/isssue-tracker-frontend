import { Grid, Typography } from "@material-ui/core"
import React from "react"
import { stages } from "../../config"
import BoardCard from "../BoardCard/BoardCard"
import IssueForm from "../IssueForm/IssueForm"

export default function BoardIssues({ cards, boardId }) {
  return (
    <div>
      {cards?.length === 0 && (
        <Typography variant="h5">Board empty. Start by creating an issue.</Typography>
      )}
      <IssueForm boardId={boardId} />
      {cards && (
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography variant="h5">To Do</Typography>
            {cards
              .filter((x) => x.stage.name === stages[0].name)
              .map((val, index) => (
                <BoardCard key={index} values={val} />
              ))}
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5">In Progress</Typography>
            {cards
              .filter((x) => x.stage.name === stages[1].name)
              .map((val, index) => (
                <BoardCard key={index} values={val} />
              ))}
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5">Testing</Typography>
            {cards
              .filter((x) => x.stage.name === stages[2].name)
              .map((val, index) => (
                <BoardCard key={index} values={val} />
              ))}
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5">Done</Typography>
            {cards
              .filter((x) => x.stage.name === stages[3].name)
              .map((val, index) => (
                <BoardCard key={index} values={val} />
              ))}
          </Grid>
        </Grid>
      )}
    </div>
  )
}
