import { useEffect } from 'react';
import style from './Modal.module.css';

const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    document.documentElement.style.overflowY = 'hidden';
    window.addEventListener('keydown', handlePressKey);

    return () => {
      document.documentElement.style.overflowY = '';
      window.removeEventListener('keydown', handlePressKey);
    };
  });

  const handleClickOverlay = evn => {
    if (evn.target !== evn.currentTarget) {
      return;
    }
    onClose();
  };

  const handlePressKey = evn => {
    if (evn.key !== 'Escape') {
      return;
    }
    onClose();
  };

  return (
    <div className={style.overlay} onClick={handleClickOverlay}>
      <div className={style.modal}>
        <img width={700} height={500} src={largeImageURL} alt="" />
      </div>
    </div>
  );
};
export default Modal;
