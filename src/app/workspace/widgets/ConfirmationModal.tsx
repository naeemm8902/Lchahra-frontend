import { FC } from 'react';
import { Button } from '@/components/ui/button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
        <h3 className="text-lg font-semibold text-gray-900">Are you sure?</h3>
        <p className="text-sm text-gray-500 mt-2">
          Do you want to delete this invitation?
        </p>

        <div className="mt-4 flex justify-end space-x-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="ghost" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
