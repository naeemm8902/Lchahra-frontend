"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import useApiCall from "@/helpers/useApiCall";
import { useWorkspace } from '@/context/selectedWorkspaceContext';

const InviteMembers = () => {
  const token = sessionStorage.getItem('accessToken');
  const [email, setEmail] = useState('');
  const [invitedMembers, setInvitedMembers] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { error, isLoading, request } = useApiCall();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { selectedWorkspace } = useWorkspace();

  const handleInvite = () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (invitedMembers.includes(email)) {
      setErrorMessage('This email has already been invited');
      return;
    }

    setInvitedMembers([...invitedMembers, email]);
    setSuccessMessage(`${email} added successfully!`);
    setEmail('');
  };

  const handleRemove = (emailToRemove: string) => {
    setInvitedMembers(
      invitedMembers.filter((email) => email !== emailToRemove),
    );
  };

  const handleSubmit = async () => {
    const token = sessionStorage.getItem('accessToken');
    try {
      const res = await request({
        method: 'POST',
        url: 'invitations/send',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          emails: invitedMembers,
          invitedWorkspace: selectedWorkspace._id,
        },
      });
      console.log('Invited Members:', invitedMembers);
      setSuccessMessage('Invitations sent successfully!');
      setInvitedMembers([]);
    } catch (err: any) {
      console.log('Error in send invitation:', err);
      alert('Error in send invitation');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              Team Invitations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
                placeholder="name@company.com"
                className="flex-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleInvite}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Invite
                </Button>
              </motion.div>
            </div>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mb-4"
              >
                <XCircle className="w-5 h-5" />
                {errorMessage}
              </motion.div>
            )}

            {successMessage && !errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg mb-4"
              >
                <CheckCircle className="w-5 h-5" />
                {successMessage}
              </motion.div>
            )}

            {invitedMembers.length > 0 && (
              <>
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span>Invited Members</span>
                    <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                      {invitedMembers.length}
                    </span>
                  </h3>
                  <ul className="space-y-2">
                    {invitedMembers.map((member, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-700 font-medium">
                              {member}
                            </span>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemove(member)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3"
                  >
                    Send Invitations
                  </Button>
                </motion.div>
              </>
            )}

            {invitedMembers.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                No invited members yet. Add emails above to get started.
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default InviteMembers;