import moment from "moment";

const data = [
  {
    key: "1",
    task: "React Project",
    description: "Complete React project",
    timestamp: "2023-04-05 12:00:00",
    dueDate: moment().add(7, "days"),
    tags: ["react"],
    editable: true,
    status: "OPEN",
  },
  {
    key: "2",
    task: "New Language",
    description: "Learn new programming language",
    timestamp: "2023-04-04 10:30:00",
    dueDate: moment().add(10, "days"),
    tags: ["learning", "programming"],
    editable: true,
    status: "OPEN",
  },
  {
    key: "3",
    task: "Exercise",
    description: "Exercise for 30 minutes",
    timestamp: "2023-04-03 08:15:00",
    dueDate: null,
    tags: ["health"],
    editable: true,
    status: "OPEN",
  },
];

export default data;
