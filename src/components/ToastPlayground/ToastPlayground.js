import React from 'react';

import Button from '../Button';

import Toast from '../Toast';

import ToastShelf from '../ToastShelf';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState('notice');
  const [isRendered, setIsRendered] = React.useState(false); 

  const [toasts, setToasts] = React.useState([]); 

  // pass the function to the component so it's editable from a lower level 
  function handleDismiss(id) {
    const newToasts = toasts.filter((toast) => {
      return toast.id != id;
    });
    setToasts(newToasts);
    // find and remove that toast from the shelf 
  }

  function handleAddToast(toastMessage, toastVariant) {
    const newToast = {message: toastMessage, variant: toastVariant, id: Math.random()};
    const newToasts = [...toasts, newToast];
    setToasts(newToasts);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {/* {isRendered && <Toast variant={variant} handleDismiss={handleDismiss}>{message}</Toast>} */}
      <ToastShelf toasts={toasts} handleDismiss={handleDismiss}></ToastShelf>

      <form onSubmit={event => {
        event.preventDefault();
        handleAddToast(message, variant);
        setMessage('');
        setVariant('notice');

      }}>
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: 'baseline' }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea 
                id="message" 
                key="message"
                className={styles.messageInput} 
                value={message}
                onChange={event => {
                  setMessage(event.target.value)
                }}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} key='variants'>Variant</div>
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`} key={Math.random()}
            >

              {
                VARIANT_OPTIONS.map(option => (

                  <label htmlFor={'variant-' + option}>
                    <input
                      id={'variant-' + option}
                      key={'variant-' + option}
                      type="radio"
                      name="variant"
                      value={option}
                      onChange={event => {
                        setVariant(event.target.value);
                      }}
                      checked={option === variant}
                    />
                    {option}
                  </label>
                ))
              }
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
            >
              {/* TODO the toast should be displayed on submit and closed on x */}
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
