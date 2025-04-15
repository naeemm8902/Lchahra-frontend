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
    <div className="min-h-screen flex flex-col bg-theme text-theme rounded-xl">
      <div className="flex-1 overflow-y-auto p-6">
        <FlexboxGrid justify="space-between" align="middle" className="mb-8">
          <FlexboxGrid.Item as={Col} xs={24} md={12} className="mb-4 md:mb-0">
            <div className="flex items-center gap-4">
              <div className="bg-primary-theme text-theme font-bold text-xl p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <MdDashboard className="text-2xl text-theme" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary-theme">Lhahra Workspace</h2>
                <p className="text-sm text-secondary-theme mt-1">
                  Premium Workspace • 14 days Free trial.
                </p>
              </div>
            </div>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item as={Col} xs={24} md={12} className="text-right">
            <Button
              appearance="primary"
              className="bg-primary-theme text-theme border-0 px-5 py-3 rounded-xl font-medium shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
              startIcon={<MdGroupAdd className="text-xl text-theme" />}
              onClick={() => {
                handleAddWorkspaceClick();
              }}
            >
              <span className="hidden md:inline">Create New Workspace</span>
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <h1 className="text-primary-theme text-2xl mb-4 text-left">Your workspace </h1>

        {/*Your Workspace Metrics */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {workspaces?.myWorkspaces?.map((workspace: any, index: number) => (
            <Link
              href={'/workspace'}
              key={index}
              onClick={() => {
                selectWorkspace(workspace);
              }}
            >
              <div className="relative backdrop-blur-sm rounded-xl p-4 transition-all cursor-pointer group border border-gray-700/50 hover:border-blue-400/30 bg-secondary-theme text-theme">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary-theme mb-1">
                      {workspace.name}
                    </p>
                    <h3 className="text-lg font-semibold text-theme">
                      Project Phase {index + 1}
                    </h3>
                  </div>
                  <MdWorkspaces className="text-2xl text-primary-theme" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-theme">Progress</span>
                    <span className="text-theme">{1 * 25}%</span>
                  </div>
                  <div className="w-full bg-primary-theme/20 rounded-full h-2 mt-1">
                    <div
                      className="bg-primary-theme h-2 rounded-full"
                      style={{ width: `${1 * 25}%` }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <h1 className="text-primary-theme text-2xl mb-4 text-left">Join workspace </h1>

        {/*Join Workspace Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {workspaces?.guestWorkSpaces?.map((workspace: any, index: number) => (
            <div
              key={index}
              className="relative backdrop-blur-sm rounded-xl p-4 transition-all cursor-pointer group border border-gray-700/50 hover:border-blue-400/30 bg-secondary-theme text-theme"
              onClick={() => {
                selectWorkspace(workspaces);
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-theme mb-1">{workspace.name}</p>
                  <h3 className="text-lg font-semibold text-theme">
                    Project Phase {index + 1}
                  </h3>
                </div>
                <MdWorkspaces className="text-2xl text-primary-theme" />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary-theme">Progress</span>
                  <span className="text-theme">{(index + 1) * 25}%</span>
                </div>
                <div className="w-full bg-primary-theme/20 rounded-full h-2 mt-1">
                  <div
                    className="bg-primary-theme h-2 rounded-full"
                    style={{ width: `${(index + 1) * 25}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          appearance="primary"
          className="!rounded-full !p-4 bg-primary-theme text-theme shadow-2xl hover:shadow-3xl transition-all hover:scale-110"
        >
          <MdGroupAdd className="text-2xl text-theme" />
        </Button>
      </div>
      <div
        className={`fixed w-full h-screen top-0 left-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
          showAddWorkspaceForm ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <AddWorkSpaceForm
          handleCloseForm={handleCloseForm}
          getMyWorkspaces={getMyWorkspaces}
        />
      </div>
    </div>
  );
}
