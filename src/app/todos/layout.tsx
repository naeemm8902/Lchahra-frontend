import Layout from '@/components/layouts/Layout';
import ProtectedRoute from '@/components/layouts/ProtectedRoute';
import { LoginProvider } from '@/context/LoginContext';
import React from 'react';

const TodoLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
};

export default TodoLayout;
