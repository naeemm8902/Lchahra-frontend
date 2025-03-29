'use client';
import React, { useState } from 'react';

// Define types for a project and task
interface Task {
  task_name: string;
  description: string;
  state: string;
}

interface Project {
  project_name: string;
  project_description: string;
  tasks: Task[];
}

const CreateProjectPage: React.FC = () => {
  const [project, setProject] = useState<Project>({
    project_name: '',
    project_description: '',
    tasks: [],
  });

  const [task, setTask] = useState<Task>({
    task_name: '',
    description: '',
    state: '',
  });

  // Function to handle input changes for project fields
  const handleProjectChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle input changes for task fields
  const handleTaskChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  // Function to add a new task to the project
  const addTask = (): void => {
    setProject({
      ...project,
      tasks: [...project.tasks, task],
    });
    setTask({ task_name: '', description: '', state: '' }); // Clear task input fields after adding
  };

  // Function to submit the project (you can add API calls here)
  const submitProject = (): void => {
    console.log('Project submitted:', project);
    // Handle project submission logic (e.g., API call)
    setProject({ project_name: '', project_description: '', tasks: [] }); // Clear project fields after submission
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>

      <div className="mb-4">
        <input
          type="text"
          name="project_name"
          value={project.project_name}
          onChange={handleProjectChange}
          placeholder="Project Name"
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          name="project_description"
          value={project.project_description}
          onChange={handleProjectChange}
          placeholder="Project Description"
          className="border p-2 rounded w-full mb-2"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Add Task</h2>
        <input
          type="text"
          name="task_name"
          value={task.task_name}
          onChange={handleTaskChange}
          placeholder="Task Name"
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleTaskChange}
          placeholder="Task Description"
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          name="state"
          value={task.state}
          onChange={handleTaskChange}
          placeholder="Task State"
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Task
        </button>
      </div>

      <ul className="mb-4">
        {project.tasks.map((task, index) => (
          <li key={index} className="mb-2">
            <strong>{task.task_name}:</strong> {task.description} ({task.state})
          </li>
        ))}
      </ul>

      <button
        onClick={submitProject}
        className="bg-green-500 text-white p-2 rounded"
      >
        Submit Project
      </button>
    </div>
  );
};

export default CreateProjectPage;
