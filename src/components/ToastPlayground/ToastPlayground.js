import React from 'react';

import Button from '../Button';

import Toast from '../Toast';

import { ToastContext } from '../ToastProvider';


import ToastShelf from '../ToastShelf';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState('notice');

  const { createToast } = React.useContext(ToastContext);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf></ToastShelf>

      <form onSubmit={event => {
        event.preventDefault();
        createToast(message, variant);
        setMessage('');
        setVariant(VARIANT_OPTIONS[0]);

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
