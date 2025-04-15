import React from 'react'
import { useWorkspace } from '@/context/selectedWorkspaceContext';

const page = () => {
  const { selectedWorkspace } = useWorkspace;
  console.log(selectedWorkspace)
  return (
    <div>Member list page</div>
  )
}

export default page