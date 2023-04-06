import React, { useState } from "react";
import { Table, Input, Button, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");

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
            onChange={(e) => handleTaskChange(record.key, e.target.value)}
            onPressEnter={() => handleSave(record.key)}
            suffix={
              <Space>
                <CheckOutlined onClick={() => handleSave(record.key)} />
                <CloseOutlined onClick={() => handleCancel()} />
              </Space>
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const isEditing = record.key === editingKey;
        return isEditing ? (
          <Space>
            <CheckOutlined onClick={() => handleSave(record.key)} />
            <CloseOutlined onClick={() => handleCancel()} />
          </Space>
        ) : (
          <Space>
            <EditOutlined onClick={() => handleEdit(record)} />
            <DeleteOutlined onClick={() => handleDelete(record.key)} />
          </Space>
        );
      },
    },
  ];

  const handleTaskChange = (key, value) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.key === key) {
        return { ...todo, task: value };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleEdit = (record) => {
    setEditingKey(record.key);
  };

  const handleSave = (key) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.key === key) {
        return { ...todo, editing: false };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditingKey("");
  };

  const handleCancel = () => {
    setEditingKey("");
  };

  const handleDelete = (key) => {
    const updatedTodos = todos.filter((todo) => todo.key !== key);
    setTodos(updatedTodos);
  };

  const handleAdd = () => {
    const newTodo = {
      key: Date.now(),
      task: "",
      editing: true,
    };
    setTodos([...todos, newTodo]);
    setEditingKey(newTodo.key);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search tasks"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: "16px" }}
      />
      <Button type="primary" onClick={handleAdd}>
        Add Task
      </Button>
      <Table
        dataSource={filteredTodos}
        columns={columns}
        pagination={false}
        rowKey="key"
        rowClassName={(record) => (record.edit ? "editing" : "")}
        bordered
      />
    </div>
  );
};

export default Todo;
