import React from 'react';

export const MembersManagementPanel = () => (
  <div className="w-full max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-bold mb-6 text-blue-900">Members Management</h2>
    <div className="mb-8">
      <h3 className="font-semibold mb-2">Actions</h3>
      <ul className="space-y-2">
        <li className="p-3 rounded bg-blue-50 flex items-center justify-between">
          <span>Invite Members</span>
          <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5">/workspace/members/invite</span>
        </li>
        <li className="p-3 rounded bg-blue-50 flex items-center justify-between">
          <span>View Members</span>
          <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5">/workspace/members/list</span>
        </li>
        <li className="p-3 rounded bg-blue-50 flex items-center justify-between">
          <span>Pending Invitations</span>
          <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5">/workspace/members/invitations</span>
        </li>
      </ul>
    </div>
  </div>
);
