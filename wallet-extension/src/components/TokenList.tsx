import React, { useState } from 'react';
import { ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface Token {
  id: string;
  name: string;
  symbol: string;
  balance: string;
  value: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  logoUrl: string;
}

interface TokenListProps {
  tokens: Token[];
  hiddenTokensCount?: number;
}

const TokenItem: React.FC<{ token: Token; index: number }> = ({ token, index }) => (
  <motion.div 
    className="flex items-center cursor-pointer py-2 hover:bg-uniswap-surface/50 dark:hover:bg-uniswap-surface/50 light:hover:bg-light-surface/50 rounded-lg px-2 -mx-2 transition-colors"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    whileHover={{ x: 4 }}
  >
    <img 
      src={token.logoUrl} 
      className="w-10 h-10 rounded-full" 
      alt={`${token.name} logo`}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = `https://via.placeholder.com/40/FF007A/FFFFFF?text=${token.symbol.charAt(0)}`;
      }}
    />
    <div className="ml-3 flex-grow">
      <p className="font-semibold text-uniswap-text-primary dark:text-uniswap-text-primary light:text-light-text-primary">
        {token.name}
      </p>
      <p className="text-sm text-uniswap-text-secondary dark:text-uniswap-text-secondary light:text-light-text-secondary">
        {token.balance} {token.symbol}
      </p>
    </div>
    <div className="text-right">
      <p className="font-semibold text-uniswap-text-primary dark:text-uniswap-text-primary light:text-light-text-primary">
        {token.value}
      </p>
      <div className={`flex items-center justify-end text-sm ${        token.isPositive ? 'text-uniswap-green' : 'text-uniswap-red'
      }`}>
        {token.isPositive ? (
          <TrendingUp size={12} className="mr-1" />
        ) : (
          <TrendingDown size={12} className="mr-1" />
        )}
        <span>{token.changePercent}</span>
      </div>
    </div>
  </motion.div>
);

export const TokenList: React.FC<TokenListProps> = ({ tokens, hiddenTokensCount = 0 }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'tokens' | 'nfts' | 'activity'>('tokens');
  const [showHidden, setShowHidden] = useState(false);

  const tabs = [
    { key: 'tokens' as const, label: t('wallet.tokens') },
    { key: 'nfts' as const, label: t('wallet.nfts') },
    { key: 'activity' as const, label: t('wallet.activity') },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-6 border-b border-uniswap-card dark:border-uniswap-card light:border-light-surface mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-2 font-semibold transition-colors ${              activeTab === tab.key
                ? 'text-uniswap-active-tab border-b-2 border-uniswap-active-tab'
                : 'text-uniswap-inactive-tab dark:text-uniswap-inactive-tab light:text-light-text-secondary hover:text-white dark:hover:text-white light:hover:text-light-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Token List */}
      {activeTab === 'tokens' && (
        <div className="space-y-2">
          {tokens.map((token, index) => (
            <TokenItem key={token.id} token={token} index={index} />
          ))}

          {/* Hidden Tokens */}
          {hiddenTokensCount > 0 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowHidden(!showHidden)}
                className="text-sm text-uniswap-text-secondary dark:text-uniswap-text-secondary light:text-light-text-secondary hover:text-white dark:hover:text-white light:hover:text-light-text-primary transition-colors flex items-center mx-auto space-x-1"
              >
                <span>{t('wallet.hiddenTokens')} ({hiddenTokensCount})</span>
                <ChevronDown 
                  size={14} 
                  className={`transform transition-transform ${showHidden ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          )}
        </div>
      )}

      {/* NFTs Tab Content */}
      {activeTab === 'nfts' && (
        <div className="text-center py-8 text-uniswap-text-secondary dark:text-uniswap-text-secondary light:text-light-text-secondary">
          <p>{t('wallet.nfts')} - Coming Soon</p>
        </div>
      )}

      {/* Activity Tab Content */}
      {activeTab === 'activity' && (
        <div className="text-center py-8 text-uniswap-text-secondary dark:text-uniswap-text-secondary light:text-light-text-secondary">
          <p>{t('wallet.activity')} - Coming Soon</p>
        </div>
      )}
    </div>
  );
};