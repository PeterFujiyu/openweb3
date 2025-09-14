import React, { useState } from 'react';
import { Eye, EyeOff, RefreshCw, Copy, Check } from 'lucide-react';
import { useWalletStore } from '../store/useWalletStore';
// import { useTranslation } from 'react-i18next'; // Removed unused import
import { motion } from 'framer-motion';

interface WalletSetupProps {
  onComplete: () => void;
}

export const WalletSetup: React.FC<WalletSetupProps> = ({ onComplete }) => {
  // const { t } = useTranslation(); // Removed unused translation
  const { createWallet, importWallet } = useWalletStore();
  
  const [step, setStep] = useState<'welcome' | 'create' | 'import' | 'mnemonic' | 'verify' | 'password'>('welcome');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mnemonic, setMnemonic] = useState('');
  const [generatedMnemonic, setGeneratedMnemonic] = useState('');
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([]);
  // const [verifyWords, setVerifyWords] = useState<{ [key: number]: string }>({}); // Removed unused state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generateMnemonic = async () => {
    const { generateMnemonic } = await import('bip39');
    const newMnemonic = generateMnemonic();
    setGeneratedMnemonic(newMnemonic);
    setMnemonicWords(newMnemonic.split(' '));
  };

  const handleCreateWallet = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await createWallet(password);
      onComplete();
    } catch (err) {
      setError('Failed to create wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImportWallet = async () => {
    if (!mnemonic.trim()) {
      setError('Please enter your seed phrase');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await importWallet(mnemonic.trim(), password);
      onComplete();
    } catch (err) {
      setError('Invalid seed phrase or failed to import wallet');
    } finally {
      setLoading(false);
    }
  };

  const copyMnemonic = async () => {
    try {
      await navigator.clipboard.writeText(generatedMnemonic);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy mnemonic');
    }
  };

  const renderWelcomeStep = () => (
    <motion.div 
      className="text-center space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-white">Welcome to Web3 Wallet</h1>
        <p className="text-gray-400">Get started by creating a new wallet or importing an existing one</p>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={() => {
            generateMnemonic();
            setStep('mnemonic');
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Create New Wallet
        </button>
        
        <button
          onClick={() => setStep('import')}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Import Existing Wallet
        </button>
      </div>
    </motion.div>
  );

  const renderMnemonicStep = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-white">Your Seed Phrase</h2>
        <p className="text-gray-400 text-sm">
          Write down these 12 words in the correct order and store them safely
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {mnemonicWords.map((word, index) => (
            <div key={index} className="bg-gray-700 rounded p-2 text-center">
              <span className="text-xs text-gray-400">{index + 1}</span>
              <div className="text-white font-mono text-sm">{word}</div>
            </div>
          ))}
        </div>
        
        <button
          onClick={copyMnemonic}
          className="w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
        </button>
      </div>

      <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
        <p className="text-yellow-400 text-sm">
          ⚠️ Never share your seed phrase with anyone. Anyone with your seed phrase can access your funds.
        </p>
      </div>

      <button
        onClick={() => setStep('password')}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
      >
        I've Saved My Seed Phrase
      </button>
    </motion.div>
  );

  const renderImportStep = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-white">Import Wallet</h2>
        <p className="text-gray-400 text-sm">Enter your 12-word seed phrase</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Seed Phrase
          </label>
          <textarea
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value)}
            placeholder="Enter your 12-word seed phrase separated by spaces"
            className="w-full h-24 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
            rows={3}
          />
        </div>

        <button
          onClick={() => setStep('password')}
          disabled={!mnemonic.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );

  const renderPasswordStep = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-white">Create Password</h2>
        <p className="text-gray-400 text-sm">This password will be used to unlock your wallet</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 pr-10 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              placeholder="Enter password (min 8 characters)"
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

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Confirm Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            placeholder="Confirm your password"
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm bg-red-900/20 border border-red-600/30 rounded p-2">
            {error}
          </div>
        )}

        <button
          onClick={step === 'password' && generatedMnemonic ? handleCreateWallet : handleImportWallet}
          disabled={loading || !password || !confirmPassword || password !== confirmPassword}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          {loading && <RefreshCw size={16} className="animate-spin" />}
          <span>{loading ? 'Creating...' : 'Create Wallet'}</span>
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="w-[375px] h-[600px] bg-gray-900 text-white rounded-2xl shadow-2xl flex flex-col">
      <div className="flex-1 p-6 flex flex-col justify-center">
        {step === 'welcome' && renderWelcomeStep()}
        {step === 'mnemonic' && renderMnemonicStep()}
        {step === 'import' && renderImportStep()}
        {step === 'password' && renderPasswordStep()}
      </div>
      
      {step !== 'welcome' && (
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => {
              if (step === 'password') {
                setStep(generatedMnemonic ? 'mnemonic' : 'import');
              } else if (step === 'mnemonic' || step === 'import') {
                setStep('welcome');
              }
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
};