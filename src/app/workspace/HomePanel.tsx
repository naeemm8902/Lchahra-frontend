import React from 'react';

export const HomePanel = () => (
  <div className="w-full max-w-xl mx-auto bg-theme text-theme rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-bold mb-6 text-primary-theme">Welcome Home</h2>
    <div className="mb-8">
      <h3 className="font-semibold mb-2 text-primary-theme">Quick Links</h3>
      <ul className="space-y-2">
        <li className="p-3 rounded bg-secondary-theme flex items-center justify-between">
          <span>Dashboard</span>
          <span className="text-xs bg-primary-theme text-white rounded px-2 py-0.5">Overview</span>
        </li>
        <li className="p-3 rounded bg-secondary-theme flex items-center justify-between">
          <span>Recent Activity</span>
          <span className="text-xs bg-primary-theme text-white rounded px-2 py-0.5">Updates</span>
        </li>
      </ul>
    </div>
  </div>
);
