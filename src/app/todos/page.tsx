'use client';
import React, { useEffect, useState } from 'react';
// import todo from "@/json data/todo.json";
import { Eye, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

const Page = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    async function getTodos() {
      const loginUserString = sessionStorage.getItem('loginUser');
      const loginUser: any = JSON.parse(loginUserString);
      console.log(loginUser);
      try {
        const response: any = await axios.get(
          'http://localhost:4001/api/todos/user/' + loginUser?._id,
        );

        console.log('Success:', response?.data);
        setTodos(response.data);
      } catch (error: any) {
        console.error(
          'Error:',
          error.response ? error.response.data : error.message,
        );
      }
    }
    getTodos();
  }, []);
  return (
    <>
      <div>
        <h1 className="text-center text-3xl my-8 font-bold">YOUR TODOS</h1>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 m-8">
        <Link href={'/todos/create'}>
          <div className="border bg-gray-200 flex items-center justify-center h-full rounded-lg hover:shadow-md hover:shadow-black cursor-pointer">
            <div className="flex gap-4 font-bold">
              <p>Create A New todos</p>
              <Plus />
            </div>
          </div>
        </Link>
        {todos.map((item, i) => {
          const date = new Date(item?.createdAt); // Convert string to Date object
          return (
            <div
              key={i}
              className="border text-white bg-purple-500 flex flex-col gap-4 items-center justify-center py-16 font-bold rounded-lg  hover:shadow-md hover:shadow-black cursor-pointer relative"
            >
              <div>Creaeted On</div>
              <div className="flex">
                <p>{date.getUTCFullYear()}</p>
                <p>/{date.getUTCMonth() + 1}</p>
                <p>/{date.getUTCDate()} </p>
                <p className="pl-4">
                  time : {date.getUTCHours()}:{date.getUTCMinutes()}:
                  {date.getUTCSeconds()}
                </p>
              </div>
              <div className="absolute bottom-0 right-0 flex gap-2">
                <Link href={`/todos/${item._id}`}>
                  <Button className="bg-transparent">
                    <Eye />
                  </Button>
                </Link>
                <Button
                  className="bg-transparent"
                  onClick={() => {
                    const updatedTodos = [...todos]; // Create a copy of the todos array
                    updatedTodos.splice(i, 1); // Remove the item at index i
                    setTodos(updatedTodos); // Update the state with the new array
                    console.log(updatedTodos); // Log the updated array to the console
                  }}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Page;
