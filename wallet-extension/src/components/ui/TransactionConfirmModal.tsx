import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowUp, ArrowDown, ArrowUpDown, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog';
import { Button } from './button';

interface TransactionData {
  type: 'send' | 'receive' | 'swap';
  fromToken?: string;
  toToken?: string;
  fromAmount?: string;
  toAmount?: string;
  toAddress?: string;
  fromAddress?: string;
  gasLimit?: string;
  gasPrice?: string;
  estimatedFee?: string;
  network?: string;
}

interface TransactionConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transaction: TransactionData;
  isLoading?: boolean;
}

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'send':
      return <ArrowUp className="w-6 h-6 text-red-500" />;
    case 'receive':
      return <ArrowDown className="w-6 h-6 text-green-500" />;
    case 'swap':
      return <ArrowUpDown className="w-6 h-6 text-blue-500" />;
    default:
      return <ArrowUp className="w-6 h-6 text-gray-500" />;
  }
};

const TransactionConfirmModal: React.FC<TransactionConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  transaction,
  isLoading = false
}) => {
  const { t } = useTranslation();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[90vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {getTransactionIcon(transaction.type)}
            <span className="capitalize">{t(`transaction.${transaction.type}`)}</span>
          </DialogTitle>
          <DialogDescription>
            {t('transaction.confirmDetails')}
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Transaction Details */}
          <div className="bg-uniswap-surface/30 dark:bg-uniswap-surface/30 bg-light-surface/30 rounded-lg p-4 space-y-3">

            {/* Send/Receive Amount */}
            {transaction.type === 'send' && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-uniswap-text-secondary dark:text-uniswap-text-secondary text-light-text-secondary">
                    {t('transaction.amount')}
                  </span>
                  <span className="font-semibold text-uniswap-text-primary dark:text-uniswap-text-primary text-light-text-primary">
                    {transaction.fromAmount} {transaction.fromToken}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-uniswap-text-secondary dark:text-uniswap-text-secondary text-light-text-secondary">
                    {t('transaction.to')}
                  </span>
                  <span className="font-mono text-sm text-uniswap-text-primary dark:text-uniswap-text-primary text-light-text-primary">
                    {transaction.toAddress && formatAddress(transaction.toAddress)}
                  </span>
                </div>
              </>
            )}

            {transaction.type === 'receive' && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-uniswap-text-secondary dark:text-uniswap-text-secondary text-light-text-secondary">
                    {t('transaction.amount')}
                  </span>
                  <span className="font-semibold text-green-500">
                    +{transaction.toAmount} {transaction.toToken}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-uniswap-text-secondary dark:text-uniswap-text-secondary text-light-text-secondary">
                    {t('transaction.from')}
                  </span>
                  <span className="font-mono text-sm text-uniswap-text-primary dark:text-uniswap-text-primary text-light-text-primary">
                    {transaction.fromAddress && formatAddress(transaction.fromAddress)}
                  </span>
                </div>
              </>
            )}

            {/* Swap Details */}
            {transaction.type === 'swap' && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-uniswap-text-secondary dark:text-uniswap-text-secondary text-light-text-secondary">
                    {t('transaction.from')}
                  </span>
                  <span className="font-semibold text-red-500">
                    -{transaction.fromAmount} {transaction.fromToken}
                  </span>
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="w-4 h-4 text-uniswap-text-tertiary dark:text-uniswap-text-tertiary text-light-text-tertiary" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-uniswap-text-secondary dark:text-uniswap-text-secondary text-light-text-secondary">
                    {t('transaction.to')}
                  </span>
                  <span className="font-semibold text-green-500">
                    +{transaction.toAmount} {transaction.toToken}
                  </span>
                </div>
              </>
            )}

            {/* Network & Gas */}
            <div className="border-t border-uniswap-surface/50 dark:border-uniswap-surface/50 border-light-surface/50 pt-3 space-y-2">
              {transaction.network && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-uniswap-text-secondary dark:text-uniswap-text-secondary text-light-text-secondary">
                    {t('transaction.network')}
                  </span>
                  <span className="text-sm font-medium text-uniswap-text-primary dark:text-uniswap-text-primary text-light-text-primary">
                    {transaction.network}
                  </span>
                </div>
              )}
              {transaction.estimatedFee && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-uniswap-text-secondary dark:text-uniswap-text-secondary text-light-text-secondary">
                    {t('transaction.estimatedFee')}
                  </span>
                  <span className="text-sm font-medium text-uniswap-text-primary dark:text-uniswap-text-primary text-light-text-primary">
                    {transaction.estimatedFee}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Warning */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20"
          >
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-yellow-600 dark:text-yellow-400">
                {t('transaction.warning')}
              </p>
              <p className="text-yellow-600/80 dark:text-yellow-400/80 mt-1">
                {t('transaction.warningMessage')}
              </p>
            </div>
          </motion.div>
        </motion.div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 sm:flex-none"
          >
            {t('common.cancel')}
          </Button>
          <Button
            variant="gradient"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 sm:flex-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t('transaction.confirming')}
              </>
            ) : (
              t('transaction.confirm')
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionConfirmModal;