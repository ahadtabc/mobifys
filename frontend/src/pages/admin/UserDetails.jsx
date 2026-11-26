import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Ban, CheckCircle, MapPin, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import BlockConfirmModal from '../../components/admin/BlockConfirmModal';
import './UserDetails.css';

export default function UserDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/admin/users/${id}`);
      setCustomer(data.user);
      setAddresses(data.addresses);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleToggleBlock = async () => {
    try {
      setActionLoading(true);
      const { data } = await axiosInstance.patch(`/admin/users/${id}/toggle-block`);
      toast.success(data.message);
      setShowModal(false);
      fetchDetails();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div style={{ fontSize: '12px', color: '#6b7280' }}>Loading profile...</div>;
  if (!customer) return <div style={{ fontSize: '12px', color: '#dc2626' }}>User not found.</div>;

  return (
    <div className="user-details-page">
      <div className="details-header-card">
        <div className="details-identity">
          <div className="details-avatar-lg">
            {customer.name?.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="details-name-row">
              <h1>{customer.name}</h1>
              <span className={`status-pill ${customer.isBlocked ? 'blocked' : 'active'}`}>
                {customer.isBlocked ? 'Blocked' : 'Active'}
              </span>
            </div>
            <p className="details-meta">
              Referral Code: <strong>{customer.referralCode}</strong> • Joined{' '}
              {new Date(customer.createdAt).toLocaleDateString('en-IN')}
            </p>
          </div>
        </div>

        <div className="details-header-actions">
          <Link to="/admin/users" className="btn-back-users">
            <ArrowLeft size={14} /> Back to Users
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className={`btn-toggle-status ${customer.isBlocked ? 'unblock' : 'block'}`}
          >
            {customer.isBlocked ? <CheckCircle size={14} /> : <Ban size={14} />}
            {customer.isBlocked ? 'Unblock User' : 'Block User'}
          </button>
        </div>
      </div>

      <div className="details-grid">
        <div className="info-card">
          <h2>Contact & Wallet Info</h2>
          <div className="contact-row">
            <Mail size={14} /> {customer.email}
          </div>
          <div className="contact-row">
            <Phone size={14} /> {customer.phone || 'Not provided'}
          </div>
          <div className="wallet-summary-row">
            <span>Wallet Balance:</span>
            <strong className="wallet-text">
              ₹{(customer.walletBalance || 0).toLocaleString('en-IN')}
            </strong>
          </div>
        </div>

        <div className="info-card">
          <h2>Saved Addresses ({addresses.length})</h2>
          {addresses.length === 0 ? (
            <p style={{ fontSize: '12px', color: '#9ca3af' }}>No saved addresses yet.</p>
          ) : (
            addresses.map((addr) => (
              <div key={addr._id} className="address-item-box">
                <div className="address-label-row">
                  <MapPin size={13} color="#ff5722" /> {addr.label}
                  {addr.isDefault && <span className="default-tag">Default</span>}
                </div>
                <p style={{ color: '#4b5563' }}>
                  {addr.address}, {addr.city} - {addr.pin}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <BlockConfirmModal
        user={showModal ? customer : null}
        loading={actionLoading}
        onClose={() => setShowModal(false)}
        onConfirm={handleToggleBlock}
      />
    </div>
  );
}