import React, { useState } from 'react';
import { Trash2, UserPlus, ShieldAlert, ShieldCheck, Loader, AlertTriangle } from 'lucide-react';
import { useGetUsers, useCreateAdmin, useAssignSuperAdmin, useDeleteUser } from '@/hooks/useAdminManagement';
import { toast } from 'sonner';

const AdminManagement: React.FC = () => {
  const { data: users, isLoading: usersLoading } = useGetUsers();
  const createAdmin = useCreateAdmin();
  const assignSuperAdmin = useAssignSuperAdmin();
  const deleteUser = useDeleteUser();

  const [newAdmin, setNewAdmin] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAdmin.mutateAsync(newAdmin);
      toast.success('New admin created successfully');
      setNewAdmin({ username: '', email: '', password: '' });
    } catch (error) {
      toast.error('Failed to create admin');
    }
  };

  const handleAssignSuperAdmin = async (username: string) => {
    if (!confirm(`Are you sure you want to assign super-admin privileges to ${username}?`)) return;
    try {
      await assignSuperAdmin.mutateAsync(username);
      toast.success('Super-admin assigned successfully');
    } catch (error) {
      toast.error('Failed to assign super-admin');
    }
  };

  const handleDeleteUser = async (id: number, username: string) => {
    if (!confirm(`Are you sure you want to delete admin ${username}?`)) return;
    try {
      await deleteUser.mutateAsync(id);
      toast.success('Admin deleted successfully');
    } catch (error) {
      toast.error('Failed to delete admin');
    }
  };

  if (usersLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader className="w-8 h-8 animate-spin text-[#0E99A2]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Create New Admin Form */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <UserPlus className="w-5 h-5 text-[#5B8C51]" />
          <h2 className="text-xl font-bold text-[#404A3D]">Create New Admin</h2>
        </div>
        
        <form onSubmit={handleCreateAdmin} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={newAdmin.username}
              onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={newAdmin.email}
              onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={newAdmin.password}
              onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent"
              required
            />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              disabled={createAdmin.isPending}
              className="flex items-center gap-2 bg-[#5B8C51] text-white py-2 px-6 rounded-xl hover:bg-[#4a7242] transition-colors font-medium disabled:opacity-50"
            >
              {createAdmin.isPending ? <Loader className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              Create Admin
            </button>
          </div>
        </form>
      </div>

      {/* Admin List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#404A3D]">System Administrators</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Username</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users?.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-[#404A3D]">{user.username}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    {user.is_super_admin ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <ShieldAlert className="w-3 h-3" />
                        Super Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <ShieldCheck className="w-3 h-3" />
                        Admin
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {!user.is_super_admin && (
                        <button
                          onClick={() => handleAssignSuperAdmin(user.username)}
                          title="Assign Super Admin"
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          <ShieldAlert className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user.id, user.username)}
                        title="Delete User"
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {users?.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No administrators found.
          </div>
        )}
      </div>
      
      {/* Super Admin Notice */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> Super-admins have full control over the system, including the ability to manage other administrators. Use caution when assigning these privileges.
        </p>
      </div>
    </div>
  );
};

export default AdminManagement;
