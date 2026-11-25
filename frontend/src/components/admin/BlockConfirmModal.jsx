import { AlertTriangle, ShieldCheck, X } from 'lucide-react';
import './BlockConfirmModal.css';

export default function BlockConfirmModal({ user, loading, onClose, onConfirm }) {
  if (!user) return null;

  const isBlocking = !user.isBlocked;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div className="modal-header">
          <div className="modal-title-group">
            <div className={`modal-icon ${isBlocking ? 'danger' : 'success'}`}>
              {isBlocking ? <AlertTriangle size={20} /> : <ShieldCheck size={20} />}
            </div>
            <div>
              <h3>{isBlocking ? `Block ${user.name}?` : `Unblock ${user.name}?`}</h3>
              <p>{user.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={18} />
          </button>
        </div>

        <p className="modal-body-text">
          {isBlocking
            ? 'Blocking this customer will immediately revoke their storefront access and prevent them from logging in or placing orders until unblocked.'
            : 'Unblocking this customer will restore their full access to sign in, manage their profile, and place orders on Mobifys.'}
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
            {loading ? 'Processing...' : isBlocking ? 'Yes, Block User' : 'Yes, Unblock User'}
          </button>
        </div>
      </div>
    </div>
  );
}