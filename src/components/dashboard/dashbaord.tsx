'use client';
import { FlexboxGrid, Col, Button, Stack } from 'rsuite';
import { MdGroupAdd, MdDashboard, MdWorkspaces } from 'react-icons/md';
import { useEffect, useState } from 'react';
import AddWorkSpaceForm from '../common/AddWorkSpaceForm';
import useApiCall from '@/helpers/useApiCall';
import Link from 'next/link';
import { useWorkspace } from '@/context/selectedWorkspaceContext';

export default function Dashboard() {
  const { error, isLoading, request } = useApiCall();
  const [showAddWorkspaceForm, setShowAddWorkspaceForm] = useState(false);
  const { selectedWorkspace, selectWorkspace, clearWorkspace } = useWorkspace();

  const handleAddWorkspaceClick = () => {
    setShowAddWorkspaceForm(true);
  };
  const handleCloseForm = () => {
    setShowAddWorkspaceForm(false);
  };
  const [workspaces, setWorkspaces] = useState<any>(null);

  async function getMyWorkspaces() {
    const token = sessionStorage.getItem('accessToken');
    try {
      const res = await request({
        method: 'GET',
        url: 'workspace/my-workspaces',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Workspace response:', res);
      setWorkspaces({
        myWorkspaces: res.myWorkspaces,
        guestWorkSpaces: res.guestWorkspace,
      });
    } catch (err: any) {
      console.log('Error creating workspace:', err);
    }
  }
  useEffect(() => {
    getMyWorkspaces();
  }, []);
  return (
    <div className="h-screen flex flex-col  text-white rounded-xl">
      <div className="flex-1 overflow-y-auto p-6">
        <FlexboxGrid justify="space-between" align="middle" className="mb-8">
          <FlexboxGrid.Item as={Col} xs={24} md={12} className="mb-4 md:mb-0">
            <div className="flex items-center gap-4">
              <div className="bg-primary-hard text-white font-bold text-xl p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <MdDashboard className="text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-purple-300 bg-clip-text text-transparent">
                  Lhahra Workspace
                </h2>
                <p className="text-sm text-black mt-1">
                  Premium Workspace • 14 days Free trial
                </p>
              </div>
            </div>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item as={Col} xs={24} md={12} className="text-right">
            <Button
              appearance="primary"
              className="bg-gradient-to-r from-blue-800 to-purple-900 text-white border-0 
                px-5 py-3 rounded-xl font-medium shadow-lg transition-all 
                hover:scale-105 hover:shadow-xl active:scale-95"
              startIcon={<MdGroupAdd className="text-xl text-white" />}
              onClick={handleAddWorkspaceClick}
            >
              <span className="hidden md:inline">Create New Workspace</span>
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <h1 className="text-black text-2xl mb-4 text-left">Your workspace </h1>

        {/*Your Workspace Metrics */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {workspaces?.myWorkspaces?.map((workspace: any, index: number) => (
            <Link
              href={'/workspace'}
              key={index}
              onClick={() => {
                selectWorkspace(workspaces);
              }}
            >
              <div className="relative  backdrop-blur-sm rounded-xl p-4 transition-all cursor-pointer group border border-gray-700/50 hover:border-blue-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-300 mb-1">
                      {workspace.name}
                    </p>
                    <h3 className="text-lg font-semibold text-black">
                      Project Phase {index + 1}
                    </h3>
                  </div>
                  <MdWorkspaces className="text-2xl text-purple-400" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-300">Progress</span>
                    <span className="text-white">{1 * 25}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
                      style={{ width: `${1 * 25}%` }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <h1 className="text-black text-2xl mb-4 text-left">Join workspace </h1>

        {/*Join Workspace Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {workspaces?.guestWorkSpaces?.map((workspace: any, index: number) => (
            <div
              key={index}
              className="relative  backdrop-blur-sm rounded-xl p-4 transition-all cursor-pointer group border border-gray-700/50 hover:border-blue-400/30"
              onClick={() => {
                selectWorkspace(workspaces);
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-300 mb-1">{workspace.name}</p>
                  <h3 className="text-lg font-semibold text-black">
                    Project Phase {index + 1}
                  </h3>
                </div>
                <MdWorkspaces className="text-2xl text-purple-400" />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-300">Progress</span>
                  <span className="text-white">{(index + 1) * 25}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
                    style={{ width: `${(index + 1) * 25}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Floating Action Button */}
      {/* <div className="fixed bottom-6 right-6">
        <Button
          appearance="primary"
          className="!rounded-full !p-4 bg-gradient-to-r from-blue-600 to-purple-700 shadow-2xl hover:shadow-3xl transition-all hover:scale-110"
        >
          <MdGroupAdd className="text-2xl" />
        </Button>
      </div> */}
      <div
        className={`fixed w-full h-screen top-0 left-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
          showAddWorkspaceForm ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <AddWorkSpaceForm handleCloseForm={handleCloseForm} />
      </div>
    </div>
  );
}
// export default function Dashboard() {
//   return (
//     <div className="h-screen flex flex-col  text-white rounded-xl">
//       <div className="flex-1 overflow-y-auto p-6">
//         <FlexboxGrid justify="space-between" align="middle" className="mb-8">
//           <FlexboxGrid.Item as={Col} xs={24} md={12} className="mb-4 md:mb-0">
//             <div className="flex items-center gap-4">
//               <div className="bg-primary-hard text-white font-bold text-xl p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
//                 <MdDashboard className="text-2xl" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-purple-300 bg-clip-text text-transparent">
//                   Lhahra Workspace
//                 </h2>
//                 <p className="text-sm text-black mt-1">
//                   Premium Workspace • 14 days Free trial
//                 </p>
//               </div>
//             </div>
//           </FlexboxGrid.Item>

//           <FlexboxGrid.Item as={Col} xs={24} md={12} className="text-right">
//             <Button
//               appearance="primary"
//               className="bg-gradient-to-r from-blue-800 to-purple-900 text-white border-0 
//                 px-5 py-3 rounded-xl font-medium shadow-lg transition-all 
//                 hover:scale-105 hover:shadow-xl active:scale-95"
//               startIcon={<MdGroupAdd className="text-xl text-white" />}
//             >
//               <span className="hidden md:inline">Invite Collaborators</span>
//             </Button>
//           </FlexboxGrid.Item>
//         </FlexboxGrid>
//         <h1 className="text-black ">Your workspace </h1>

//         {/* Workspace Metrics */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           {[...Array(4)].map((_, index) => (
//             <div
//               key={index}
//               className="relative  backdrop-blur-sm rounded-xl p-4 transition-all cursor-pointer group border border-gray-700/50 hover:border-blue-400/30"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-blue-300 mb-1">
//                     Workspace {index + 1}
//                   </p>
//                   <h3 className="text-lg font-semibold text-black">
//                     Project Phase {index + 1}
//                   </h3>
//                 </div>
//                 <MdWorkspaces className="text-2xl text-purple-400" />
//               </div>
//               <div className="mt-4">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-blue-300">Progress</span>
//                   <span className="text-white">{(index + 1) * 25}%</span>
//                 </div>
//                 <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
//                   <div
//                     className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
//                     style={{ width: `${(index + 1) * 25}%` }}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Board Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//           <div className="group relative h-48  backdrop-blur-sm rounded-xl border-2 border-dashed border-gray-600/50 hover:border-blue-400/30 transition-all cursor-pointer flex items-center justify-center">
//             <div className="text-center space-y-2">
//               <div className="text-3xl text-black group-hover:text-purple-400 transition-colors">
//                 +
//               </div>
//               <p className="text-black group-hover:text-purple-300 transition-colors">
//                 New Board
//               </p>
//             </div>
//           </div>

//           {[
//             'Product Roadmap',
//             'Marketing Strategy',
//             'Development Sprint',
//             'Design System',
//           ].map((board, index) => (
//             <div
//               key={index}
//               className="relative h-48 backdrop-blur-sm rounded-xl overflow-hidden transition-all cursor-pointer group"
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10" />

//               <div className="p-4 h-full flex flex-col justify-between">
//                 <div>
//                   <h3 className="text-lg text-black font-semibold mb-2">
//                     {board}
//                   </h3>
//                   <div className="flex items-center space-x-2 text-black text-sm">
//                     <span>Last updated 2h ago</span>
//                     <span>•</span>
//                     <span>{index * 5 + 5} tasks</span>
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <div className="flex -space-x-2">
//                     {[...Array(3)].map((_, i) => (
//                       <div
//                         key={i}
//                         className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 border-2 border-gray-800"
//                       />
//                     ))}
//                     <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs text-black">
//                       +2
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                     <span className="text-sm text-blue-300">Active</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Floating Action Button */}
//       <div className="fixed bottom-6 right-6">
//         <Button
//           appearance="primary"
//           className="!rounded-full !p-4 bg-gradient-to-r from-blue-600 to-purple-700 shadow-2xl hover:shadow-3xl transition-all hover:scale-110"
//         >
//           <MdGroupAdd className="text-2xl" />
//         </Button>
//       </div>
//     </div>
//   );
// }
