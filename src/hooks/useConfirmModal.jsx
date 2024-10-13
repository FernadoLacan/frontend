import { useState } from 'react';

const useConfirmModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState(null);
  const [onCancel, setOnCancel] = useState(null);

  const showModal = (msg, onConfirmCallback, onCancelCallback) => {
    setMessage(msg);
    setOnConfirm(() => onConfirmCallback);
    setOnCancel(() => onCancelCallback);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setMessage('');
    setOnConfirm(null);
    setOnCancel(null);
  };

  const Modal = () =>
    isVisible ? (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <p>{message}</p>
          <div style={styles.buttons}>
            <button onClick={() => { if(onConfirm) onConfirm(); hideModal(); }}>Confirmar</button>
            <button onClick={() => { if(onCancel) onCancel(); hideModal(); }}>Cancelar</button>
          </div>
        </div>
      </div>
    ) : null;

  return { showModal, Modal };
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
};

export default useConfirmModal;