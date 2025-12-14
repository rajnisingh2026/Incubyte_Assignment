import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import SweetCard from '../components/Dashboard/SweetCard';
import SearchBar from '../components/Dashboard/SearchBar';
import AddSweetModal from '../components/Admin/AddSweetModal';
import './Dashboard.css';

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const response = await api.get('/sweets');
      setSweets(response.data.sweets);
      setFilteredSweets(response.data.sweets);
      setError('');
    } catch (err) {
      setError('Failed to load sweets. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchParams) => {
    let filtered = [...sweets];

    if (searchParams.name) {
      filtered = filtered.filter(sweet =>
        sweet.name.toLowerCase().includes(searchParams.name.toLowerCase())
      );
    }

    if (searchParams.category) {
      filtered = filtered.filter(sweet =>
        sweet.category.toLowerCase().includes(searchParams.category.toLowerCase())
      );
    }

    if (searchParams.minPrice) {
      filtered = filtered.filter(sweet => sweet.price >= parseFloat(searchParams.minPrice));
    }

    if (searchParams.maxPrice) {
      filtered = filtered.filter(sweet => sweet.price <= parseFloat(searchParams.maxPrice));
    }

    setFilteredSweets(filtered);
  };

  const handlePurchase = async (sweetId, quantity) => {
    try {
      await api.post(`/sweets/${sweetId}/purchase`, { quantity });
      fetchSweets(); 
      alert('Purchase successful!');
    } catch (err) {
      alert(err.response?.data?.message || 'Purchase failed');
    }
  };

  const handleDelete = async (sweetId) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) return;

    try {
      await api.delete(`/sweets/${sweetId}`);
      fetchSweets(); 
      alert('Sweet deleted successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleRestock = async (sweetId, quantity) => {
    try {
      await api.post(`/sweets/${sweetId}/restock`, { quantity });
      fetchSweets(); 
      alert('Restock successful!');
    } catch (err) {
      alert(err.response?.data?.message || 'Restock failed');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🍬 Sweet Shop Dashboard</h1>
          <div className="header-actions">
            <span className="user-info">
              Welcome, <strong>{user?.username}</strong>
              {user?.role === 'admin' && <span className="admin-badge">Admin</span>}
            </span>
            <button onClick={logout} className="btn-logout">Logout</button>
          </div>
        </div>
      </header>

      <div className="search-section">
        <SearchBar onSearch={handleSearch} />
        {user?.role === 'admin' && (
          <button 
            className="btn-add-sweet" 
            onClick={() => setShowAddModal(true)}
          >
            + Add New Sweet
          </button>
        )}
      </div>

      <div className="dashboard-content">
        {error && <div className="error-banner">{error}</div>}
        
        {loading ? (
          <div className="loading-spinner">Loading sweets...</div>
        ) : filteredSweets.length === 0 ? (
          <div className="no-results">
            <p>No sweets found. {user?.role === 'admin' && 'Add some sweets to get started!'}</p>
          </div>
        ) : (
          <div className="sweets-grid">
            {filteredSweets.map(sweet => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                onPurchase={handlePurchase}
                onDelete={user?.role === 'admin' ? handleDelete : null}
                onRestock={user?.role === 'admin' ? handleRestock : null}
                isAdmin={user?.role === 'admin'}
              />
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddSweetModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            fetchSweets();
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
