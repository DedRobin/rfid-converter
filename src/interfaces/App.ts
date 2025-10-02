import { NotifyType } from '@customTypes/App';

interface ToastContextProps {
  notify: (msg: string, type?: NotifyType) => void;
}

export type { ToastContextProps };
