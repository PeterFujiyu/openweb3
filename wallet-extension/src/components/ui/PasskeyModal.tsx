import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, ShieldCheck, Smartphone, AlertTriangle, CheckCircle } from 'lucide-react';
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

interface PasskeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (passkeyData: any) => void;
  onError?: (error: string) => void;
}

type PasskeyStep = 'intro' | 'authenticating' | 'success' | 'error';

const PasskeyModal: React.FC<PasskeyModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onError
}) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<PasskeyStep>('intro');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasskeySetup = async () => {
    setIsLoading(true);
    setCurrentStep('authenticating');

    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        throw new Error(t('passkey.notSupported'));
      }

      // Create passkey credential
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: crypto.getRandomValues(new Uint8Array(32)),
          rp: {
            name: "OpenWeb3 Wallet",
            id: "localhost"
          },
          user: {
            id: crypto.getRandomValues(new Uint8Array(32)),
            name: "wallet@openweb3.me",
            displayName: "OpenWeb3 Wallet User"
          },
          pubKeyCredParams: [
            { alg: -7, type: "public-key" },
            { alg: -257, type: "public-key" }
          ],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
            requireResidentKey: false
          },
          timeout: 60000,
          attestation: "direct"
        }
      });

      if (credential) {
        setCurrentStep('success');
        setTimeout(() => {
          onSuccess(credential);
          onClose();
        }, 2000);
      }
    } catch (error: any) {
      console.error('Passkey setup failed:', error);
      setErrorMessage(error.message || t('passkey.setupFailed'));
      setCurrentStep('error');
      onError?.(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setCurrentStep('intro');
    setErrorMessage('');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'intro':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Fingerprint className="w-6 h-6 text-purple-500" />
                </motion.div>
                <span>{t('passkey.setupTitle')}</span>
              </DialogTitle>
              <DialogDescription>
                {t('passkey.setupDescription')}
              </DialogDescription>
            </DialogHeader>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Features */}
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <ShieldCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {t('passkey.secureTitle')}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {t('passkey.secureDescription')}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <Smartphone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {t('passkey.convenientTitle')}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {t('passkey.convenientDescription')}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Info box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="p-3 rounded-xl border bg-blue-50 border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/20"
              >
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-blue-700 dark:text-blue-400">
                    <p className="font-medium">{t('passkey.noteTitle')}</p>
                    <p className="mt-1">{t('passkey.noteDescription')}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        );

      case 'authenticating':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Fingerprint className="w-6 h-6 text-purple-500" />
                </motion.div>
                <span>{t('passkey.authenticating')}</span>
              </DialogTitle>
              <DialogDescription>
                {t('passkey.authenticatingDescription')}
              </DialogDescription>
            </DialogHeader>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-8"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-4"
              >
                <Fingerprint className="w-10 h-10 text-purple-500" />
              </motion.div>
              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                {t('passkey.followPrompts')}
              </p>
            </motion.div>
          </>
        );

      case 'success':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </motion.div>
                <span>{t('passkey.successTitle')}</span>
              </DialogTitle>
              <DialogDescription>
                {t('passkey.successDescription')}
              </DialogDescription>
            </DialogHeader>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4"
              >
                <CheckCircle className="w-10 h-10 text-green-500" />
              </motion.div>
              <p className="text-sm text-center text-green-600 dark:text-green-400">
                {t('passkey.setupComplete')}
              </p>
            </motion.div>
          </>
        );

      case 'error':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <span>{t('passkey.errorTitle')}</span>
              </DialogTitle>
              <DialogDescription>
                {errorMessage}
              </DialogDescription>
            </DialogHeader>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl border bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20"
            >
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-700 dark:text-red-400">
                  <p className="font-medium">{t('passkey.troubleshootTitle')}</p>
                  <ul className="mt-2 space-y-1 text-xs">
                    <li>• {t('passkey.troubleshoot1')}</li>
                    <li>• {t('passkey.troubleshoot2')}</li>
                    <li>• {t('passkey.troubleshoot3')}</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        );

      default:
        return null;
    }
  };

  const renderFooter = () => {
    switch (currentStep) {
      case 'intro':
        return (
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button
              variant="gradient"
              onClick={handlePasskeySetup}
              disabled={isLoading}
            >
              <Fingerprint className="w-4 h-4 mr-2" />
              {t('passkey.setupNow')}
            </Button>
          </DialogFooter>
        );

      case 'authenticating':
        return (
          <DialogFooter>
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              {t('common.cancel')}
            </Button>
          </DialogFooter>
        );

      case 'success':
        return null; // Auto-closes

      case 'error':
        return (
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={onClose}>
              {t('common.close')}
            </Button>
            <Button variant="gradient" onClick={handleRetry}>
              {t('passkey.tryAgain')}
            </Button>
          </DialogFooter>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[90vw]">
        {renderStepContent()}
        {renderFooter()}
      </DialogContent>
    </Dialog>
  );
};

export default PasskeyModal;