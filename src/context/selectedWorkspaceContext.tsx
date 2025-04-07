'use client';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface WorkspaceContextType {
  selectedWorkspace: any;
  selectWorkspace: (workspace: any) => void;
  clearWorkspace: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined,
);

export const WorkspaceProvider = ({ children }: { children: ReactNode }) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<any>(null);

  useEffect(() => {
    const storedWorkspace = sessionStorage.getItem('selectedWorkspace');
    if (storedWorkspace) {
      try {
        setSelectedWorkspace(JSON.parse(storedWorkspace)); // deserialize
        console.log(selectWorkspace);
      } catch (e) {
        console.error('Failed to parse stored workspace', e);
      }
    }
  }, []);

  const selectWorkspace = (workspace: any) => {
    setSelectedWorkspace(workspace);
    sessionStorage.setItem('selectedWorkspace', JSON.stringify(workspace)); // serialize
  };

  const clearWorkspace = () => {
    setSelectedWorkspace(null);
    sessionStorage.removeItem('selectedWorkspace');
  };

  return (
    <WorkspaceContext.Provider
      value={{
        selectedWorkspace,
        selectWorkspace,
        clearWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
