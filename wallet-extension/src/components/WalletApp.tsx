import React, { useEffect } from 'react';
import { WalletHeader } from './WalletHeader';
import { UserInfo } from './UserInfo';
import { BalanceSection } from './BalanceSection';
import { ActionButtons } from './ActionButtons';
import { TokenList } from './TokenList';
import { useThemeStore } from '../store/useThemeStore';
import { useWalletStore } from '../store/useWalletStore';

// Mock data for tokens, using original style
const mockTokens = [
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    balance: '0.003',
    value: '$14.25',
    change: '+1.97%',
    changePercent: '1.97%',
    isPositive: true,
    logoUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022'
  },
  {
    id: 'dai',
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    balance: '13.43',
    value: '$13.43',
    change: '-0.29%',
    changePercent: '0.29%',
    isPositive: false,
    logoUrl: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=022'
  },
  {
    id: 'bnb',
    name: 'Binance Coin',
    symbol: 'BNB',
    balance: '0.004',
    value: '$3.77',
    change: '+0.65%',
    changePercent: '0.65%',
    isPositive: true,
    logoUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=022'
  }
];

export const WalletApp: React.FC = () => {
  const { theme } = useThemeStore();
  const { currentAccount } = useWalletStore();

  useEffect(() => {
    const root = document.documentElement;
    const effectiveTheme = theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    
    if (effectiveTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const getAccountName = () => {
    return currentAccount?.name || 'Account 1';
  };

  const getAccountAddress = () => {
    return currentAccount?.address || '0x0000...0000';
  };

  return (
    <div className="w-[375px] h-[600px] bg-uniswap-bg dark:bg-uniswap-bg light:bg-light-bg text-uniswap-text-primary dark:text-uniswap-text-primary light:text-light-text-primary rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      <WalletHeader />
      
      <main className="flex-grow p-4 overflow-y-auto">
        <UserInfo 
          username={getAccountName()}
          address={getAccountAddress()}
        />
        
        <BalanceSection 
          balance="$31.46"
          change="$0.26"
          changePercent="0.83%"
          isPositive={true}
        />
        
        <ActionButtons />
        
        <TokenList 
          tokens={mockTokens}
          hiddenTokensCount={1}
        />
      </main>
    </div>
  );
};