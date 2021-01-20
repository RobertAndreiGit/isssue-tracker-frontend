const BASE_URL = "http://localhost:8080/issue_tracker"

const priorities = [
  { id: 1, name: "LOW" },
  { id: 2, name: "MEDIUM" },
  { id: 3, name: "HIGH" },
]

const stages = [
  { id: 1, name: "TO_DO" },
  { id: 2, name: "IN_PROGRESS" },
  { id: 3, name: "TESTING" },
  { id: 4, name: "DONE" },
]

const categories = [
  { id: 1, name: "TASK" },
  { id: 2, name: "BUG" },
]

export { BASE_URL, priorities, stages, categories }
