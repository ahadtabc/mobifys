import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, Bot, Sparkles, ShieldCheck, Cpu } from 'lucide-react';
import './HomePage.css';

const featuredRobots = [
  {
    id: '1',
    tag: 'Humanoid',
    name: 'Tesla Optimus (Gen 2)',
    desc: 'Ceramic White • Standard Kinetic Config',
    price: '₹4,47,998',
  },
  {
    id: '2',
    tag: 'AI Companion',
    name: 'EMO AI Desktop Pet',
    desc: 'Matte Black & Cyber Purple • Smart Voice',
    price: '₹4,999',
  },
  {
    id: '3',
    tag: 'Quadruped',
    name: 'Boston Dynamics Spot',
    desc: 'Industrial Yellow • Enterprise SLAM Suite',
    price: '₹4,89,999',
  },
  {
    id: '4',
    tag: 'Smart Vacuum',
    name: 'Robolta R6 Pro',
    desc: 'Matte Gold & Black • 8000Pa Auto-Wash',
    price: '₹39,999',
  },
];

export default function HomePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="home-container">
      <section className="hero-banner">
        <span className="hero-eyebrow">NEXT-GEN ROBOTICS MARKETPLACE</span>
        <h1>Smart Robots for a Smarter Future.</h1>
        <p>
          Explore autonomous humanoids, intelligent cleaning vacuums, and interactive AI desktop
          companions engineered for modern homes and labs.
        </p>
        <div className="hero-cta-row">
          {user ? (
            <Link to="/profile" className="btn-hero-primary">
              Go to My Profile <ArrowRight size={16} />
            </Link>
          ) : (
            <>
              <Link to="/signup" className="btn-hero-primary">
                Create Mobifys Account <ArrowRight size={16} />
              </Link>
              <Link to="/login" className="btn-hero-secondary">
                Sign In to Portal
              </Link>
            </>
          )}
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Explore Categories</h2>
        </div>
        <div className="categories-grid">
          <div className="category-card">
            <Bot size={22} color="#ff5722" style={{ marginBottom: '10px' }} />
            <h3>Humanoids</h3>
            <p>Bipedal autonomous assistant robots</p>
          </div>
          <div className="category-card">
            <Sparkles size={22} color="#ff5722" style={{ marginBottom: '10px' }} />
            <h3>Cleaning Vacuums</h3>
            <p>LiDAR-guided robotic floor care</p>
          </div>
          <div className="category-card">
            <Cpu size={22} color="#ff5722" style={{ marginBottom: '10px' }} />
            <h3>AI Desktop Pets</h3>
            <p>Interactive expressive desk companions</p>
          </div>
          <div className="category-card">
            <ShieldCheck size={22} color="#ff5722" style={{ marginBottom: '10px' }} />
            <h3>STEM & Robotics Toys</h3>
            <p>Programmable kits for creators</p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Featured Robotics Fleet</h2>
        </div>
        <div className="products-grid">
          {featuredRobots.map((item) => (
            <div key={item.id} className="product-card">
              <span className="product-tag">{item.tag}</span>
              <h3>{item.name}</h3>
              <p className="product-desc">{item.desc}</p>
              <div className="product-price-row">
                <span className="product-price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}