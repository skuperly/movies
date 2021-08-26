import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";

import "./Modal.css";

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal">
        <button className="modal-close-btn" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
