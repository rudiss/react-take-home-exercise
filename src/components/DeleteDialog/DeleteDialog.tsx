import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FiTrash } from "react-icons/fi";

// Cast FiTrash to a React functional component for SVG props.
const TrashIcon = FiTrash as React.FC<React.SVGProps<SVGSVGElement>>;

interface DeleteDialogProps {
  onConfirm: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = React.memo(({ onConfirm }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          data-testid="delete-trigger"
          aria-label="Delete Task"
          className="text-red-500 sm:text-[var(--secondary)] sm:hover:text-red-500"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-bold">Confirm Delete</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-600">
            Are you sure you want to delete this task?
          </Dialog.Description>
          <div className="mt-4 flex justify-end space-x-2">
            <Dialog.Close asChild>
              <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
                Cancel
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

DeleteDialog.displayName = "DeleteDialog";
export default DeleteDialog;