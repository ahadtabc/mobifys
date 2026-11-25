import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, RotateCw, Eye, Ban, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import BlockConfirmModal from '../../components/admin/BlockConfirmModal';
import './CustomersList.css';

export default function CustomersList() {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    showingFrom: 0,
    showingTo: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/admin/users', {
        params: {
          search: appliedSearch,
          status: statusFilter,
          page,
          limit: 10,
        },
      });
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load customers');
    } finally {
      setLoading(false);
    }
  }, [appliedSearch, statusFilter, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setAppliedSearch(searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput('');
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
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading(false);
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
    <div className="customers-page">
      <div className="page-header">
        <h1>Customers</h1>
        <p>
          Manage registered customers, search accounts, and control access (sorted latest first).
        </p>
      </div>

      <div className="toolbar-card">
        <div className="toolbar-controls">
          <form onSubmit={handleSearchSubmit} className="search-form-box">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name, email, or phone..."
              className="search-input"
            />
            {(searchInput || appliedSearch) && (
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

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="status-select"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="blocked">Blocked Only</option>
          </select>

          <button type="button" onClick={fetchUsers} title="Refresh" className="btn-refresh">
            <RotateCw size={15} />
          </button>
        </div>

        <div className="sort-hint">Showing latest registered accounts first</div>
      </div>

      <div className="table-card">
        <div className="table-scroll">
          <table className="customers-table">
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
                    Loading customers...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="table-empty-cell">
                    No customers found matching your search.
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
                          to={`/admin/customers/${user._id}`}
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