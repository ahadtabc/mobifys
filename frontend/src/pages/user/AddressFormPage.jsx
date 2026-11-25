import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MapPin, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import './AddressFormPage.css';

export default function AddressFormPage() {
  const { id } = useParams(); // Present when editing an existing address
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    label: 'Home',
    address: '',
    city: '',
    pin: '',
    phone: '',
    isDefault: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    axiosInstance
      .get('/user/addresses')
      .then(({ data }) => {
        const found = data.addresses.find((a) => a._id === id);
        if (found) {
          setForm({
            label: found.label,
            address: found.address,
            city: found.city,
            pin: found.pin,
            phone: found.phone,
            isDefault: found.isDefault,
          });
        }
      })
      .catch(() => toast.error('Failed to load address'));
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.address.trim() || !form.city.trim() || !form.pin.trim() || !form.phone.trim()) {
      return toast.error('Please fill all required address fields');
    }

    try {
      setLoading(true);
      if (isEdit) {
        const { data } = await axiosInstance.put(`/user/addresses/${id}`, form);
        toast.success(data.message);
      } else {
        const { data } = await axiosInstance.post('/user/addresses', form);
        toast.success(data.message);
      }
      window.dispatchEvent(new Event('addresses-updated'));
      navigate('/profile/addresses');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save address');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="breadcrumb-bar">
        <Link to="/">Home</Link> › <Link to="/profile">Profile</Link> ›{' '}
        <Link to="/profile/addresses">Manage Addresses</Link> ›{' '}
        <span>{isEdit ? 'Edit Address' : 'Add New Address'}</span>
      </div>

      <div className="profile-page-title">
        <h1>
          <MapPin size={22} color="#ff5722" style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          {isEdit ? 'Edit Delivery Address' : 'Add New Address'}
        </h1>
        <p>Enter your complete street address, city, PIN code, and contact phone.</p>
      </div>

      <form onSubmit={handleSubmit} className="edit-section-card">
        <div className="two-col-fields">
          <div className="edit-field-group">
            <label>Contact Phone *</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 98470 12345"
              className="edit-input"
            />
          </div>

          <div className="edit-field-group">
            <label>PIN Code *</label>
            <input
              type="text"
              required
              value={form.pin}
              onChange={(e) => setForm({ ...form, pin: e.target.value })}
              placeholder="679338"
              className="edit-input"
            />
          </div>
        </div>

        <div className="edit-field-group">
          <label>Flat, House No., Building, Street *</label>
          <input
            type="text"
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Plot 42, Cyber Heights, Nilambur Road"
            className="edit-input"
          />
        </div>

        <div className="edit-field-group">
          <label>Town / City *</label>
          <input
            type="text"
            required
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            placeholder="Malappuram"
            className="edit-input"
          />
        </div>

        <div className="edit-field-group">
          <label>Address Label</label>
          <div className="label-options-grid">
            {['Home', 'Work', 'Other'].map((lbl) => (
              <div
                key={lbl}
                onClick={() => setForm({ ...form, label: lbl })}
                className={
                  form.label === lbl ? 'label-option-card selected' : 'label-option-card'
                }
              >
                <input
                  type="radio"
                  checked={form.label === lbl}
                  onChange={() => setForm({ ...form, label: lbl })}
                  style={{ accentColor: '#ff5722' }}
                />
                <span>{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={form.isDefault}
            onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
            style={{ accentColor: '#ff5722', width: '16px', height: '16px' }}
          />
          <span>Make this my default delivery address</span>
        </label>

        <div className="edit-bottom-bar">
          <Link to="/profile/addresses" className="btn-secondary-outline">
            Cancel
          </Link>
          <button type="submit" disabled={loading} className="btn-orange-action">
            <Save size={14} /> {loading ? 'Saving...' : isEdit ? 'Update Address' : 'Save Address'}
          </button>
        </div>
      </form>
    </div>
  );
}