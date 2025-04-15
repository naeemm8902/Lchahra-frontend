import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Clock,
  Calendar,
  BarChart2,
  Plus,
  ChevronRight,
  ChevronDown,
  Clock8,
  RefreshCw,
  X,
  MoreVertical,
} from 'lucide-react';

// Define types
type TimerStatus = 'running' | 'paused' | 'completed';
type TimeEntry = {
  id: string;
  title: string;
  project: string;
  status: TimerStatus;
  startTime: Date;
  endTime?: Date;
  totalTime: number; // in seconds
  tags: string[];
};

export const TimeTrackingPanel = () => {
  // Demo data
  const [entries, setEntries] = useState<TimeEntry[]>([
    {
      id: '1',
      title: 'Website Development',
      project: 'Client Project A',
      status: 'running',
      startTime: new Date(Date.now() - 3600000), // Started 1 hour ago
      totalTime: 3600, // 1 hour in seconds
      tags: ['development', 'frontend'],
    },
    {
      id: '2',
      title: 'UI Design',
      project: 'Internal Tool',
      status: 'paused',
      startTime: new Date(Date.now() - 7200000), // Started 2 hours ago
      totalTime: 5400, // 1.5 hours in seconds
      tags: ['design', 'ui/ux'],
    },
    {
      id: '3',
      title: 'Meeting with Team',
      project: 'Team Collaboration',
      status: 'completed',
      startTime: new Date(Date.now() - 86400000), // Yesterday
      endTime: new Date(Date.now() - 83700000), // 45 minutes later
      totalTime: 2700, // 45 minutes in seconds
      tags: ['meeting', 'planning'],
    },
    {
      id: '4',
      title: 'Research & Analysis',
      project: 'Client Project B',
      status: 'completed',
      startTime: new Date(Date.now() - 172800000), // 2 days ago
      endTime: new Date(Date.now() - 165600000), // 2 hours later
      totalTime: 7200, // 2 hours in seconds
      tags: ['research'],
    },
  ]);

  const [activeTab, setActiveTab] = useState<'timers' | 'reports'>('timers');
  const [runningTime, setRunningTime] = useState<Record<string, number>>({});
  const [showNewTimerForm, setShowNewTimerForm] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<
    Record<string, boolean>
  >({
    'Client Project A': true,
    'Internal Tool': false,
    'Team Collaboration': false,
    'Client Project B': false,
  });

  // For the new timer form
  const [newTimer, setNewTimer] = useState({
    title: '',
    project: '',
    tags: '',
  });

  // Update running timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedRunningTime = { ...runningTime };

      entries.forEach((entry) => {
        if (entry.status === 'running') {
          updatedRunningTime[entry.id] =
            entry.totalTime +
            Math.floor((Date.now() - entry.startTime.getTime()) / 1000);
        } else {
          updatedRunningTime[entry.id] = entry.totalTime;
        }
      });

      setRunningTime(updatedRunningTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [entries]);

  // Format seconds to HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle status changes
  const toggleStatus = (id: string) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) => {
        if (entry.id === id) {
          if (entry.status === 'running') {
            return { ...entry, status: 'paused' };
          } else if (entry.status === 'paused') {
            return { ...entry, status: 'running', startTime: new Date() };
          }
        }
        return entry;
      }),
    );
  };

  // Calculate totals for reports
  const totalTimeToday = entries.reduce((acc, entry) => {
    const today = new Date().toDateString();
    const entryDate = entry.startTime.toDateString();

    if (entryDate === today) {
      return acc + (runningTime[entry.id] || entry.totalTime);
    }
    return acc;
  }, 0);

  const totalTimeWeek = entries.reduce((acc, entry) => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);

    if (entry.startTime >= startOfWeek) {
      return acc + (runningTime[entry.id] || entry.totalTime);
    }
    return acc;
  }, 0);

  // Group entries by project
  const projectGroups = entries.reduce(
    (groups, entry) => {
      if (!groups[entry.project]) {
        groups[entry.project] = [];
      }
      groups[entry.project].push(entry);
      return groups;
    },
    {} as Record<string, TimeEntry[]>,
  );

  // Create a new timer
  const handleCreateTimer = () => {
    if (newTimer.title && newTimer.project) {
      const newEntry: TimeEntry = {
        id: Date.now().toString(),
        title: newTimer.title,
        project: newTimer.project,
        status: 'paused',
        startTime: new Date(),
        totalTime: 0,
        tags: newTimer.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      setEntries((prev) => [...prev, newEntry]);
      setNewTimer({ title: '', project: '', tags: '' });
      setShowNewTimerForm(false);

      // Expand the project group
      setExpandedProjects((prev) => ({
        ...prev,
        [newTimer.project]: true,
      }));
    }
  };

  // Toggle project expansion
  const toggleProjectExpansion = (project: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [project]: !prev[project],
    }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950 rounded-3xl shadow-xl overflow-hidden border border-blue-100 dark:border-blue-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 px-6 py-5 border-b border-blue-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2">
              <Clock className="text-blue-600 dark:text-blue-400" />
              Time Tracking Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Track your productivity and manage your time efficiently
            </p>
          </div>

          <button
            onClick={() => setShowNewTimerForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Plus size={18} />
            <span>New Timer</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 px-6 border-b border-blue-100 dark:border-gray-700">
          <div className="flex">
            <button
              className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'timers'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => setActiveTab('timers')}
            >
              <Clock8 size={16} />
              Time Entries
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'reports'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => setActiveTab('reports')}
            >
              <BarChart2 size={16} />
              Reports
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* New Timer Form */}
          {showNewTimerForm && (
            <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-blue-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  Create New Timer
                </h3>
                <button
                  onClick={() => setShowNewTimerForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What are you working on?"
                    value={newTimer.title}
                    onChange={(e) =>
                      setNewTimer({ ...newTimer, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Project
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project name"
                    value={newTimer.project}
                    onChange={(e) =>
                      setNewTimer({ ...newTimer, project: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. design, research, meeting"
                    value={newTimer.tags}
                    onChange={(e) =>
                      setNewTimer({ ...newTimer, tags: e.target.value })
                    }
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleCreateTimer}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    disabled={!newTimer.title || !newTimer.project}
                  >
                    Create Timer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Timers Tab */}
          {activeTab === 'timers' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-blue-100 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                      Today
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                      <Clock size={12} className="inline mr-1" />
                      Active
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatTime(totalTimeToday)}
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-blue-100 dark:border-gray-700">
                  <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    This Week
                  </h3>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatTime(totalTimeWeek)}
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-blue-100 dark:border-gray-700">
                  <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    Total Entries
                  </h3>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {entries.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timer List */}
              <div className="space-y-4">
                {Object.keys(projectGroups).map((project) => (
                  <div
                    key={project}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-blue-100 dark:border-gray-700"
                  >
                    <div
                      className="px-4 py-3 flex justify-between items-center cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750"
                      onClick={() => toggleProjectExpansion(project)}
                    >
                      <div className="font-medium text-gray-900 dark:text-white flex items-center">
                        {expandedProjects[project] ? (
                          <ChevronDown size={18} className="mr-2" />
                        ) : (
                          <ChevronRight size={18} className="mr-2" />
                        )}
                        {project}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {projectGroups[project].length} entries
                      </div>
                    </div>

                    {expandedProjects[project] && (
                      <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {projectGroups[project].map((entry) => (
                          <div
                            key={entry.id}
                            className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="flex-1">
                              <div className="font-medium text-gray-800 dark:text-white">
                                {entry.title}
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {entry.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="text-xl font-mono font-semibold text-gray-900 dark:text-white">
                                {formatTime(
                                  runningTime[entry.id] || entry.totalTime,
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                {entry.status !== 'completed' && (
                                  <button
                                    onClick={() => toggleStatus(entry.id)}
                                    className={`p-2 rounded-full ${
                                      entry.status === 'running'
                                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50'
                                        : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                                    }`}
                                  >
                                    {entry.status === 'running' ? (
                                      <Pause size={16} />
                                    ) : (
                                      <Play size={16} />
                                    )}
                                  </button>
                                )}
                                <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                  <MoreVertical size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-blue-100 dark:border-gray-700">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                    Time Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar
                          size={18}
                          className="text-blue-600 dark:text-blue-400"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          Today
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatTime(totalTimeToday)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar
                          size={18}
                          className="text-blue-600 dark:text-blue-400"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          This Week
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatTime(totalTimeWeek)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar
                          size={18}
                          className="text-blue-600 dark:text-blue-400"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          This Month
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatTime(totalTimeWeek * 3)} {/* Mock data */}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-blue-100 dark:border-gray-700">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                    Project Breakdown
                  </h3>

                  <div className="space-y-4">
                    {Object.keys(projectGroups).map((project) => {
                      const projectTime = projectGroups[project].reduce(
                        (total, entry) =>
                          total + (runningTime[entry.id] || entry.totalTime),
                        0,
                      );

                      const percentage =
                        Math.floor((projectTime / totalTimeWeek) * 100) || 0;

                      return (
                        <div key={project} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700 dark:text-gray-300">
                              {project}
                            </span>
                            <span className="text-gray-900 dark:text-white font-medium">
                              {formatTime(projectTime)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-blue-100 dark:border-gray-700 md:col-span-2">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                    Activity History
                  </h3>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {Array.from({ length: 30 }).map((_, i) => {
                        // Mock activity data - more activity for recent days
                        const activity =
                          i < 3
                            ? Math.floor(Math.random() * 5)
                            : i < 7
                              ? Math.floor(Math.random() * 4)
                              : i < 15
                                ? Math.floor(Math.random() * 3)
                                : Math.floor(Math.random() * 2);

                        let bgColor = 'bg-gray-200 dark:bg-gray-700';
                        if (activity > 0) {
                          if (activity === 1)
                            bgColor = 'bg-blue-200 dark:bg-blue-900';
                          if (activity === 2)
                            bgColor = 'bg-blue-300 dark:bg-blue-800';
                          if (activity === 3)
                            bgColor = 'bg-blue-400 dark:bg-blue-700';
                          if (activity >= 4)
                            bgColor = 'bg-blue-500 dark:bg-blue-600';
                        }

                        return (
                          <div
                            key={i}
                            className={`w-6 h-6 rounded ${bgColor}`}
                            title={`${activity} hours`}
                          ></div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-end gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <span>Less</span>
                      <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="w-3 h-3 bg-blue-200 dark:bg-blue-900 rounded"></div>
                      <div className="w-3 h-3 bg-blue-300 dark:bg-blue-800 rounded"></div>
                      <div className="w-3 h-3 bg-blue-400 dark:bg-blue-700 rounded"></div>
                      <div className="w-3 h-3 bg-blue-500 dark:bg-blue-600 rounded"></div>
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 border-t border-blue-100 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Last synced <RefreshCw size={14} className="inline mx-1" /> 2
            minutes ago
          </p>
        </div>
      </div>
    </div>
  );
};
