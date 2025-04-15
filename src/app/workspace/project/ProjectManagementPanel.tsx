import React from 'react';

export const ProjectManagementPanel = () => (
  <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-bold mb-6 text-blue-900">Project Management</h2>
    <div className="mb-8">
      <h3 className="font-semibold mb-2">Projects</h3>
      <ul className="space-y-2">
        <li className="p-3 rounded bg-blue-50 flex items-center justify-between">
          <span>Website Redesign</span>
          <span className="text-xs bg-yellow-100 text-yellow-700 rounded px-2 py-0.5">In Progress</span>
        </li>
        <li className="p-3 rounded bg-blue-50 flex items-center justify-between">
          <span>Mobile App</span>
          <span className="text-xs bg-gray-200 text-gray-700 rounded px-2 py-0.5">Todo</span>
        </li>
        <li className="p-3 rounded bg-blue-50 flex items-center justify-between">
          <span>Marketing Campaign</span>
          <span className="text-xs bg-green-100 text-green-700 rounded px-2 py-0.5">Done</span>
        </li>
      </ul>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-purple-50 rounded p-4">
        <h4 className="font-semibold mb-2">Tasks</h4>
        <ul className="list-disc list-inside text-sm text-gray-800">
          <li>Design wireframes</li>
          <li>Develop landing page</li>
          <li>Setup analytics</li>
        </ul>
      </div>
      <div className="bg-blue-50 rounded p-4">
        <h4 className="font-semibold mb-2">Calendar</h4>
        <div className="text-sm text-gray-700">No upcoming deadlines.</div>
      </div>
      <div className="bg-gray-100 rounded p-4 md:col-span-2">
        <h4 className="font-semibold mb-2">Docs</h4>
        <div className="text-sm text-gray-700">Project documentation will appear here.</div>
      </div>
    </div>
  </div>
);
