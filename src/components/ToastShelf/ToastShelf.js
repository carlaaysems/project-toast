import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({ toasts, handleDismiss }) {
  return (
    <ol className={styles.wrapper} key='toasts-wrapper'>
      {
        toasts.map(toast => (
          <li className={styles.toastWrapper} key={toast['id']}>
            <Toast variant={toast['variant']} key={'toast-' + toast['id']} handleDismiss={handleDismiss} id={toast['id']}>{toast['message']}</Toast>
          </li>
        ))
      }
    </ol>
  );
}

export default ToastShelf;
