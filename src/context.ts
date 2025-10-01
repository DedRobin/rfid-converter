import { createContext } from 'react';
import { toast } from 'react-toastify';

import { NotifyType } from '@customTypes/App';

interface ToastContextProps {
  notify: (msg: string, type?: NotifyType) => void;
}

const ToastContext = createContext<ToastContextProps>({
  notify: (msg: string) => {
    toast(msg);
  },
});

export { ToastContext };
