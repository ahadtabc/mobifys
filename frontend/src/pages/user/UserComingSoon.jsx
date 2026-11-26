import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Package } from 'lucide-react';
import './UserComingSoon.css';

export default function UserComingSoon({ title }) {
  const Icon = title === 'My Orders' ? Package : Heart;

  return (
    <div className="account-coming-soon-page">
      <div className="account-coming-soon-card">
        <div className="account-coming-soon-icon">
          <Icon size={28} />
        </div>
        <span className="account-coming-soon-label">COMING SOON</span>
        <h1>{title}</h1>
        <p>This section is being prepared. Check back soon for updates.</p>
        <Link to="/profile" className="account-coming-soon-back">
          <ArrowLeft size={15} /> Back to My Profile
        </Link>
      </div>
    </div>
  );
}
