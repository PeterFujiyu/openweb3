import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CryptoProjectIcon } from './CryptoProjectIcon';
import { Moon, Sun, Languages } from 'lucide-react';
import { AlertModal } from './ui';

interface OpenWeb3WelcomeProps {
  onCreateWallet: () => void;
  onImportWallet: () => void;
  onQRImport: () => void;
}

type Theme = 'light' | 'dark';
type Language = 'en' | 'zh';

export const OpenWeb3Welcome: React.FC<OpenWeb3WelcomeProps> = ({
  onCreateWallet,
  onImportWallet,
  // onQRImport - unused parameter
}) => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('en');
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info' as 'info' | 'success' | 'warning' | 'error'
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'zh' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const showAlert = (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    setAlertModal({
      isOpen: true,
      title,
      message,
      type
    });
  };

  const closeAlert = () => {
    setAlertModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleCreateWallet = () => {
    onCreateWallet();
  };

  const handleImportWallet = () => {
    onImportWallet();
  };

  const handleQRImport = () => {
    showAlert(
      t('common.info'),
      'QR import flow will be implemented!',
      'info'
    );
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const cryptoProjects: any[] = [];

  const themeClasses = theme === 'dark' 
    ? 'from-gray-900 via-black to-gray-900' 
    : 'from-blue-50 via-white to-purple-50';


  return (
    <div className={`relative w-full h-screen max-w-md mx-auto bg-gradient-to-b ${themeClasses} overflow-hidden rounded-2xl sm:rounded-none font-montserrat transition-all duration-500`}>
      {/* Top Right Controls */}
      <div className="absolute top-4 right-4 flex space-x-2 z-20">
        {/* Language Toggle */}
        <motion.button
          onClick={toggleLanguage}
          className={`relative w-10 h-10 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all duration-200 group overflow-hidden ${
            theme === 'dark'
              ? 'bg-white/10 hover:bg-purple-400/30 border-white/20 hover:border-purple-300/40'
              : 'bg-black/10 hover:bg-purple-400/30 border-black/20 hover:border-purple-300/40'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className={`z-10 relative ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
            animate={{
              rotate: [0, -5, 5, -3, 3, 0],
              scale: [1, 1.05, 1, 1.02, 1]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
            whileHover={{
              rotate: [0, -8, 8, -5, 5, -3, 3, 0],
              scale: [1, 1.1, 0.95, 1.05, 1],
              transition: {
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 0.3
              }
            }}
          >
            <Languages className="w-4 h-4" />
          </motion.div>

          {/* Hover tooltip */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
            <div className="bg-purple-400/90 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm whitespace-nowrap">
              <div className="flex items-center space-x-1">
                <motion.span
                  animate={{
                    rotate: [0, -3, 3, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  🌐
                </motion.span>
                <span>{t('language.switch')}</span>
                <span className="font-semibold">
                  {language === 'en' ? 'ZH' : 'EN'}
                </span>
              </div>
            </div>
          </div>
        </motion.button>

        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className={`relative w-10 h-10 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all duration-200 group overflow-hidden ${
            theme === 'dark'
              ? 'bg-white/10 hover:bg-yellow-400/30 border-white/20 hover:border-yellow-300/40'
              : 'bg-black/10 hover:bg-purple-400/30 border-black/20 hover:border-purple-300/40'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="z-10 relative"
            animate={{
              rotate: [0, -5, 5, -3, 3, 0],
              scale: [1, 1.05, 1, 1.02, 1]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: "easeInOut"
            }}
            whileHover={{
              rotate: [0, -8, 8, -5, 5, -3, 3, 0],
              scale: [1, 1.1, 0.95, 1.05, 1],
              transition: {
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 0.3
              }
            }}
          >
            {theme === 'dark' ?
              <Sun className="w-4 h-4 text-yellow-400" /> :
              <Moon className="w-4 h-4 text-purple-600" />
            }
          </motion.div>

          {/* Hover tooltip */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
            <div className={`text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm whitespace-nowrap ${
              theme === 'dark' ? 'bg-yellow-400/90' : 'bg-purple-400/90'
            }`}>
              <div className="flex items-center space-x-1">
                <motion.span
                  animate={{
                    rotate: [0, -3, 3, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </motion.span>
                <span>{t('theme.switch')}</span>
                <span className="font-semibold">
                  {theme === 'dark' ? t('theme.light') : t('theme.dark')}
                </span>
              </div>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Floating Crypto Project Icons */}
      {cryptoProjects.map((project) => (
        <div
          key={project.name}
          className={`absolute ${project.position} w-8 h-8 sm:w-12 sm:h-12 opacity-90 select-none`}
        >
          <CryptoProjectIcon 
            name={project.name}
            className="w-full h-full"
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent pointer-events-none ${theme === 'dark' ? 'from-black/60' : 'from-white/40'}`} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo and Brand */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          {/* Central Logo */}
          <div className="mb-6 sm:mb-8 animate-fade-in">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-xl opacity-30 scale-150 animate-pulse"></div>
              {/* Logo container */}
              <div className="relative">
                <img 
                  src="/icon.png" 
                  alt="OpenWeb3 Logo" 
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Brand Name */}
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t('welcome.title')}</h1>
            <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t('welcome.subtitle')}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 sm:px-6 pb-6 sm:pb-8 space-y-3 sm:space-y-4 max-w-sm mx-auto w-full">
          {/* Create Wallet Button */}
          <button
            onClick={handleCreateWallet}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 animate-slide-up text-sm sm:text-base"
          >
            {t('welcome.createWallet')}
          </button>

          {/* Import Wallet Button */}
          <button
            onClick={handleImportWallet}
            className={`w-full backdrop-blur-sm font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl border hover:scale-105 transition-all duration-200 animate-slide-up-delay-1 text-sm sm:text-base ${theme === 'dark' ? 'bg-gray-800/80 text-white border-gray-700/50 hover:bg-gray-700/80' : 'bg-white/80 text-gray-900 border-gray-300/50 hover:bg-white/90'}`}
          >
            {t('welcome.importWallet')}
          </button>

          {/* QR Import Option */}
          <div className="text-center py-3 sm:py-4 animate-slide-up-delay-2">
            <p className={`text-xs sm:text-sm mb-2 sm:mb-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{t('welcome.haveApp')}</p>
            <button
              onClick={handleQRImport}
              className={`inline-flex items-center space-x-2 transition-colors duration-200 hover:scale-105 transform text-sm sm:text-base ${theme === 'dark' ? 'text-pink-400 hover:text-pink-300' : 'text-purple-600 hover:text-purple-500'}`}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              <span className="font-medium">{t('welcome.scanQR')}</span>
            </button>
          </div>

          {/* Terms and Privacy */}
          <div className={`text-center text-xs leading-relaxed pt-2 sm:pt-4 animate-slide-up-delay-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
            {t('welcome.agreeTo')}{' '}
            <button className={`transition-colors underline hover:scale-105 transform inline-block ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
              {t('welcome.terms')}
            </button>{' '}
            {t('welcome.consentTo')}{' '}
            <button className={`transition-colors underline hover:scale-105 transform inline-block ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
              {t('welcome.privacy')}
            </button>
          </div>
        </div>
      </div>

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={closeAlert}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
      />
    </div>
  );
};