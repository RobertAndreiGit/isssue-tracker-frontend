import React, { useEffect, useState } from "react"
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core"
import Axios from "axios"
import { useHistory } from "react-router-dom"
import { Redirect } from "react-router-dom"

import BoardIssues from "../../components/BoardIssues/BoardIssues"
import NavBar from "../../components/NavBar/NavBar"
import { BASE_URL } from "../../config"
import CreateBoard from "../../components/CreateBoard/CreateBoard"
import ManageBoard from "../../components/ManageBoard/ManageBoard"

export default function Home() {
  const [boards, setBoards] = useState([])
  const [board, setBoard] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [boardCards, setBoardCards] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [error, setError] = useState(false)

  const history = useHistory()

  const handleChange = (event) => {
    setBoard(event.target.value)
  }

  useEffect(() => {
    Axios.get(`${BASE_URL}/boards`)
      .then((res) => res.data)
      .then((data) => {
        if (typeof data === "object") setBoards(data)
      })

    Axios.get(`${BASE_URL}/current_user`)
      .then((res) => res.data)
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => {
        if (err.response.status !== 200) {
          handleError()
        }
      })
  }, [])

  useEffect(() => {
    console.log(boards.length)
    console.log(currentUser)
    if (boards && currentUser) {
      setIsLoading(false)
    }
  }, [boards, currentUser])

  useEffect(() => {
    if (board?.id)
      Axios.get(`${BASE_URL}/board/${board.id}/issues`)
        .then((res) => res.data)
        .then((data) => {
          if (typeof data === "object") setBoardCards(data)
        })
  }, [board])

  const handleDelete = () => {
    Axios.delete(`${BASE_URL}/board/${board.id}`, {
      method: "DELETE",
    }).then(() => {
      history.go(0)
    })
  }

  const handleError = () => {
    setError(true)
  }

  if (error) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <NavBar />
      {isLoading && <CircularProgress />}
      <CreateBoard />
      {boards?.length > 0 && !isLoading ? (
        <>
          <FormControl variant="outlined">
            <InputLabel>Board</InputLabel>
            <Select value={board} onChange={handleChange} label="Board">
              {boards.map((val, index) => (
                <MenuItem value={val} key={index}>
                  {val.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {board && (
            <>
              <Button
                type="button"
                onClick={handleDelete}
                variant="contained"
                color="primary"
              >
                Delete
              </Button>
              {board.user?.username === currentUser?.username && (
                <ManageBoard boardId={board.id} currentUser={currentUser} />
              )}
              <BoardIssues cards={boardCards} boardId={board.id} />
            </>
          )}
        </>
      ) : (
        <Typography variant="subtitle1">No boards, start by making one</Typography>
      )}
    </div>
  )
}
