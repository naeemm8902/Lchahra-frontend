'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layouts/Layout';
import ProtectedRoute from '@/components/layouts/ProtectedRoute';
import { useState } from 'react';
import useApiCall from '@/helpers/useApiCall';

// Dummy Data
const invitations = [
  {
    id: '1',
    email: 'john.doe@example.com',
    invitedBy: 'Alice Johnson',
    workspace: 'Marketing Team',
    status: 'pending',
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    invitedBy: 'Bob Lee',
    workspace: 'Dev Team',
    status: 'accepted',
  },
  {
    id: '3',
    email: 'tim.brown@example.com',
    invitedBy: 'Charlie Kim',
    workspace: 'Design Studio',
    status: 'rejected',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'accepted':
      return 'bg-green-100 text-green-700';
    case 'rejected':
      return 'bg-red-100 text-red-700';
    default:
      return '';
  }
};

const Page = () => {
  const [invitations, setInvitations] = useState([
    {
      id: '1',
      email: 'john.doe@example.com',
      invitedBy: 'Alice Johnson',
      workspace: 'Marketing Team',
      status: 'pending',
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      invitedBy: 'Bob Lee',
      workspace: 'Dev Team',
      status: 'accepted',
    },
    {
      id: '3',
      email: 'tim.brown@example.com',
      invitedBy: 'Charlie Kim',
      workspace: 'Design Studio',
      status: 'rejected',
    },
  ]);
  const { request } = useApiCall();
  const fetchInvitations = async () => {
    try {
      const res = await request({
        method: 'GET',
        url: 'invitations/getJoinRequest',
      });
      console.log('Fetched invitations:', res.data);
    } catch (error) {
      console.error('Error fetching invitations:', error);
    }
  };
  return (
    <ProtectedRoute>
      <Layout>
        <main className="max-w-4xl mx-auto py-10 px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Join Invitations
          </h1>
          <div className="grid gap-6">
            {invitations.map((invitation) => (
              <Card key={invitation.id} className="shadow-sm">
                <CardHeader>
                  <CardTitle>{invitation.email}</CardTitle>
                  <CardDescription>
                    Invited by <strong>{invitation.invitedBy}</strong> to join{' '}
                    <strong>{invitation.workspace}</strong>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className={getStatusColor(invitation.status)}>
                    {invitation.status}
                  </Badge>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  {invitation.status === 'pending' && (
                    <>
                      <Button variant="outline">Reject</Button>
                      <Button>Accept</Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </Layout>
    </ProtectedRoute>
  );
};

export default Page;
