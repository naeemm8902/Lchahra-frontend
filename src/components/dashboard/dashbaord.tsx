'use client';
import { FlexboxGrid, Col, Button, Stack, Panel, Progress, Avatar, IconButton, Dropdown, Whisper, Tooltip } from 'rsuite';
import { MdGroupAdd, MdDashboard, MdWorkspaces, MdNotifications, MdSettings, MdSearch, MdCalendarToday, MdPeople, MdBookmark, MdUpdate, MdAdd, MdChevronRight } from 'react-icons/md';
import { useEffect, useState } from 'react';
import AddWorkSpaceForm from '../common/AddWorkSpaceForm';
import useApiCall from '@/helpers/useApiCall';
import Link from 'next/link';
import { useWorkspace } from '@/context/selectedWorkspaceContext';

export default function Dashboard() {
  const { error, isLoading, request } = useApiCall();
  const [showAddWorkspaceForm, setShowAddWorkspaceForm] = useState(false);
  const { selectedWorkspace, selectWorkspace, clearWorkspace } = useWorkspace();
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const userdata: any = JSON.parse(
    sessionStorage.getItem('loginUser') || 'null',
  );

  const handleAddWorkspaceClick = () => {
    setShowAddWorkspaceForm(true);
  };

  const handleCloseForm = () => {
    setShowAddWorkspaceForm(false);
  };

  const [workspaces, setWorkspaces] = useState<any>(null);

  // Get greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Set current time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      );
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 60000);

    return () => clearInterval(timeInterval);
  }, []);

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
      console.log('Workspace response:', res.guestWorkSpace);
      setWorkspaces({
        myWorkspaces: res.myWorkspaces,
        guestWorkSpaces: res.guestWorkSpace,
      });
    } catch (err: any) {
      console.log('Error creating workspace:', err);
    }
  }

  useEffect(() => {
    getMyWorkspaces();
  }, []);

  const stats = [
    { title: 'Tasks', value: '12', status: '3 due today' },
    { title: 'Meetings', value: '4', status: 'Next in 2h' },
    { title: 'Projects', value: '7', status: '2 active' },
    { title: 'Team Members', value: '16', status: '4 online' },
  ];

  const recentActivity = [
    {
      user: 'Alex Morgan',
      action: 'commented on',
      item: 'Project Roadmap',
      time: '10m ago',
    },
    {
      user: 'Taylor Kim',
      action: 'assigned you to',
      item: 'UI Design Review',
      time: '1h ago',
    },
    {
      user: 'Jamie Smith',
      action: 'mentioned you in',
      item: 'Marketing Strategy',
      time: '3h ago',
    },
  ];

  const upcomingEvents = [
    { title: 'Team Standup', time: '10:00 AM', participants: 8 },
    { title: 'Q2 Planning', time: '2:00 PM', participants: 12 },
  ];

  const onboardingSteps = [
    { id: 1, title: 'Complete your profile', completed: true },
    { id: 2, title: 'Join the team channel', completed: true },
    { id: 3, title: 'Set your working hours', completed: true },
    { id: 4, title: 'Connect integrations', completed: false },
    { id: 5, title: 'Invite team members', completed: false },
  ];

  return (
    <div className="h-screen flex flex-col bg-theme text-theme overflow-hidden">
      {/* Main content container with scroll */}
      <div className="flex-1 overflow-y-auto scroll-hide">
        <div className="p-6">
          <FlexboxGrid justify="space-between" align="middle" className="mb-6">
            <FlexboxGrid.Item as={Col} xs={24} md={12} className="mb-4 md:mb-0">
              <div className="flex items-center gap-4">
                <div className="bg-primary-theme text-theme font-bold text-xl p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <MdDashboard className="text-2xl text-theme" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary-theme">
                    Lhahra Workspace
                  </h2>
                  <p className="text-sm text-secondary-theme mt-1">
                    Premium Workspace • 14 days Free trial
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

          {/* Welcome Message */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-theme">
              {greeting} <span> </span>
              {userdata?.name}
            </h1>
            <p className="text-secondary-theme mt-1">
              Welcome to your workspace. Here's what's happening today.
            </p>
          </div>

          {/* Your Workspace Section Moved to Top */}
          <h1 className="text-primary-theme text-2xl mb-4 text-left">
            Your workspace
          </h1>

          {/* Your Workspace Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {workspaces?.myWorkspaces?.map((workspace: any, index: number) => (
              <Link
                href={'/workspace'}
                key={index}
                onClick={() => {
                  selectWorkspace(workspace);
                }}
              >
                <div className="relative backdrop-blur-sm rounded-xl p-4 transition-all cursor-pointer group border border-gray-700/50 hover:border-blue-400/30 bg-secondary-theme text-theme h-full min-h-[180px] max-h-[180px]">
                  <div className="flex items-center justify-between h-full">
                    <div className="w-full">
                      <p className="text-sm text-primary-theme mb-1 truncate">
                        {workspace.name}
                      </p>
                      <h3 className="text-lg font-semibold text-theme truncate">
                        {workspace.description || `Project Phase ${index + 1}`}
                      </h3>
                      <div className="mt-4 absolute bottom-4 left-4 right-4">
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
                    <MdWorkspaces className="text-2xl text-primary-theme flex-shrink-0" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Onboarding Progress */}
          <Panel className="bg-secondary-theme rounded-xl border border-gray-700/30 mb-8">
            <FlexboxGrid
              justify="space-between"
              align="middle"
              className="mb-4"
            >
              <FlexboxGrid.Item as={Col}>
                <h3 className="font-semibold text-theme">
                  Get started with your workspace
                </h3>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item as={Col}>
                <span className="text-sm text-primary-theme">
                  3/5 completed
                </span>
              </FlexboxGrid.Item>
            </FlexboxGrid>

            <Progress.Line
              percent={60}
              strokeColor="#3498ff"
              className="mb-6"
            />

            <FlexboxGrid justify="start" align="middle">
              {onboardingSteps.map((step) => (
                <FlexboxGrid.Item
                  as={Col}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  key={step.id}
                  className="mb-4"
                >
                  <div className="bg-secondary-theme/50 rounded-lg p-4 border border-gray-700/30 mr-2">
                    <div className="flex items-center">
                      <div
                        className={`h-8 w-8 rounded-full ${step.completed ? 'bg-green-100 text-green-600' : 'bg-primary-theme/20 text-primary-theme'} flex items-center justify-center mr-3`}
                      >
                        {step.completed ? (
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <span className="text-sm font-medium">{step.id}</span>
                        )}
                      </div>
                      <span className="text-sm">{step.title}</span>
                    </div>
                  </div>
                </FlexboxGrid.Item>
              ))}
            </FlexboxGrid>
          </Panel>

          {/* Stats Grid */}
          <FlexboxGrid justify="space-between" className="mb-8">
            {stats.map((stat, index) => (
              <FlexboxGrid.Item
                as={Col}
                xs={24}
                sm={12}
                md={6}
                key={index}
                className="mb-4"
              >
                <Panel className="h-full bg-secondary-theme rounded-xl border border-gray-700/30">
                  <p className="text-sm font-medium text-secondary-theme">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold mt-2 mb-1 text-theme">
                    {stat.value}
                  </p>
                  <p className="text-xs text-secondary-theme">{stat.status}</p>
                </Panel>
              </FlexboxGrid.Item>
            ))}
          </FlexboxGrid>

          {/* Activity and Schedule */}
          <FlexboxGrid justify="space-between" className="mb-8">
            <FlexboxGrid.Item as={Col} xs={24} lg={16} className="mb-4">
              <Panel className="h-full bg-secondary-theme rounded-xl border border-gray-700/30">
                <FlexboxGrid
                  justify="space-between"
                  align="middle"
                  className="mb-6"
                >
                  <FlexboxGrid.Item>
                    <h3 className="font-semibold text-theme">
                      Recent Activity
                    </h3>
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item>
                    <Button
                      appearance="link"
                      className="text-sm text-primary-theme"
                    >
                      View all
                    </Button>
                  </FlexboxGrid.Item>
                </FlexboxGrid>

                <Stack direction="column" spacing={8}>
                  {recentActivity.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start p-3 rounded-lg hover:bg-secondary-theme/50 cursor-pointer"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary-theme/20 text-primary-theme flex items-center justify-center mr-3">
                        <span className="font-medium">
                          {item.user
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium text-theme">
                            {item.user}
                          </span>{' '}
                          <span className="text-secondary-theme">
                            {item.action}
                          </span>{' '}
                          <span className="font-medium text-primary-theme">
                            {item.item}
                          </span>
                        </p>
                        <p className="text-xs text-secondary-theme mt-1">
                          {item.time}
                        </p>
                      </div>
                      <MdChevronRight className="h-5 w-5 text-secondary-theme" />
                    </div>
                  ))}
                </Stack>

                <Button
                  appearance="default"
                  className="w-full mt-4 text-center py-3 border border-gray-700/30 rounded-lg text-sm text-secondary-theme hover:bg-secondary-theme/50"
                >
                  Load more
                </Button>
              </Panel>
            </FlexboxGrid.Item>

            <FlexboxGrid.Item as={Col} xs={24} lg={8} className="mb-4">
              <Stack direction="column" spacing={16}>
                <Panel className="bg-secondary-theme rounded-xl border border-gray-700/30">
                  <FlexboxGrid
                    justify="space-between"
                    align="middle"
                    className="mb-6"
                  >
                    <FlexboxGrid.Item>
                      <h3 className="font-semibold text-theme">
                        Today's Schedule
                      </h3>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                      <MdCalendarToday className="h-5 w-5 text-secondary-theme" />
                    </FlexboxGrid.Item>
                  </FlexboxGrid>

                  <Stack direction="column" spacing={8}>
                    {upcomingEvents.map((event, index) => (
                      <div
                        key={index}
                        className="p-3 bg-secondary-theme/50 rounded-lg border border-gray-700/30"
                      >
                        <p className="font-medium text-theme">{event.title}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center text-secondary-theme text-sm">
                            <span>{event.time}</span>
                            <span className="mx-2">•</span>
                            <div className="flex items-center">
                              <MdPeople className="h-4 w-4 mr-1" />
                              <span>{event.participants}</span>
                            </div>
                          </div>
                          <Button
                            appearance="primary"
                            size="xs"
                            className="bg-primary-theme/20 text-primary-theme border-0 px-2 py-1 rounded"
                          >
                            Join
                          </Button>
                        </div>
                      </div>
                    ))}
                  </Stack>

                  <Button
                    appearance="link"
                    className="flex items-center justify-center w-full mt-4 text-primary-theme text-sm font-medium"
                  >
                    <MdAdd className="h-4 w-4 mr-1" />
                    <span>Add event</span>
                  </Button>
                </Panel>

                <Panel className="bg-secondary-theme rounded-xl border border-gray-700/30">
                  <h3 className="font-semibold text-theme mb-4">
                    Team Members
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {['AM', 'TK', 'JS', 'LW', 'RB'].map((initials, index) => (
                      <Avatar
                        key={index}
                        circle
                        size="sm"
                        style={{
                          background: 'var(--rs-primary-500)',
                          color: 'var(--rs-text-primary)',
                        }}
                      >
                        {initials}
                      </Avatar>
                    ))}
                    <Avatar
                      circle
                      size="sm"
                      style={{
                        background: 'var(--rs-bg-active)',
                        color: 'var(--rs-text-secondary)',
                      }}
                    >
                      +11
                    </Avatar>
                  </div>

                  <Button
                    appearance="default"
                    className="w-full py-2 border border-gray-700/30 rounded-lg text-sm text-secondary-theme hover:bg-secondary-theme/50"
                  >
                    View all members
                  </Button>
                </Panel>
              </Stack>
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <h1 className="text-primary-theme text-2xl mb-4 text-left">
            Join workspace
          </h1>

          {/* Join Workspace Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {workspaces?.guestWorkSpaces?.map(
              (workspace: any, index: number) => (
                <div
                  key={index}
                  className="relative backdrop-blur-sm rounded-xl p-4 transition-all cursor-pointer group border border-gray-700/50 hover:border-blue-400/30 bg-secondary-theme text-theme h-full min-h-[180px] max-h-[180px]"
                  onClick={() => {
                    selectWorkspace(workspaces);
                  }}
                >
                  <div className="flex items-center justify-between h-full">
                    <div className="w-full">
                      <p className="text-sm text-primary-theme mb-1 truncate">
                        {workspace.name}
                      </p>
                      <h3 className="text-lg font-semibold text-theme truncate">
                        {workspace.description || `Project Phase ${index + 1}`}
                      </h3>
                      <div className="mt-4 absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-primary-theme">Progress</span>
                          <span className="text-theme">
                            {(index + 1) * 25}%
                          </span>
                        </div>
                        <div className="w-full bg-primary-theme/20 rounded-full h-2 mt-1">
                          <div
                            className="bg-primary-theme h-2 rounded-full"
                            style={{ width: `${(index + 1) * 25}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <MdWorkspaces className="text-2xl text-primary-theme flex-shrink-0" />
                  </div>
                </div>
              ),
            )}
          </div>
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

      {/* Add Workspace Form Modal */}
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