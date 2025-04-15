import React from 'react';

export const TimeTrackingPanel = () => (
  <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-bold mb-6 text-blue-900">Time Tracking</h2>
    <div className="mb-8">
      <h3 className="font-semibold mb-2">Timers</h3>
      <ul className="space-y-2">
        <li className="p-3 rounded bg-blue-50 flex items-center justify-between">
          <span>Current Week</span>
          <span className="text-xs bg-green-100 text-green-700 rounded px-2 py-0.5">Running</span>
        </li>
        <li className="p-3 rounded bg-blue-50 flex items-center justify-between">
          <span>Last Week</span>
          <span className="text-xs bg-gray-200 text-gray-700 rounded px-2 py-0.5">Paused</span>
        </li>
        <li className="p-3 rounded bg-blue-50 flex items-center justify-between">
          <span>Monthly Report</span>
          <span className="text-xs bg-gray-200 text-gray-700 rounded px-2 py-0.5">Paused</span>
        </li>
      </ul>
    </div>
    <div className="bg-blue-50 rounded p-4 mb-4">
      <h4 className="font-semibold mb-2">Reports</h4>
      <div className="text-sm text-gray-700">Summary of tracked time will be shown here.</div>
    </div>
  </div>
);
