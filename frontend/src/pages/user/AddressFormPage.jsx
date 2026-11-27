import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { MapPin, Save, Home, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import {
  ADDRESS_LABELS,
  ADDRESS_MAX_LENGTH,
  CITY_MAX_LENGTH,
  INDIAN_STATES,
  STREET_MAX_LENGTH,
  addressLineRules,
  cityRules,
  extractIndianDigits,
  extractPinDigits,
  indianPhoneRules,
  normalizeText,
  pinRules,
  stateRules,
  streetRules,
  toastFirstFormError,
} from '../../utils/formValidation';
import './AddressFormPage.css';

export default function AddressFormPage() {
  const { id } = useParams(); // Present when editing an existing address
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [pendingAddressValues, setPendingAddressValues] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      label: 'Home',
      address: '',
      street: '',
      city: '',
      state: '',
      pin: '',
      phone: '',
      isDefault: false,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const watchedLabel = useWatch({ control, name: 'label', defaultValue: 'Home' });

  useEffect(() => {
    if (!isEdit) return;
    axiosInstance
      .get('/user/addresses')
      .then(({ data }) => {
        const found = data.addresses.find((a) => a._id === id);
        if (found) {
          reset({
            label: found.label || 'Home',
            address: found.address || '',
            street: found.street || '',
            city: found.city || '',
            state: found.state || '',
            pin: extractPinDigits(found.pin),
            phone: extractIndianDigits(found.phone),
            isDefault: Boolean(found.isDefault),
          });
        }
      })
      .catch(() => toast.error('Failed to load address'));
  }, [id, isEdit, reset]);

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

  const saveAddress = async (values) => {
    const formValues = values || pendingAddressValues || getValues();
    const payload = {
      label: formValues.label,
      address: normalizeText(formValues.address),
      street: normalizeText(formValues.street),
      city: normalizeText(formValues.city),
      state: formValues.state,
      pin: formValues.pin.trim(),
      phone: formValues.phone.trim(),
      isDefault: Boolean(formValues.isDefault),
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

  const onValidSubmit = async (values) => {
    if (isEdit) {
      setPendingAddressValues(values);
      setShowUpdateModal(true);
      return;
    }

    await saveAddress(values);
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
          <MapPin
            size={22}
            color="#ff5722"
            style={{ verticalAlign: 'middle', marginRight: '8px' }}
          />
          {isEdit ? 'Edit Delivery Address' : 'Add New Address'}
        </h1>
        <p>
          Enter your complete flat/building, street address, town/city, state, 6-digit PIN code,
          and Indian mobile number.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onValidSubmit, toastFirstFormError)}
        className="edit-section-card"
        noValidate
      >
        <div className={`edit-field-group ${errors.address ? 'has-error' : ''}`}>
          <label htmlFor="address-line">Flat, House No., Building, Apartment *</label>
          <input
            id="address-line"
            type="text"
            maxLength={ADDRESS_MAX_LENGTH}
            placeholder="Plot 42, Cyber Heights"
            className="edit-input"
            aria-invalid={Boolean(errors.address)}
            {...register('address', addressLineRules())}
          />
          {errors.address && <p className="address-field-error">{errors.address.message}</p>}
        </div>

        <div className={`edit-field-group ${errors.street ? 'has-error' : ''}`}>
          <label htmlFor="address-street">Street Address / Area / Locality *</label>
          <input
            id="address-street"
            type="text"
            maxLength={STREET_MAX_LENGTH}
            placeholder="Nilambur Road, Near Town Hall"
            className="edit-input"
            aria-invalid={Boolean(errors.street)}
            {...register('street', streetRules())}
          />
          {errors.street && <p className="address-field-error">{errors.street.message}</p>}
        </div>

        <div className="two-col-fields">
          <div className={`edit-field-group ${errors.city ? 'has-error' : ''}`}>
            <label htmlFor="address-city">Town / City *</label>
            <input
              id="address-city"
              type="text"
              maxLength={CITY_MAX_LENGTH}
              placeholder="Malappuram"
              className="edit-input"
              aria-invalid={Boolean(errors.city)}
              {...register('city', cityRules())}
            />
            {errors.city && <p className="address-field-error">{errors.city.message}</p>}
          </div>

          <div className={`edit-field-group ${errors.state ? 'has-error' : ''}`}>
            <label htmlFor="address-state">State *</label>
            <select
              id="address-state"
              className="edit-input"
              aria-invalid={Boolean(errors.state)}
              {...register('state', stateRules())}
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
            {errors.state && <p className="address-field-error">{errors.state.message}</p>}
          </div>
        </div>

        <div className="two-col-fields">
          <div className={`edit-field-group ${errors.pin ? 'has-error' : ''}`}>
            <label htmlFor="address-pin">PIN Code *</label>
            <Controller
              name="pin"
              control={control}
              rules={pinRules()}
              render={({ field }) => (
                <input
                  id="address-pin"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={field.value}
                  onChange={(e) => field.onChange(extractPinDigits(e.target.value))}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  placeholder="679338"
                  className="edit-input"
                  aria-invalid={Boolean(errors.pin)}
                />
              )}
            />
            {errors.pin && <p className="address-field-error">{errors.pin.message}</p>}
          </div>

          <div className={`edit-field-group ${errors.phone ? 'has-error' : ''}`}>
            <label htmlFor="address-phone">Phone Number *</label>
            <div className="address-phone-wrap">
              <span className="address-phone-prefix">+91</span>
              <Controller
                name="phone"
                control={control}
                rules={indianPhoneRules({ requiredMessage: 'Contact phone is required' })}
                render={({ field }) => (
                  <input
                    id="address-phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={field.value}
                    onChange={(e) => field.onChange(extractIndianDigits(e.target.value))}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    placeholder="9847012345"
                    className="edit-input address-phone-input"
                    aria-invalid={Boolean(errors.phone)}
                  />
                )}
              />
            </div>
            {errors.phone && <p className="address-field-error">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="edit-field-group">
          <label>Address Label</label>
          <div className="label-options-grid">
            {ADDRESS_LABELS.map((lbl) => (
              <label
                key={lbl}
                className={
                  watchedLabel === lbl ? 'label-option-card selected' : 'label-option-card'
                }
              >
                <input
                  type="radio"
                  value={lbl}
                  {...register('label')}
                />
                <span>{lbl}</span>
              </label>
            ))}
          </div>
        </div>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            style={{ accentColor: '#ff5722', width: '16px', height: '16px' }}
            {...register('isDefault')}
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
              Save changes to your <strong>{watchedLabel}</strong> delivery address?
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
                onClick={() => saveAddress()}
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
