import React, { useState } from 'react';
import { Eye, EyeOff, Lock, RefreshCw } from 'lucide-react';
import { useWalletStore } from '../store/useWalletStore';
// import { useTranslation } from 'react-i18next'; // Removed unused import
import { motion } from 'framer-motion';

interface UnlockWalletProps {
  onUnlock: () => void;
}

export const UnlockWallet: React.FC<UnlockWalletProps> = ({ onUnlock }) => {
  // const { t } = useTranslation(); // Removed unused translation
  const { unlockWallet } = useWalletStore();
  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const success = await unlockWallet(password);
      if (success) {
        onUnlock();
      } else {
        setError('Incorrect password. Please try again.');
      }
    } catch (err) {
      setError('Failed to unlock wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[375px] h-[600px] bg-gray-900 text-white rounded-2xl shadow-2xl flex flex-col">
      <div className="flex-1 flex flex-col justify-center p-6">
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Lock size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
              <p className="text-gray-400 mt-2">Enter your password to unlock your wallet</p>
            </div>
          </div>
          
          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-left">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-3 pr-10 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div 
                className="text-red-400 text-sm bg-red-900/20 border border-red-600/30 rounded p-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {loading && <RefreshCw size={16} className="animate-spin" />}
              <span>{loading ? 'Unlocking...' : 'Unlock Wallet'}</span>
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => {
                // In a real app, this would show a recovery flow
                alert('Password recovery would be implemented here');
              }}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Forgot your password?
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};