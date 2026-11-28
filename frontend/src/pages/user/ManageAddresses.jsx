import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Plus, Edit3, Trash2, CheckCircle2, User, MapPin, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import './ManageAddresses.css';

export default function ManageAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAddresses = async () => {
    const { data } = await axiosInstance.get('/user/addresses');
    setAddresses(data.addresses);
  };

  useEffect(() => {
    let active = true;
    axiosInstance
      .get('/user/addresses')
      .then(({ data }) => {
        if (active) setAddresses(data.addresses);
      })
      .catch((err) => {
        if (active && !err?.isBlockedLogout) toast.error('Failed to load addresses');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!deleteTarget) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !deleting) {
        setDeleteTarget(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [deleteTarget, deleting]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      const { data } = await axiosInstance.delete(`/user/addresses/${deleteTarget._id}`);
      toast.success(data.message);
      setDeleteTarget(null);
      window.dispatchEvent(new Event('addresses-updated'));
      await fetchAddresses();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  const handleSetDefault = async (addr) => {
    try {
      const { data } = await axiosInstance.put(`/user/addresses/${addr._id}`, {
        isDefault: true,
      });
      toast.success(data.message);
      window.dispatchEvent(new Event('addresses-updated'));
      fetchAddresses();
    } catch {
      toast.error('Could not set default address');
    }
  };

  return (
    <div className="addresses-container">
      <div className="profile-subnav-tabs">
        <NavLink to="/profile" end className="profile-tab-link">
          <User size={14} /> My Profile
        </NavLink>
        <NavLink to="/profile/addresses" className="profile-tab-link active">
          <MapPin size={14} /> Addresses ({addresses.length})
        </NavLink>
        <NavLink to="/profile/edit" className="profile-tab-link">
          <ShieldCheck size={14} /> Account Security
        </NavLink>
      </div>

      <div className="addresses-header-row">
        <div>
          <h1>Manage Delivery Addresses</h1>
          <p>Add, edit, or remove your saved delivery destinations.</p>
        </div>

        <Link to="/profile/addresses/new" className="btn-add-address">
          <Plus size={16} /> Add New Address
        </Link>
      </div>

      {loading ? (
        <p style={{ fontSize: '13px', color: '#6b7280' }}>Loading saved addresses...</p>
      ) : addresses.length === 0 ? (
        <div
          style={{
            background: '#ffffff',
            padding: '48px',
            borderRadius: '18px',
            textAlign: 'center',
            border: '1px solid #e5e7eb',
          }}
        >
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            You haven't added any delivery addresses yet.
          </p>
          <Link to="/profile/addresses/new" className="btn-add-address">
            <Plus size={16} /> Add Your First Address
          </Link>
        </div>
      ) : (
        <div className="addresses-grid">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className={addr.isDefault ? 'address-card default-card' : 'address-card'}
            >
              <div>
                <div className="address-card-badges">
                  <span className="label-badge">{addr.label}</span>
                  {addr.isDefault && <span className="default-node-badge">● Default Address</span>}
                </div>

                <div className="address-street">
                  {[addr.address, addr.street].filter(Boolean).join(', ')}
                </div>
                <div className="address-city-pin">
                  {[addr.city, addr.state].filter(Boolean).join(', ')} — {addr.pin}
                </div>
                <div className="address-phone">Phone: {addr.phone}</div>
              </div>

              <div className="address-card-footer">
                <div className="address-card-actions">
                  <Link to={`/profile/addresses/edit/${addr._id}`} className="btn-addr-edit">
                    <Edit3 size={14} /> Edit Address
                  </Link>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(addr)}
                    title="Delete address"
                    className="btn-addr-delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                {addr.isDefault ? (
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#059669',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <CheckCircle2 size={14} /> Active Default
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSetDefault(addr)}
                    className="btn-set-default"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <div
          className="address-delete-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget && !deleting) {
              setDeleteTarget(null);
            }
          }}
        >
          <div
            className="address-delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-address-title"
            aria-describedby="delete-address-description"
          >
            <div className="address-delete-icon">
              <Trash2 size={23} />
            </div>
            <h2 id="delete-address-title">Delete address?</h2>
            <p id="delete-address-description">
              Remove your <strong>{deleteTarget.label}</strong> address (
              {[deleteTarget.address, deleteTarget.city].filter(Boolean).join(', ')})?
            </p>
            <div className="address-delete-actions">
              <button
                type="button"
                className="address-delete-cancel"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="address-delete-confirm"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}