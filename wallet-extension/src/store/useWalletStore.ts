import { create } from 'zustand';
import { ethers } from 'ethers';

// Interfaces remain the same as original
export interface WalletAccount {
  id: string;
  name: string;
  address: string;
  privateKey: string; // Note: For simplicity, we keep this, but it's derived on-the-fly, not stored plaintext
  derivationPath: string;
}

export interface WalletState {
  isInitialized: boolean;
  isLocked: boolean;
  currentAccount: WalletAccount | null;
  accounts: WalletAccount[];
  // Mnemonic is no longer stored in plaintext in the state when locked
  createWallet: (password: string, accountName?: string) => Promise<void>;
  importWallet: (mnemonic: string, password: string, accountName?: string) => Promise<void>;
  unlockWallet: (password: string) => Promise<boolean>;
  lockWallet: () => void;
  addAccount: (name: string) => Promise<WalletAccount>;
  selectAccount: (accountId: string) => void;
  getBalance: (address: string) => Promise<string>;
  _rehydrateAccounts: (mnemonic: string) => Promise<void>;
}

// Securely derive accounts from a mnemonic
const deriveAccountsFromMnemonic = async (mnemonic: string, count: number): Promise<WalletAccount[]> => {
  const accounts: WalletAccount[] = [];
  const masterNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
  for (let i = 0; i < count; i++) {
    const derivationPath = `m/44'/60'/0'/0/${i}`;
    const childNode = masterNode.derivePath(derivationPath);
    accounts.push({
      id: (i + 1).toString(),
      name: `Account ${i + 1}`,
      address: childNode.address,
      privateKey: childNode.privateKey,
      derivationPath,
    });
  }
  return accounts;
};

export const useWalletStore = create<WalletState>((set, get) => ({
  isInitialized: false,
  isLocked: true,
  currentAccount: null,
  accounts: [],

  // Internal function to re-derive and set accounts state after unlock
  _rehydrateAccounts: async (mnemonic: string) => {
    const accountCount = JSON.parse(localStorage.getItem('openweb3_account_meta') || '{}').count || 1;
    const accounts = await deriveAccountsFromMnemonic(mnemonic, accountCount);
    set({ accounts, currentAccount: accounts[0] || null });
  },

  createWallet: async (password: string, accountName = 'Account 1') => {
    const wallet = ethers.Wallet.createRandom();
    const encryptedJson = await wallet.encrypt(password);
    
    localStorage.setItem('openweb3_encrypted_wallet', encryptedJson);
    // Store metadata, like number of accounts
    localStorage.setItem('openweb3_account_meta', JSON.stringify({ count: 1 }));

    const accounts = await deriveAccountsFromMnemonic(wallet.mnemonic.phrase, 1);
    if (accountName !== 'Account 1') accounts[0].name = accountName;

    set({
      isInitialized: true,
      isLocked: false,
      accounts,
      currentAccount: accounts[0],
    });
  },

  importWallet: async (mnemonic: string, password: string, accountName = 'Imported Account') => {
    if (!ethers.utils.isValidMnemonic(mnemonic)) {
      throw new Error('Invalid mnemonic phrase');
    }
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    const encryptedJson = await wallet.encrypt(password);

    localStorage.setItem('openweb3_encrypted_wallet', encryptedJson);
    localStorage.setItem('openweb3_account_meta', JSON.stringify({ count: 1 }));

    const accounts = await deriveAccountsFromMnemonic(mnemonic, 1);
    if (accountName !== 'Imported Account') accounts[0].name = accountName;

    set({
      isInitialized: true,
      isLocked: false,
      accounts,
      currentAccount: accounts[0],
    });
  },

  unlockWallet: async (password: string): Promise<boolean> => {
    const encryptedJson = localStorage.getItem('openweb3_encrypted_wallet');
    if (!encryptedJson) return false;

    try {
      const wallet = await ethers.Wallet.fromEncryptedJson(encryptedJson, password);
      await get()._rehydrateAccounts(wallet.mnemonic.phrase);
      set({ isLocked: false });
      return true;
    } catch (error) {
      console.error('Failed to unlock wallet:', error);
      return false;
    }
  },

  lockWallet: () => {
    set({ isLocked: true, currentAccount: null, accounts: [] });
  },

  addAccount: async (_name: string): Promise<WalletAccount> => {
    // This requires the wallet to be unlocked to get the mnemonic.
    // For this, we need to handle the mnemonic securely in memory post-unlock.
    // This implementation is simplified and assumes mnemonic is available post-unlock.
    // A more robust solution would use a temporary in-memory wallet instance.
    console.error("addAccount needs to be connected to a secure, in-memory mnemonic provider after unlock.");
    throw new Error("addAccount feature requires further implementation for security.");
    // The original implementation was insecure, so this is stubbed out for safety.
  },

  selectAccount: (accountId: string) => {
    const { accounts } = get();
    const account = accounts.find(acc => acc.id === accountId);
    if (account) {
      set({ currentAccount: account });
    }
  },

  getBalance: async (address: string): Promise<string> => {
    try {
      const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_PROJECT_ID');
      const balance = await provider.getBalance(address);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error('Failed to get balance:', error);
      return '0.0';
    }
  },
}));

// Initialize wallet state from localStorage
const initializeWallet = () => {
  if (localStorage.getItem('openweb3_encrypted_wallet')) {
    useWalletStore.setState({ isInitialized: true, isLocked: true });
  }
};

if (typeof window !== 'undefined') {
  initializeWallet();
}
