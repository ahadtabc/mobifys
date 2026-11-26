import { useEffect } from 'react';
import { Ban, ShieldCheck } from 'lucide-react';
import './BlockConfirmModal.css';

export default function BlockConfirmModal({ user, loading, onClose, onConfirm }) {
  useEffect(() => {
    if (!user) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !loading) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [user, loading, onClose]);

  if (!user) return null;

  const isBlocking = !user.isBlocked;

  return (
    <div
      className="block-modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div
        className="block-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="block-modal-title"
        aria-describedby="block-modal-description"
      >
        <div className="block-modal-icon">
          {isBlocking ? <Ban size={23} /> : <ShieldCheck size={23} />}
        </div>
        <h2 id="block-modal-title">
          {isBlocking ? `Block ${user.name}?` : `Unblock ${user.name}?`}
        </h2>
        <p id="block-modal-description">
          {isBlocking
            ? 'This user will no longer be able to sign in or place orders.'
            : 'This user will regain access to sign in and place orders.'}
        </p>
        <div className="block-modal-actions">
          <button
            type="button"
            className="block-modal-cancel"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="block-modal-confirm"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Processing...' : isBlocking ? 'Block' : 'Unblock'}
          </button>
        </div>
      </div>
    </div>
  );
}
