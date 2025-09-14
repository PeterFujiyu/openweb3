import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, XCircle, Loader2 } from 'lucide-react';
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

type ConfirmModalType = 'warning' | 'danger' | 'info' | 'success';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  type?: ConfirmModalType;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const getModalIcon = (type: ConfirmModalType) => {
  switch (type) {
    case 'warning':
      return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    case 'danger':
      return <XCircle className="w-6 h-6 text-red-500" />;
    case 'success':
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    case 'info':
    default:
      return <Info className="w-6 h-6 text-blue-500" />;
  }
};

const getModalColors = (type: ConfirmModalType) => {
  switch (type) {
    case 'warning':
      return {
        bg: 'bg-yellow-500/10 border-yellow-500/20',
        text: 'text-yellow-600 dark:text-yellow-400',
        buttonVariant: 'gradient' as const
      };
    case 'danger':
      return {
        bg: 'bg-red-500/10 border-red-500/20',
        text: 'text-red-600 dark:text-red-400',
        buttonVariant: 'danger' as const
      };
    case 'success':
      return {
        bg: 'bg-green-500/10 border-green-500/20',
        text: 'text-green-600 dark:text-green-400',
        buttonVariant: 'success' as const
      };
    case 'info':
    default:
      return {
        bg: 'bg-blue-500/10 border-blue-500/20',
        text: 'text-blue-600 dark:text-blue-400',
        buttonVariant: 'gradient' as const
      };
  }
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  type = 'info',
  isLoading = false,
  children
}) => {
  const { t } = useTranslation();
  const colors = getModalColors(type);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[90vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {getModalIcon(type)}
            <span>{title}</span>
          </DialogTitle>
          {description && (
            <DialogDescription>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Custom Content or Default Message */}
          {children ? (
            <div className="space-y-4">
              {children}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex items-start gap-3 p-4 rounded-lg border ${colors.bg}`}
            >
              {getModalIcon(type)}
              <div className="text-sm">
                <p className={`font-medium ${colors.text}`}>
                  {title}
                </p>
                {description && (
                  <p className={`${colors.text}/80 mt-1`}>
                    {description}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 sm:flex-none"
          >
            {cancelText || t('common.cancel')}
          </Button>
          <Button
            variant={colors.buttonVariant}
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 sm:flex-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t('common.processing')}
              </>
            ) : (
              confirmText || t('common.confirm')
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;