import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  // DialogDescription - removed unused import
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog';
import { Button } from './button';

type AlertType = 'info' | 'success' | 'warning' | 'error';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: AlertType;
  confirmText?: string;
}

const getAlertIcon = (type: AlertType) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    case 'warning':
      return <AlertCircle className="w-6 h-6 text-yellow-500" />;
    case 'error':
      return <XCircle className="w-6 h-6 text-red-500" />;
    case 'info':
    default:
      return <Info className="w-6 h-6 text-blue-500" />;
  }
};

const getAlertColors = (type: AlertType) => {
  switch (type) {
    case 'success':
      return {
        bg: 'bg-green-500/10 border-green-500/20',
        text: 'text-green-600 dark:text-green-400',
        button: 'success' as const
      };
    case 'warning':
      return {
        bg: 'bg-yellow-500/10 border-yellow-500/20',
        text: 'text-yellow-600 dark:text-yellow-400',
        button: 'gradient' as const
      };
    case 'error':
      return {
        bg: 'bg-red-500/10 border-red-500/20',
        text: 'text-red-600 dark:text-red-400',
        button: 'danger' as const
      };
    case 'info':
    default:
      return {
        bg: 'bg-blue-500/10 border-blue-500/20',
        text: 'text-blue-600 dark:text-blue-400',
        button: 'gradient' as const
      };
  }
};

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  confirmText
}) => {
  const { t } = useTranslation();
  const colors = getAlertColors(type);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[90vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {getAlertIcon(type)}
            <span>{title}</span>
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex items-start gap-3 p-4 rounded-lg border ${colors.bg}`}
          >
            {getAlertIcon(type)}
            <div className="text-sm flex-1">
              <p className={`font-medium ${colors.text}`}>
                {title}
              </p>
              <p className={`${colors.text}/80 mt-1`}>
                {message}
              </p>
            </div>
          </motion.div>
        </motion.div>

        <DialogFooter>
          <Button
            variant={colors.button}
            onClick={onClose}
            className="w-full"
          >
            {confirmText || t('common.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertModal;