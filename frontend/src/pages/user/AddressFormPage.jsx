import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MapPin, Save, Home, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import './AddressFormPage.css';

const ADDRESS_LABELS = ['Home', 'Work', 'Other'];
const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

const ADDRESS_MIN_LENGTH = 3;
const ADDRESS_MAX_LENGTH = 120;
const STREET_MIN_LENGTH = 3;
const STREET_MAX_LENGTH = 100;
const CITY_MIN_LENGTH = 2;
const CITY_MAX_LENGTH = 50;

const ADDRESS_LINE_REGEX = /^[A-Za-z0-9\s,./#&()-]+$/;
const CITY_REGEX = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/;
const INDIAN_PIN_REGEX = /^[1-9]\d{5}$/;
const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;

function extractIndianDigits(rawValue = '') {
  const digitsOnly = String(rawValue).replace(/\D/g, '');
  if (digitsOnly.length > 10 && digitsOnly.startsWith('91')) {
    return digitsOnly.slice(2, 12);
  }
  if (digitsOnly.length > 10 && digitsOnly.startsWith('0')) {
    return digitsOnly.slice(1, 11);
  }
  return digitsOnly.slice(0, 10);
}

function normalizeText(value) {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
}

function validateAddressForm(form) {
  const errors = {};
  const cleanAddress = normalizeText(form.address);
  const cleanStreet = normalizeText(form.street);
  const cleanCity = normalizeText(form.city);
  const cleanPin = form.pin.trim();
  const cleanPhone = form.phone.trim();

  if (!cleanAddress) {
    errors.address = 'Flat / House No. / Building is required';
  } else if (cleanAddress.length < ADDRESS_MIN_LENGTH) {
    errors.address = `Must be at least ${ADDRESS_MIN_LENGTH} characters`;
  } else if (cleanAddress.length > ADDRESS_MAX_LENGTH) {
    errors.address = `Must not exceed ${ADDRESS_MAX_LENGTH} characters`;
  } else if (!/[A-Za-z0-9]/.test(cleanAddress) || !ADDRESS_LINE_REGEX.test(cleanAddress)) {
    errors.address = 'Contains invalid characters';
  }

  if (!cleanStreet) {
    errors.street = 'Street address is required';
  } else if (cleanStreet.length < STREET_MIN_LENGTH) {
    errors.street = `Street address must be at least ${STREET_MIN_LENGTH} characters`;
  } else if (cleanStreet.length > STREET_MAX_LENGTH) {
    errors.street = `Street address must not exceed ${STREET_MAX_LENGTH} characters`;
  } else if (!/[A-Za-z0-9]/.test(cleanStreet) || !ADDRESS_LINE_REGEX.test(cleanStreet)) {
    errors.street = 'Street address contains invalid characters';
  }

  if (!cleanCity) {
    errors.city = 'Town / City is required';
  } else if (cleanCity.length < CITY_MIN_LENGTH) {
    errors.city = `Town / City must be at least ${CITY_MIN_LENGTH} characters`;
  } else if (cleanCity.length > CITY_MAX_LENGTH) {
    errors.city = `Town / City must not exceed ${CITY_MAX_LENGTH} characters`;
  } else if (!CITY_REGEX.test(cleanCity)) {
    errors.city = 'Use letters only (spaces, dots, hyphens, or apostrophes allowed)';
  }

  if (!form.state || !INDIAN_STATES.includes(form.state)) {
    errors.state = 'Please select a state / union territory';
  }

  if (!cleanPin) {
    errors.pin = 'PIN code is required';
  } else if (!INDIAN_PIN_REGEX.test(cleanPin)) {
    errors.pin = 'Enter a valid 6-digit Indian PIN code (cannot start with 0)';
  }

  if (!cleanPhone) {
    errors.phone = 'Contact phone is required';
  } else if (!INDIAN_PHONE_REGEX.test(cleanPhone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number (starts with 6–9)';
  }

  return errors;
}

export default function AddressFormPage() {
  const { id } = useParams(); // Present when editing an existing address
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    label: 'Home',
    address: '',
    street: '',
    city: '',
    state: '',
    pin: '',
    phone: '',
    isDefault: false,
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    axiosInstance
      .get('/user/addresses')
      .then(({ data }) => {
        const found = data.addresses.find((a) => a._id === id);
        if (found) {
          setForm({
            label: found.label || 'Home',
            address: found.address || '',
            street: found.street || '',
            city: found.city || '',
            state: found.state || '',
            pin: String(found.pin || '').replace(/\D/g, '').slice(0, 6),
            phone: extractIndianDigits(found.phone),
            isDefault: Boolean(found.isDefault),
          });
        }
      })
      .catch(() => toast.error('Failed to load address'));
  }, [id, isEdit]);

  useEffect(() => {
    if (!showUpdateModal) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !loading) {
        setShowUpdateModal(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showUpdateModal, loading]);

  const validationErrors = validateAddressForm(form);
  const showFieldError = (field) => (touched[field] || submitted) && validationErrors[field];

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const saveAddress = async () => {
    const payload = {
      label: form.label,
      address: normalizeText(form.address),
      street: normalizeText(form.street),
      city: normalizeText(form.city),
      state: form.state,
      pin: form.pin.trim(),
      phone: form.phone.trim(),
      isDefault: form.isDefault,
    };

    try {
      setLoading(true);
      if (isEdit) {
        const { data } = await axiosInstance.put(`/user/addresses/${id}`, payload);
        toast.success(data.message);
      } else {
        const { data } = await axiosInstance.post('/user/addresses', payload);
        toast.success(data.message);
      }
      setShowUpdateModal(false);
      window.dispatchEvent(new Event('addresses-updated'));
      navigate('/profile/addresses');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save address');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const firstError = Object.values(validationErrors)[0];
    if (firstError) {
      return toast.error(firstError);
    }

    if (isEdit) {
      setShowUpdateModal(true);
      return;
    }

    await saveAddress();
  };

  return (
    <div className="edit-profile-container">
      <nav className="edit-profile-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link to="/">
              <Home size={14} />
              Home
            </Link>
          </li>
          <li className="edit-profile-breadcrumb-separator" aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li className="edit-profile-breadcrumb-separator" aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li>
            <Link to="/profile/addresses">Manage Addresses</Link>
          </li>
          <li className="edit-profile-breadcrumb-separator" aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li>
            <span aria-current="page">{isEdit ? 'Edit Address' : 'Add New Address'}</span>
          </li>
        </ol>
      </nav>

      <div className="profile-page-title">
        <h1>
          <MapPin size={22} color="#ff5722" style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          {isEdit ? 'Edit Delivery Address' : 'Add New Address'}
        </h1>
        <p>Enter your complete flat/building, street address, town/city, state, 6-digit PIN code, and Indian mobile number.</p>
      </div>

      <form onSubmit={handleSubmit} className="edit-section-card" noValidate>
        <div className={`edit-field-group ${showFieldError('address') ? 'has-error' : ''}`}>
          <label htmlFor="address-line">Flat, House No., Building, Apartment *</label>
          <input
            id="address-line"
            type="text"
            maxLength={ADDRESS_MAX_LENGTH}
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            onBlur={() => handleBlur('address')}
            placeholder="Plot 42, Cyber Heights"
            className="edit-input"
            aria-invalid={Boolean(showFieldError('address'))}
          />
          {showFieldError('address') && (
            <p className="address-field-error">{validationErrors.address}</p>
          )}
        </div>

        <div className={`edit-field-group ${showFieldError('street') ? 'has-error' : ''}`}>
          <label htmlFor="address-street">Street Address / Area / Locality *</label>
          <input
            id="address-street"
            type="text"
            maxLength={STREET_MAX_LENGTH}
            value={form.street}
            onChange={(e) => setForm({ ...form, street: e.target.value })}
            onBlur={() => handleBlur('street')}
            placeholder="Nilambur Road, Near Town Hall"
            className="edit-input"
            aria-invalid={Boolean(showFieldError('street'))}
          />
          {showFieldError('street') && (
            <p className="address-field-error">{validationErrors.street}</p>
          )}
        </div>

        <div className="two-col-fields">
          <div className={`edit-field-group ${showFieldError('city') ? 'has-error' : ''}`}>
            <label htmlFor="address-city">Town / City *</label>
            <input
              id="address-city"
              type="text"
              maxLength={CITY_MAX_LENGTH}
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              onBlur={() => handleBlur('city')}
              placeholder="Malappuram"
              className="edit-input"
              aria-invalid={Boolean(showFieldError('city'))}
            />
            {showFieldError('city') && (
              <p className="address-field-error">{validationErrors.city}</p>
            )}
          </div>

          <div className={`edit-field-group ${showFieldError('state') ? 'has-error' : ''}`}>
            <label htmlFor="address-state">State *</label>
            <select
              id="address-state"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              onBlur={() => handleBlur('state')}
              className="edit-input"
              aria-invalid={Boolean(showFieldError('state'))}
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
            {showFieldError('state') && (
              <p className="address-field-error">{validationErrors.state}</p>
            )}
          </div>
        </div>

        <div className="two-col-fields">
          <div className={`edit-field-group ${showFieldError('pin') ? 'has-error' : ''}`}>
            <label htmlFor="address-pin">PIN Code *</label>
            <input
              id="address-pin"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={form.pin}
              onChange={(e) =>
                setForm({ ...form, pin: e.target.value.replace(/\D/g, '').slice(0, 6) })
              }
              onBlur={() => handleBlur('pin')}
              placeholder="679338"
              className="edit-input"
              aria-invalid={Boolean(showFieldError('pin'))}
            />
            {showFieldError('pin') && (
              <p className="address-field-error">{validationErrors.pin}</p>
            )}
          </div>

          <div className={`edit-field-group ${showFieldError('phone') ? 'has-error' : ''}`}>
            <label htmlFor="address-phone">Phone Number *</label>
            <div className="address-phone-wrap">
              <span className="address-phone-prefix">+91</span>
              <input
                id="address-phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: extractIndianDigits(e.target.value) })
                }
                onBlur={() => handleBlur('phone')}
                placeholder="9847012345"
                className="edit-input address-phone-input"
                aria-invalid={Boolean(showFieldError('phone'))}
              />
            </div>
            {showFieldError('phone') && (
              <p className="address-field-error">{validationErrors.phone}</p>
            )}
          </div>
        </div>

        <div className="edit-field-group">
          <label>Address Label</label>
          <div className="label-options-grid">
            {ADDRESS_LABELS.map((lbl) => (
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

      {showUpdateModal && (
        <div
          className="edit-profile-confirm-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget && !loading) {
              setShowUpdateModal(false);
            }
          }}
        >
          <div
            className="edit-profile-confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="update-address-title"
            aria-describedby="update-address-description"
          >
            <div className="edit-profile-confirm-icon">
              <Save size={23} />
            </div>
            <h2 id="update-address-title">Update address?</h2>
            <p id="update-address-description">
              Save changes to your <strong>{form.label}</strong> delivery address?
            </p>
            <div className="edit-profile-confirm-actions">
              <button
                type="button"
                className="edit-profile-confirm-cancel"
                onClick={() => setShowUpdateModal(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="edit-profile-confirm-submit"
                onClick={saveAddress}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
