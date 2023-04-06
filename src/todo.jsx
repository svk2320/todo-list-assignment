import React, { useState } from "react";
import { Table, Input, Tag, Space } from "antd";
// import "antd/dist/antd.css";
// import "./Todo.css";

const Todo = () => {
  const [tasks, setTasks] = useState([
    { id: 1, task: "Task 1", tags: ["Tag1", "Tag2"] },
    { id: 2, task: "Task 2", tags: ["Tag1", "Tag3"] },
    { id: 3, task: "Task 3", tags: ["Tag2", "Tag3"] },
  ]);

  const [editingTask, setEditingTask] = useState(null);
  const [editingTag, setEditingTag] = useState(null);

  const handleTaskChange = (e, taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, task: e.target.value };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleTagChange = (e, taskId, tagIndex) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedTags = [...task.tags];
        updatedTags[tagIndex] = e.target.value;
        return { ...task, tags: updatedTags };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleAddTag = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, tags: [...task.tags, ""] };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTag = (taskId, tagIndex) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedTags = [...task.tags];
        updatedTags.splice(tagIndex, 1);
        return { ...task, tags: updatedTags };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId) => {
    setEditingTask(taskId);
  };

  const handleEditTag = (taskId, tagIndex) => {
    setEditingTag({ taskId, tagIndex });
  };

  const handleSaveTask = () => {
    setEditingTask(null);
  };

  const handleSaveTag = () => {
    setEditingTag(null);
  };

  const columns = [
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleTaskChange(e, record.id)}
          onBlur={handleSaveTask}
          onPressEnter={handleSaveTask}
          className={editingTask === record.id ? "editing" : ""}
        />
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags, record) => (
        <>
          {tags.map((tag, index) => (
            <Tag
              key={index}
              closable
              onClose={() => handleDeleteTag(record.id, index)}
              onClick={() => handleEditTag(record.id, index)}
              className={
                editingTag &&
                editingTag.taskId === record.id &&
                editingTag.tagIndex === index
                  ? "editing"
                  : ""
              }
            >
              {editingTag &&
              editingTag.taskId === record.id &&
              editingTag.tagIndex === index ? (
                <Input
                  value={tag}
                  onChange={(e) => handleTagChange(e, record.id, index)}
                  onBlur={handleSaveTag}
                  onPressEnter={handleSaveTag}
                />
              ) : (
                tag
              )}
            </Tag>
          ))}
          {editingTag && editingTag.taskId === record.id && (
            <Tag
              onClick={() => handleAddTag(record.id)}
              className="add-tag-btn"
            >
              + Add Tag
            </Tag>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="Todo">
      <h1>To-Do List</h1>
      <Table
        dataSource={tasks}
        columns={columns}
        rowKey="id"
        pagination={false}
        bordered
        components={{
          body: {
            cell: EditableCell,
          },
        }}
      />
    </div>
  );
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "tag" ? (
      <Tag onClick={() => {}} className={editing ? "editing" : ""}>
        {children}
      </Tag>
    ) : (
      <Input
        value={children}
        onChange={() => {}}
        className={editing ? "editing" : ""}
      />
    );

  return (
    <td {...restProps}>{editing ? <Space>{inputNode}</Space> : children}</td>
  );
};

export default Todo;
