import { createContext } from 'react';

import { ToastContextProps } from '@interfaces/App';
import { toast } from 'react-toastify';


const ToastContext = createContext<ToastContextProps>({
  notify: (msg: string) => {
    toast(msg);
  },
});

export default ToastContext;
