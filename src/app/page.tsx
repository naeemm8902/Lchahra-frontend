'use client';
import Dashboard from '@/components/dashboard/dashbaord';
import Layout from '@/components/layouts/Layout';
import ProtectedRoute from '@/components/layouts/ProtectedRoute';
// import { Button } from '@/components/ui/button';
// import { useState } from 'react';

export default function Home() {
  return (
    <ProtectedRoute>
      <Layout>
        <main className="text-center overflow-auto  ">
          <Dashboard />
        </main>
      </Layout>
    </ProtectedRoute>
  );
}
