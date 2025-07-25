// components/ui/RightDrawerModal.tsx
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function RightDrawerModal({ open, onClose, title, children }: Props) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
      <div className="fixed inset-0 flex justify-end">
        <Dialog.Panel className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
            <button onClick={onClose}>
              <X className="text-gray-500 hover:text-gray-800 dark:text-gray-300" />
            </button>
          </div>
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
