'use client';
import { Ellipsis } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TodoListInterface {
  _id: string;
  Date: string;
  user_id: string;
  tods: Todo[];
}

interface Todo {
  task: string;
  status: boolean;
  todo_id: string;
}

const Page = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const params = useParams<{ id: string }>();
  const [todoList, setTodoList] = useState<TodoListInterface | null>(null);

  useEffect(() => {
    async function getTodo() {
      try {
        const response = await axios.get(
          `http://localhost:4001/api/todos/${params.id}`,
        );
        setTodoList(response.data);
        setTodos(response.data.tods);
      } catch (error: any) {
        console.error(
          'Error:',
          error.response ? error.response.data : error.message,
        );
      }
    }
    if (params.id) {
      getTodo();
    }
  }, [params.id]);

  const addTodo = async (task: string) => {
    try {
      const response = await axios.post(
        `http://localhost:4001/api/todos/${params.id}`,
        { task, todoId: params.id },
      );
      setTodoList(response.data);
      setTodos(response.data.tods);
    } catch (error: any) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  const incompleteTodos = todos.filter((todo) => !todo.status);
  const completedTodos = todos.filter((todo) => todo.status);

  return (
    <main className="flex overflow-hidden flex-col pb-32 text-black bg-white max-md:pb-24">
      <AddTodoForm setTodos={setTodos} todos={todos} addTodo={addTodo} />
      <section className="flex flex-wrap gap-4 justify-center p-8 mt-4 min-h-[765px] max-md:px-5">
        <TodoList todos={incompleteTodos} title="Todos" />
        <CompletedTodoList todos={completedTodos} title="Completed Todos" />
      </section>
    </main>
  );
};

export default Page;
interface AddTodoFormProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (task: string) => Promise<void>;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({
  todos,
  setTodos,
  addTodo,
}) => {
  const [newTodo, setNewTodo] = useState('');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    const newTodoItem: Todo = {
      task: newTodo,
      status: false,
      todo_id: Date.now().toString(),
    };
    addTodo(newTodo);

    setNewTodo(''); // Clear the input field
  }

  return (
    <form
      className="flex flex-wrap gap-4 justify-center items-center py-8 w-full max-md:max-w-full"
      onSubmit={onSubmit}
    >
      <Input
        type="text"
        className="max-w-96 w-[90%]"
        placeholder="Enter new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <Button
        type="submit"
        className="gap-2 self-stretch px-4 py-2 my-auto bg-cyan-400 rounded-lg text-sm"
      >
        Add Todo
      </Button>
    </form>
  );
};

interface TodoListProps {
  todos: Todo[];
  title: string;
}

const TodoList: React.FC<TodoListProps> = ({ todos, title }) => {
  return (
    <section className="flex flex-col flex-1 shrink px-8 py-4 basis-0 bg-slate-100 min-w-[240px] max-md:px-5 max-md:max-w-full">
      <h2 className="overflow-hidden gap-2.5 self-center p-2 text-4xl font-bold whitespace-nowrap bg-white rounded-lg">
        {title}
      </h2>
      {todos.length > 0 ? (
        todos.map((todo, index) => <TodoItem key={index} text={todo.task} />)
      ) : (
        <p className="text-gray-600">No tasks found.</p>
      )}
    </section>
  );
};

interface TodoItemProps {
  text: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ text }) => {
  return (
    <div className="flex flex-wrap gap-10 justify-between items-center p-2.5 mt-7 w-full rounded-lg bg-slate-300 max-md:max-w-full">
      <div className="self-stretch my-auto">{text}</div>
      <Ellipsis />
    </div>
  );
};

interface CompletedTodoListProps {
  todos: Todo[];
  title: string;
}

const CompletedTodoList: React.FC<CompletedTodoListProps> = ({
  todos,
  title,
}) => {
  return (
    <section className="flex flex-col flex-1 shrink px-8 py-4 basis-0 bg-neutral-400 min-h-[200px] min-w-[240px] max-md:px-5 max-md:max-w-full">
      <h2 className="overflow-hidden gap-2.5 self-center p-2 text-4xl font-bold bg-white rounded-lg">
        {title}
      </h2>
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <CompletedTodoItem key={index} text={todo.task} />
        ))
      ) : (
        <p className="text-gray-600">No tasks found.</p>
      )}
    </section>
  );
};

interface CompletedTodoItemProps {
  text: string;
}

const CompletedTodoItem: React.FC<CompletedTodoItemProps> = ({ text }) => {
  return (
    <div className="flex flex-wrap gap-10 justify-between items-center p-2.5 mt-7 w-full bg-green-200 rounded-lg max-md:max-w-full">
      <div className="self-stretch my-auto">{text}</div>
      <Ellipsis />
    </div>
  );
};
