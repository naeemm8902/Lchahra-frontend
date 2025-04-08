'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWorkspace } from '@/context/selectedWorkspaceContext';
import useApiCall from '@/helpers/useApiCall';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Trash2, Mail, User, Clock, Briefcase } from 'lucide-react';
import ConfirmationModal from '../../widgets/ConfirmationModal';

const InviteMembers = () => {
  const { selectedWorkspace } = useWorkspace();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = sessionStorage.getItem('accessToken');
      setToken(storedToken);
    }
  }, []);

  const [sentInvites, setSentInvites] = useState<any[]>([]);
  const { error, isLoading, request } = useApiCall();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteIdToDelete, setInviteIdToDelete] = useState<string | null>(null);

  const fetchInvites = async () => {
    try {
      if (token) {
        const res = await request({
          method: 'GET',
          url: `invitations/get`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(res)) {
          setSentInvites(res);
        } else {
          setSentInvites([res]);
        }
      }
    } catch (err) {
      console.log('Error fetching invitations:', err);
    }
  };

  const handleDelete = (inviteId: string) => {
    setInviteIdToDelete(inviteId);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (inviteIdToDelete && token) {
      try {
        await request({
          method: 'DELETE',
          url: `invitations/${inviteIdToDelete}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Remove the deleted invite from the state
        setSentInvites(
          sentInvites.filter((inv) => inv._id !== inviteIdToDelete),
        );
        setIsModalOpen(false);
      } catch (err) {
        console.log('Error deleting invitation:', err);
        alert('Failed to delete invitation');
      }
    }
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (selectedWorkspace?._id) {
      fetchInvites();
    }
  }, [selectedWorkspace, token]);

  return (
    <div className="w-full ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Card className="shadow-xl rounded-xl border border-gray-100">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Mail className="w-6 h-6 text-indigo-600" />
              <CardTitle className="text-xl font-semibold text-gray-900">
                Pending Invitations
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {sentInvites.length > 0 ? (
              <ul className="space-y-4">
                {sentInvites.map((invite) => (
                  <motion.li
                    key={invite._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="group relative"
                  >
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-col space-y-1.5">
                            <div className="flex items-center space-x-2">
                              <Mail className="w-5 h-5 text-gray-400" />
                              <span className="text-sm font-medium text-gray-900 truncate">
                                {invite.email}
                              </span>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>
                                  {invite.invitedBy?.name || 'Unknown'}
                                </span>
                              </div>

                              <div className="flex items-center space-x-1">
                                <Briefcase className="w-4 h-4" />
                                <span>
                                  {invite.invitedWorkspace?.name || 'N/A'}
                                </span>
                              </div>

                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {new Date(
                                    invite.createdAt,
                                  ).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              invite.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : invite.status === 'accepted'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {invite.status.charAt(0).toUpperCase() +
                              invite.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(invite._id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Mail className="w-12 h-12 text-gray-300" />
                <p className="text-gray-500 font-medium">
                  No pending invitations found
                </p>
                <p className="text-sm text-gray-400 text-center">
                  Invitations you send will appear here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default InviteMembers;
