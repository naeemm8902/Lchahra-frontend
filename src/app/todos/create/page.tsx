'use client';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import React, { useState } from 'react';

// Define the type for a todo item
interface Todo {
  task: string;
  completed: boolean;
}

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // State to store the list of todos
  const [newTodo, setNewTodo] = useState<string>(''); // State to store the input value

  // Function to add a new todo
  const addTodo = (): void => {
    if (newTodo.trim() === '') return; // Prevent adding empty todos
    setTodos([...todos, { task: newTodo, completed: false }]);
    setNewTodo(''); // Clear the input after adding
  };

  // Function to remove a todo by index
  const removeTodo = (index: number): void => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1); // Remove the item at the given index
    setTodos(updatedTodos); // Update the state
  };

  // Function to toggle the completion status of a todo
  const toggleComplete = (index: number): void => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos); // Update the state
  };

  async function handleSubmit() {
    const loginUserString = sessionStorage.getItem('loginUser');
    const loginUser: any | null = JSON.parse(loginUserString || null);
    console.log(loginUser);
    try {
      const response = await axios.post('http://localhost:4001/api/todos', {
        user_id: loginUser._id,
        tods: todos,
      });

      console.log('Success:', response.data);

      toast({
        description: 'Todo posted successfully!',
      });
    } catch (error: any) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message,
      );
      toast({
        variant: 'destructive',
        description: `error: ${error}`,
      });
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      {/* Input field to add a new todo */}
      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new task"
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Todo
        </button>
      </div>

      {/* List of todos */}
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`flex items-center justify-between mb-2 p-2 border rounded ${todo.completed ? 'bg-green-100' : ''}`}
          >
            <span
              onClick={() => toggleComplete(index)}
              className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}
            >
              {todo.task}
            </span>
            <button
              onClick={() => removeTodo(index)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Button onClick={handleSubmit}>Save</Button>
    </div>
  );
};

export default TodoPage;
