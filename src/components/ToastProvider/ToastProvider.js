import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]); 

  function createToast(message, variant) {
    const newToast = {message: message, variant: variant, id: Math.random()};
    const nextToasts = [...toasts, newToast];
    setToasts(nextToasts);
  }

  // pass the function to the component so it's editable from a lower level 
  function dismissToast(id) {
    const newToasts = toasts.filter((toast) => {
      return toast.id != id;
    });
    setToasts(newToasts);
    // find and remove that toast from the shelf 
  }

  return <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>{ children }</ToastContext.Provider>;
}

export default ToastProvider;
