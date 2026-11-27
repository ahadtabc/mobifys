import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { Search, X, RotateCw, Eye, Ban, CheckCircle, Users, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import BlockConfirmModal from '../../components/admin/BlockConfirmModal';
import './UsersList.css';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [appliedSearch, setAppliedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);

  const {
    register: registerSearch,
    control: searchControl,
    handleSubmit: handleSearchFormSubmit,
    reset: resetSearchForm,
  } = useForm({
    defaultValues: { search: '' },
  });

  const watchedSearch = useWatch({ control: searchControl, name: 'search', defaultValue: '' });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    showingFrom: 0,
    showingTo: 0,
  });
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    blocked: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    const { data } = await axiosInstance.get('/admin/users', {
      params: {
        search: appliedSearch,
        status: statusFilter,
        sort: sortBy,
        page,
        limit: 10,
      },
    });
    return data;
  }, [appliedSearch, statusFilter, sortBy, page]);

  const applyCustomersResponse = useCallback((data) => {
    setUsers(data.users);
    setPagination(data.pagination);
    if (data.stats) setStats(data.stats);
  }, []);

  useEffect(() => {
    let active = true;
    fetchUsers()
      .then((data) => {
        if (active) applyCustomersResponse(data);
      })
      .catch((err) => {
        if (active) {
          toast.error(err.response?.data?.message || 'Failed to load users');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [fetchUsers, applyCustomersResponse]);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      applyCustomersResponse(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to refresh users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = handleSearchFormSubmit(({ search }) => {
    setPage(1);
    setAppliedSearch(search.trim());
  });

  const handleClearSearch = () => {
    resetSearchForm({ search: '' });
    setAppliedSearch('');
    setPage(1);
  };

  const handleConfirmToggleBlock = async () => {
    if (!selectedUser) return;
    try {
      setActionLoading(true);
      const { data } = await axiosInstance.patch(
        `/admin/users/${selectedUser._id}/toggle-block`
      );
      toast.success(data.message);
      setSelectedUser(null);
      setLoading(true);
      const refreshed = await fetchUsers();
      applyCustomersResponse(refreshed);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading(false);
      setLoading(false);
    }
  };

  const getInitials = (name = '') =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>Users</h1>
        <p>
          Manage registered users, search accounts, and control access.
        </p>
      </div>

      <div className="customer-stats-grid">
        <button
          type="button"
          onClick={() => {
            setStatusFilter('all');
            setPage(1);
          }}
          className={`customer-stat-card ${statusFilter === 'all' ? 'is-selected' : ''}`}
        >
          <div className="stat-icon-box total">
            <Users size={18} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Users</span>
            <strong className="stat-value">{stats.total.toLocaleString('en-IN')}</strong>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setStatusFilter('active');
            setPage(1);
          }}
          className={`customer-stat-card ${statusFilter === 'active' ? 'is-selected' : ''}`}
        >
          <div className="stat-icon-box active">
            <UserCheck size={18} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Active Users</span>
            <strong className="stat-value">{stats.active.toLocaleString('en-IN')}</strong>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setStatusFilter('blocked');
            setPage(1);
          }}
          className={`customer-stat-card ${statusFilter === 'blocked' ? 'is-selected' : ''}`}
        >
          <div className="stat-icon-box blocked">
            <Ban size={18} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Blocked Users</span>
            <strong className="stat-value">{stats.blocked.toLocaleString('en-IN')}</strong>
          </div>
        </button>
      </div>

      <div className="toolbar-card">
        <div className="toolbar-controls">
          <form onSubmit={handleSearchSubmit} className="search-form-box">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              className="search-input"
              {...registerSearch('search')}
            />
            {(watchedSearch || appliedSearch) && (
              <button
                type="button"
                onClick={handleClearSearch}
                title="Clear search"
                className="clear-search-btn"
              >
                <X size={14} />
              </button>
            )}
          </form>

          <button type="button" onClick={handleSearchSubmit} className="btn-search-submit">
            Search
          </button>


          <button type="button" onClick={handleRefresh} title="Refresh" className="btn-refresh">
            <RotateCw size={15} />
          </button>
        </div>

        <div className="sort-control-group">
          <label htmlFor="users-sort-select" className="sort-label">
            Sort By:
          </label>
          <select
            id="users-sort-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className="status-select sort-select"
          >
            <option value="latest">Latest Registered</option>
            <option value="oldest">Oldest Registered</option>
            <option value="name_asc">Name (A–Z)</option>
            <option value="name_desc">Name (Z–A)</option>
            <option value="wallet_desc">Wallet (High–Low)</option>
            <option value="wallet_asc">Wallet (Low–High)</option>
          </select>
        </div>
      </div>

      <div className="table-card">
        <div className="table-scroll">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Joined</th>
                <th>Wallet</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="table-empty-cell">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="table-empty-cell">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="user-cell">
                        {user.profileImage ? (
                          <img src={user.profileImage} alt={user.name} className="user-avatar-img" />
                        ) : (
                          <div className="user-avatar-initials">{getInitials(user.name)}</div>
                        )}
                        <div>
                          <div className="user-name">{user.name}</div>
                          <div className="user-sub">
                            {user.email} {user.phone ? `• ${user.phone}` : ''}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      {new Date(user.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="wallet-text">
                      ₹{(user.walletBalance || 0).toLocaleString('en-IN')}
                    </td>

                    <td>
                      {user.isBlocked ? (
                        <span className="status-pill blocked">
                          <span className="status-dot" /> Blocked
                        </span>
                      ) : (
                        <span className="status-pill active">
                          <span className="status-dot" /> Active
                        </span>
                      )}
                    </td>

                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/admin/users/${user._id}`}
                          title="View Details"
                          className="icon-action-btn"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setSelectedUser(user)}
                          title={user.isBlocked ? 'Unblock User' : 'Block User'}
                          className={`icon-action-btn ${user.isBlocked ? 'unblock' : 'block'}`}
                        >
                          {user.isBlocked ? <CheckCircle size={16} /> : <Ban size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination-footer">
          <div>
            Showing <strong>{pagination.showingFrom}</strong>–
            <strong>{pagination.showingTo}</strong> of{' '}
            <strong>{pagination.totalUsers}</strong> registered users
          </div>

          <div className="pagination-pages">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={page === pageNum ? 'page-btn active' : 'page-btn'}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </div>
      </div>

      <BlockConfirmModal
        user={selectedUser}
        loading={actionLoading}
        onClose={() => setSelectedUser(null)}
        onConfirm={handleConfirmToggleBlock}
      />
    </div>
  );
}