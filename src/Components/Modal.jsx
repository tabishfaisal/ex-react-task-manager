import ReactDOM from 'react-dom';

const Modal = ({
  title,
  content,
  show,
  onClose,
  onConfirm,
}) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <div>{content}</div>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

