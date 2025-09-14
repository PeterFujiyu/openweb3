import React, { useState } from 'react';
import { Copy, Shield, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface UserInfoProps {
  username: string;
  address: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({ username, address }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center font-bold text-lg text-white">
            {username.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div title={t('wallet.network')}>
            <Shield
              size={24}
              className="text-uniswap-text-secondary dark:text-uniswap-text-secondary light:text-light-text-secondary cursor-pointer hover:text-white dark:hover:text-white light:hover:text-light-text-primary transition-colors"
            />
          </div>
          <div title={t('wallet.settings')}>
            <Settings
              size={24}
              className="text-uniswap-text-secondary dark:text-uniswap-text-secondary light:text-light-text-secondary cursor-pointer hover:text-white dark:hover:text-white light:hover:text-light-text-primary transition-colors"
            />
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <h2 className="text-lg font-bold text-uniswap-text-primary dark:text-uniswap-text-primary light:text-light-text-primary">
            {username}
          </h2>
          <div title={copied ? t('common.copied') : t('common.copy')} onClick={() => handleCopy(username)}>
            <Copy
              size={16}
              className="text-uniswap-text-tertiary dark:text-uniswap-text-tertiary light:text-light-text-tertiary cursor-pointer hover:text-white dark:hover:text-white light:hover:text-light-text-primary transition-colors"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-uniswap-text-secondary dark:text-uniswap-text-secondary light:text-light-text-secondary">
          <span>{formatAddress(address)}</span>
          <div title={copied ? t('common.copied') : t('common.copy')} onClick={() => handleCopy(address)}>
            <Copy
              size={14}
              className="text-uniswap-text-tertiary dark:text-uniswap-text-tertiary light:text-light-text-tertiary cursor-pointer hover:text-white dark:hover:text-white light:hover:text-light-text-primary transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};