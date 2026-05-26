import React, { useState } from 'react';
import { Lock, Loader, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const ChangePasswordForm: React.FC = () => {
  const { changePassword, isChangingPassword } = useAuth();
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.new_password !== formData.confirm_password) {
      toast.error('New passwords do not match');
      return;
    }

    if (formData.new_password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    const result = await changePassword({
      current_password: formData.current_password,
      new_password: formData.new_password
    });

    if (result.success) {
      toast.success('Password changed successfully. Please log in again.');
      setFormData({ current_password: '', new_password: '', confirm_password: '' });
    } else {
      toast.error(result.error || 'Failed to change password');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <Lock className="w-5 h-5 text-[#0E99A2]" />
        <h2 className="text-xl font-bold text-[#404A3D]">Change Password</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
          <input
            type="password"
            value={formData.current_password}
            onChange={(e) => setFormData({ ...formData, current_password: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            value={formData.new_password}
            onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
          <input
            type="password"
            value={formData.confirm_password}
            onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isChangingPassword}
          className="w-full flex items-center justify-center gap-2 bg-[#0E99A2] text-white py-3 rounded-xl hover:bg-[#0d8a92] transition-colors font-medium disabled:opacity-50 mt-6"
        >
          {isChangingPassword ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          Update Password
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-4 text-center">
        For security reasons, you will be logged out after a successful password change.
      </p>
    </div>
  );
};

export default ChangePasswordForm;
