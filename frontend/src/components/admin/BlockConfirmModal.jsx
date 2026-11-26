import { AlertTriangle, ShieldCheck, X } from 'lucide-react';
import './BlockConfirmModal.css';

export default function BlockConfirmModal({ user, loading, onClose, onConfirm }) {
  if (!user) return null;

  const isBlocking = !user.isBlocked;

  return (
    <div className="modal-backdrop">
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="block-confirm-title"
        aria-describedby="block-confirm-description"
      >
        <div className="modal-header">
          <div className={`modal-icon ${isBlocking ? 'danger' : 'success'}`} aria-hidden="true">
            {isBlocking ? <AlertTriangle size={20} /> : <ShieldCheck size={20} />}
          </div>
          <div className="modal-title-group">
            <h3 id="block-confirm-title">
              {isBlocking ? `Block ${user.name}?` : `Unblock ${user.name}?`}
            </h3>
            <p>{user.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close confirmation"
          disabled={loading}
        >
          <X size={18} />
        </button>

        <p className="modal-body-text" id="block-confirm-description">
          {isBlocking
            ? 'They will not be able to sign in or place orders until unblocked.'
            : 'They will regain access to sign in and place orders.'}
        </p>

        <div className="modal-footer">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="btn-modal-cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`btn-modal-confirm ${isBlocking ? 'danger' : 'success'}`}
          >
            {loading ? 'Processing...' : isBlocking ? 'Block user' : 'Unblock user'}
          </button>
        </div>
      </div>
    </div>
  );
}