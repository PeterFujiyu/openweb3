import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Lock, Shield, CheckCircle, XCircle, Fingerprint } from 'lucide-react';
import { PasskeyModal } from './ui';

interface CreateWalletProps {
  onBack: () => void;
  onContinue: (password: string) => void;
  onPasskeySetup?: (passkeyData: any) => void;
}

interface PasswordStrength {
  score: number;
  feedback: string[];
  isValid: boolean;
}

export const CreateWallet: React.FC<CreateWalletProps> = ({
  onBack,
  onContinue,
  onPasskeySetup
}) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasskeyModal, setShowPasskeyModal] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: [],
    isValid: false
  });

  // Password strength checker
  const checkPasswordStrength = (pwd: string): PasswordStrength => {
    let score = 0;
    const feedback: string[] = [];

    if (pwd.length >= 8) {
      score += 1;
    } else {
      feedback.push(t('createWallet.passwordLength'));
    }

    if (/[a-z]/.test(pwd)) {
      score += 1;
    } else {
      feedback.push(t('createWallet.passwordLowercase'));
    }

    if (/[A-Z]/.test(pwd)) {
      score += 1;
    } else {
      feedback.push(t('createWallet.passwordUppercase'));
    }

    if (/\d/.test(pwd)) {
      score += 1;
    } else {
      feedback.push(t('createWallet.passwordNumber'));
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      score += 1;
    } else {
      feedback.push(t('createWallet.passwordSpecial'));
    }

    return {
      score,
      feedback,
      isValid: score >= 4
    };
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordStrength(checkPasswordStrength(value));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 2) return 'bg-red-500';
    if (passwordStrength.score <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength.score <= 1) return t('createWallet.passwordWeak');
    if (passwordStrength.score <= 2) return t('createWallet.passwordFair');
    if (passwordStrength.score <= 3) return t('createWallet.passwordGood');
    return t('createWallet.passwordStrong');
  };

  const isFormValid = () => {
    return passwordStrength.isValid &&
           password === confirmPassword &&
           password.length > 0 &&
           confirmPassword.length > 0;
  };

  const handleContinue = () => {
    if (isFormValid()) {
      onContinue(password);
    }
  };

  const handlePasskeySetup = () => {
    setShowPasskeyModal(true);
  };

  const handlePasskeySuccess = (passkeyData: any) => {
    console.log('Passkey setup successful:', passkeyData);
    onPasskeySetup?.(passkeyData);
    setShowPasskeyModal(false);
    // Could continue with wallet creation flow here
  };

  const handlePasskeyError = (error: string) => {
    console.error('Passkey setup error:', error);
  };

  return (
    <div className="relative w-full h-screen max-w-md mx-auto bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden rounded-2xl sm:rounded-none font-montserrat">
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4">
        <motion.button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full px-6 pb-4">
        {/* Icon and Title Section */}
        <div className="flex flex-col items-center justify-center pt-8 pb-4 space-y-4">
          {/* Lock Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="w-16 h-16 rounded-3xl bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl"></div>
          </motion.div>

          {/* Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center space-y-2"
          >
            <h1 className="text-xl font-bold text-white">
              {t('createWallet.title')}
            </h1>
            <p className="text-gray-400 text-sm px-4 leading-relaxed">
              {t('createWallet.description')}
            </p>
          </motion.div>
        </div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 space-y-4 min-h-0"
        >
          {/* Password Input */}
          <div className="space-y-2">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder={t('createWallet.passwordPlaceholder')}
                className="w-full h-12 px-4 pr-12 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-gray-800/80 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                {/* Strength Bar */}
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">
                    {getPasswordStrengthText()}
                  </span>
                </div>

                {/* Feedback */}
                {passwordStrength.feedback.length > 0 && (
                  <div className="space-y-1">
                    {passwordStrength.feedback.slice(0, 2).map((feedback, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <XCircle className="w-3 h-3 text-red-400" />
                        <span className="text-xs text-red-400">{feedback}</span>
                      </div>
                    ))}
                  </div>
                )}

                {passwordStrength.isValid && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-xs text-green-400">{t('createWallet.passwordValid')}</span>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('createWallet.confirmPasswordPlaceholder')}
                className="w-full h-12 px-4 pr-12 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-gray-800/80 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password Match Indicator */}
            {confirmPassword && password && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2"
              >
                {password === confirmPassword ? (
                  <>
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-xs text-green-400">{t('createWallet.passwordMatch')}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3 text-red-400" />
                    <span className="text-xs text-red-400">{t('createWallet.passwordNoMatch')}</span>
                  </>
                )}
              </motion.div>
            )}
          </div>

          {/* Continue Button */}
          <motion.button
            onClick={handleContinue}
            disabled={!isFormValid()}
            className={`w-full h-12 rounded-2xl font-semibold text-white transition-all duration-200 ${
              isFormValid()
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-700 cursor-not-allowed opacity-50'
            }`}
            whileHover={isFormValid() ? { scale: 1.02 } : {}}
            whileTap={isFormValid() ? { scale: 0.98 } : {}}
          >
            {t('createWallet.continue')}
          </motion.button>

          {/* Fingerprint/Passkey Option */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <motion.button
              onClick={handlePasskeySetup}
              className="inline-flex items-center space-x-2 text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="group-hover:text-purple-300"
              >
                <Fingerprint className="w-4 h-4" />
              </motion.div>
              <span className="font-medium">{t('createWallet.withFingerprint')}</span>
            </motion.button>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-start space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl -mt-1"
          >
            <Shield className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs">
              <p className="font-medium text-blue-400 mb-0.5">
                {t('createWallet.securityTitle')}
              </p>
              <p className="text-blue-300/80 leading-relaxed">
                {t('createWallet.securityMessage')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Passkey Modal */}
      <PasskeyModal
        isOpen={showPasskeyModal}
        onClose={() => setShowPasskeyModal(false)}
        onSuccess={handlePasskeySuccess}
        onError={handlePasskeyError}
      />
    </div>
  );
};