'use client';
import React, { useState } from 'react';
import project from '@/json data/projects.json';
import { Eye, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Page = () => {
  const [projects, setPorjects] = useState(project);
  return (
    <>
      <div>
        <h1 className="text-center text-3xl my-8 font-bold">YOUR PORJECTS</h1>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 m-8">
        <Link href={'/projects/create'}>
          <div className="border bg-gray-200 flex items-center justify-center h-full rounded-lg shadow-xl shadow-zinc-600 hover:scale-110 cursor-pointer">
            <div className="flex gap-4 font-bold">
              <p>Create A New project</p>
              <Plus />
            </div>
          </div>
        </Link>
        {projects.map((item, i) => {
          return (
            <div
              key={i}
              className=" border text-white bg-green-500 flex flex-col gap-4 items-center justify-center py-16 font-bold rounded-lg px-2 shadow-xl shadow-zinc-600 hover:scale-110 cursor-pointer relative"
            >
              <h1>{item.project_name}</h1>
              <p className="text-center font-normal">
                {item.project_description}
              </p>
              <div className="absolute bottom-0 right-0 flex gap-2">
                <Link href={`/projects/${item._id}`}>
                  <Button className="bg-transparent">
                    <Eye />
                  </Button>
                </Link>
                <Button
                  className="bg-transparent hover:bg-red-500/80"
                  onClick={() => {
                    const updatedProject = [...projects]; // Create a copy of the todos array
                    updatedProject.splice(i, 1); // Remove the item at index i
                    setPorjects(updatedProject); // Update the state with the new array
                    console.log(updatedProject); // Log the updated array to the console
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
