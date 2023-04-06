import React, { useState } from "react";
import {
  Typography,
  Table,
  Input,
  Button,
  Space,
  DatePicker,
  Tag,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import data from "./data";

import "./todo-list.styles.css";

const { Option } = Select;
const { Title } = Typography;

const TodoList = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTag, setNewTag] = useState("");
  const [tasks, setTasks] = useState(data);
  const [dueDate, setDueDate] = useState(null);
  const [tags, setTags] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleNewTitleChange = (e) => {
    setNewTitle(e.target.value.slice(0, 100));
  };

  const handleNewDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  const handleNewTagChange = (e) => {
    setNewTag(e.target.value);
  };

  const handleAddTask = () => {
    const newTaskObj = {
      key: Date.now(),
      task: newDescription,
      title: newTitle,
      timestamp: new Date().toLocaleString(),
      dueDate: dueDate,
      tags: [newTag.toLowerCase()],
      status: "OPEN",
      editable: true,
    };
    setTags([newTag.toLowerCase()]);
    setTasks([...tasks, newTaskObj]);
    setNewTitle("");
    setNewDescription("");
    setNewTag("");
    setDueDate(null);
  };

  const handleStatusChange = (key, value) => {
    const updatedTasks = tasks.map((task) => {
      if (task.key === key) {
        return {
          ...task,
          status: value,
        };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };

  const handleChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleDelete = (key) => {
    const filteredTasks = tasks.filter((task) => task.key !== key);
    setTasks(filteredTasks);
  };

  const handleEdit = (record) => {
    setEditingKey(record.key);
  };

  const handleSave = (key) => {
    const updatedTasks = tasks.map((task) => {
      if (task.key === key) {
        return { ...task, editing: false };
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditingKey("");
  };

  const handleCancel = () => {
    setEditingKey("");
  };

  const handleTaskChange = (title, key, value) => {
    const updatedTasks = tasks.map((task) => {
      if (task.key === key && title === "description") {
        return { ...task, description: value };
      } else if (task.key === key && title === "tags") {
        return { ...task, tags: value };
      } else if (task.key === key && title === "task") {
        return { ...task, task: value };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDueDateUpdate = (key, date) => {
    const updatedTasks = tasks.map((task) => {
      if (task.key === key) {
        return {
          ...task,
          dueDate: date,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredTasks = tasks.filter((todo) =>
    todo.task.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredTags = () => {
    const tagsInArr =
      tags.indexOf(",") && typeof tags === "string" ? tags.split(",") : tags;
    console.log("tagsInArr", tagsInArr);

    let filteredTagsOptions = [];
    //   return { text: x, value: x };

    for (let i = 0; i < tagsInArr.length; i++) {
    filteredTagsOptions.push({
      text: tagsInArr[i],
      value: tagsInArr[i],
    });
    }
    console.log("filteredTagsOptions", [filteredTagsOptions]);
    return [filteredTagsOptions];
  };

  const columns = [
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
      editable: true,
      render: (text, record) => {
        const isEditing = record.key === editingKey;
        return isEditing ? (
          <Input
            value={text}
            onChange={(e) =>
              handleTaskChange("task", record.key, e.target.value)
            }
            onPressEnter={() => handleSave(record.key)}
            // suffix={
            //   <Space>
            //     <CheckOutlined onClick={() => handleSave(record.key)} />
            //     <CloseOutlined onClick={() => handleCancel()} />
            //   </Space>
            // }
          />
        ) : (
          text
        );
      },
      sorter: (a, b) => a.task.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      editable: true,
      render: (text, record) => {
        const isEditing = record.key === editingKey;
        return isEditing ? (
          <Input
            value={text}
            onChange={(e) =>
              handleTaskChange("description", record.key, e.target.value)
            }
            onPressEnter={() => handleSave(record.key)}
            // suffix={
            //   <Space>
            //     <CheckOutlined onClick={() => handleSave(record.key)} />
            //     <CloseOutlined onClick={() => handleCancel()} />
            //   </Space>
            // }
          />
        ) : (
          text
        );
      },
      sorter: (a, b) => a.task.localeCompare(b.name),
    },
    {
      title: "Timestamp created",
      dataIndex: "timestamp",
      key: "timestamp",
      sorter: (a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);

        return dateA - dateB;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "OPEN",
          value: "OPEN",
        },
        {
          text: "WORKING",
          value: "WORKING",
        },
        {
          text: "DONE",
          value: "DONE",
        },
        {
          text: "OVERDUE",
          value: "OVERDUE",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      width: "8px",
      render: (text, record) => (
        <Select
          defaultValue={record.status}
          onChange={(value) => handleStatusChange(record.key, value)}
          style={{ width: "108px" }}
        >
          <Option value="OPEN">OPEN</Option>
          <Option value="WORKING">WORKING</Option>
          <Option value="DONE">DONE</Option>
          <Option value="OVERDUE">OVERDUE</Option>
        </Select>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text, record) => (
        <DatePicker
          value={record.dueDate}
          onChange={(date) => handleDueDateUpdate(record.key, date)}
          placeholder="Due Date"
          style={{ marginRight: 16 }}
        />
      ),
      sorter: (a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);

        return dateA - dateB;
      },
    },
    {
      title: "Tags",
      dataIndex: "tags",
      filters: filteredTags(),
      onFilter: (value, record) => record.tags.indexOf(value) === 0,
      key: "tags",
      editable: true,
      render: (text, record) => {
        const isEditing = record.key === editingKey;
        const tags =
          text.indexOf(",") && typeof text === "string"
            ? text.split(",")
            : text;
        return isEditing ? (
          <Input
            value={text}
            onChange={(e) =>
              handleTaskChange("tags", record.key, e.target.value)
            }
            onPressEnter={() => handleSave(record.key)}
          />
        ) : (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "urgent") {
                color = "volcano";
              }

              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const isEditing = record.key === editingKey;
        return isEditing ? (
          <Space size="middle">
            <CheckOutlined onClick={() => handleSave(record.key)} />
            <CloseOutlined onClick={() => handleCancel()} />
          </Space>
        ) : (
          <Space size="middle">
            <Button onClick={() => handleEdit(record)} type="primary">
              Edit
            </Button>
            <Button onClick={() => handleDelete(record.key)} type="default">
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Title level={2} className="heading">
        ToDo List App
      </Title>
      <div className="adding-new-task-container">
        <Input
          prefix={<SearchOutlined style={{marginRight: 5}} />}
          placeholder="Search tasks"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 200, marginRight: 150 }}
        />
        <Input
          value={newTitle}
          onChange={handleNewTitleChange}
          placeholder="Add title"
          maxLength={100}
          style={{ width: 200, marginRight: 16 }}
          required
        />
        <Input
          value={newDescription}
          onChange={handleNewDescriptionChange}
          placeholder="Add description"
          style={{ width: 200, marginRight: 16 }}
          required
        />
        <DatePicker
          value={dueDate}
          onChange={handleDueDateChange}
          placeholder="Due Date"
          style={{ marginRight: 16 }}
        />
        <Input
          value={newTag}
          onChange={handleNewTagChange}
          placeholder="Add tag (optional)"
          style={{ width: 150, marginRight: 16 }}
        />
        <Button onClick={handleAddTask} type="primary">
          Add
        </Button>
      </div>
      <div className="tasks-container">
        <Table
          columns={columns}
          dataSource={filteredTasks}
          rowClassName={(record) =>
            record.key === editingKey ? "editing-row" : ""
          }
          onChange={handleChange}
          pagination={true}
        />
      </div>
    </>
  );
};

export default TodoList;
