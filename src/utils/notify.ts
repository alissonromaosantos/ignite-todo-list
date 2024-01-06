import { toast } from 'react-toastify';

type TypeParam = 'info' | 'success' | 'warning' | 'error' | 'default';

export function notify(message: string, type: TypeParam) {

  toast(message, {
    position: "top-right",
    type,
    theme: 'colored',
    closeButton: true,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}