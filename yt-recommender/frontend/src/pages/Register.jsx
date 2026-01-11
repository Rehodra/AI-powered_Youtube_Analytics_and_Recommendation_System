import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../Css/login.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    full_name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    const userData = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      full_name: formData.full_name || null
    };

    const result = await register(userData);

    if (result.success) {
      // Users start with free plan, go directly to audit
      navigate('/audit');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}/auth/google`;
  };

  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit} style={{ maxWidth: '550px' }}>
        <h2>Create Account</h2>

        {error && (
          <p style={{ color: '#dc2626', fontSize: 14, textAlign: 'center', marginBottom: '10px' }}>
            {error}
          </p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <div className="flex-column">
              <label>Email</label>
            </div>
            <div className="inputForm">
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex-column">
              <label>Username</label>
            </div>
            <div className="inputForm">
              <input
                type="text"
                className="input"
                placeholder="johndoe"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex-column">
          <label>Full Name <span style={{ color: '#999', fontWeight: 400 }}>(optional)</span></label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            className="input"
            placeholder="John Doe"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <div className="flex-column">
              <label>Password</label>
            </div>
            <div className="inputForm">
              <input
                type={showPassword ? 'text' : 'password'}
                className="input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <span
                style={{ cursor: 'pointer', opacity: showPassword ? 1 : 0.5 }}
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </span>
            </div>
          </div>

          <div>
            <div className="flex-column">
              <label>Confirm Password</label>
            </div>
            <div className="inputForm">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="input"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
              <span
                style={{ cursor: 'pointer', opacity: showConfirmPassword ? 1 : 0.5 }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                👁
              </span>
            </div>
          </div>
        </div>

        <button type="submit" className="button-submit" disabled={loading}>
          {loading ? 'Creating Account…' : 'Create Account'}
        </button>

        <p className="p">
          Already have an account?{' '}
          <Link to="/login" className="span">
            Sign In
          </Link>
        </p>

        <p className="p line">Or With</p>

        <button
          type="button"
          className="btn-google-large"
          onClick={handleGoogleSignup}
        >
          <svg version="1.1" width="18" viewBox="0 0 512 512">
            <path style={{ fill: '#FBBB00' }} d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z"></path>
            <path style={{ fill: '#518EF8' }} d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176z"></path>
            <path style={{ fill: '#28B446' }} d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"></path>
            <path style={{ fill: '#F14336' }} d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z"></path>
          </svg>
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default Register;
