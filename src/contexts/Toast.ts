import { ToastContextProps } from '@interfaces/App';
import { createContext } from 'react';
import { toast } from 'react-toastify';


const ToastContext = createContext<ToastContextProps>({
  notify: (msg: string) => {
    toast(msg);
  },
});

export default ToastContext;
