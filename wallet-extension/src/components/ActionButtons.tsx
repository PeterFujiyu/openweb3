import React, { useState } from 'react';
import { ArrowUpDown, Building, ArrowUp, ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TransactionConfirmModal, QRCodeModal, ConfirmModal } from './ui';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  gradient: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, gradient, onClick }) => (
  <motion.button 
    className={`${gradient} p-4 rounded-xl flex flex-col items-start space-y-3 hover:opacity-90 transition-opacity`}
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="w-8 h-8 bg-black/20 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <span className="font-semibold text-white">{label}</span>
  </motion.button>
);

export const ActionButtons: React.FC = () => {
  const { t } = useTranslation();
  const [modals, setModals] = useState({
    swap: false,
    buy: false,
    send: false,
    receive: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const openModal = (type: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [type]: true }));
  };

  const closeModal = (type: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [type]: false }));
  };

  const handleConfirm = async (type: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      closeModal(type as keyof typeof modals);
      console.log(`${type} confirmed`);
    }, 2000);
  };

  // Example wallet address for QR code
  const walletAddress = "0x742e4C842694F455A1c8E2bD8a1ee28962b9B88a";

  const actions = [
    {
      icon: <ArrowUpDown size={20} />,
      label: t('wallet.swap'),
      gradient: 'bg-gradient-to-br from-pink-500/50 to-purple-600/50',
      onClick: () => openModal('swap')
    },
    {
      icon: <Building size={20} />,
      label: t('wallet.buy'),
      gradient: 'bg-gradient-to-br from-blue-500/50 to-purple-600/50',
      onClick: () => openModal('buy')
    },
    {
      icon: <ArrowUp size={20} />,
      label: t('wallet.send'),
      gradient: 'bg-gradient-to-br from-green-500/50 to-purple-600/50',
      onClick: () => openModal('send')
    },
    {
      icon: <ArrowDown size={20} />,
      label: t('wallet.receive'),
      gradient: 'bg-gradient-to-br from-red-500/50 to-purple-600/50',
      onClick: () => openModal('receive')
    }
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ActionButton {...action} />
          </motion.div>
        ))}
      </div>

      {/* Modals */}
      <TransactionConfirmModal
        isOpen={modals.swap}
        onClose={() => closeModal('swap')}
        onConfirm={() => handleConfirm('swap')}
        isLoading={isLoading}
        transaction={{
          type: 'swap',
          fromToken: 'ETH',
          toToken: 'DAI',
          fromAmount: '0.1',
          toAmount: '245.67',
          network: 'Ethereum',
          estimatedFee: '0.0025 ETH (~$6.12)'
        }}
      />

      <ConfirmModal
        isOpen={modals.buy}
        onClose={() => closeModal('buy')}
        onConfirm={() => handleConfirm('buy')}
        title={t('wallet.buy')}
        description="This will open the buy/sell interface"
        type="info"
        isLoading={isLoading}
      />

      <TransactionConfirmModal
        isOpen={modals.send}
        onClose={() => closeModal('send')}
        onConfirm={() => handleConfirm('send')}
        isLoading={isLoading}
        transaction={{
          type: 'send',
          fromToken: 'ETH',
          fromAmount: '0.05',
          toAddress: '0x1234...5678',
          network: 'Ethereum',
          estimatedFee: '0.002 ETH (~$4.85)'
        }}
      />

      <QRCodeModal
        isOpen={modals.receive}
        onClose={() => closeModal('receive')}
        title={t('wallet.receive')}
        description="Share this QR code or address to receive payments"
        value={walletAddress}
        copyText={walletAddress}
      />
    </>
  );
};