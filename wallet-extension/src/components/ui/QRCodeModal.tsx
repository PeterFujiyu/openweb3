import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Share2, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog';
import { Button } from './button';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  value: string;
  copyText?: string;
  showActions?: boolean;
  size?: number;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  value,
  copyText,
  showActions = true,
  size = 200
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);

      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title || t('qr.shareTitle'),
          text: copyText || value,
        });
      } else {
        await handleCopy();
      }
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[90vw]">
        <DialogHeader>
          <DialogTitle>
            {title || t('qr.title')}
          </DialogTitle>
          {description && (
            <DialogDescription>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center space-y-4"
        >
          {/* QR Code */}
          <div className="p-4 bg-white rounded-lg shadow-inner">
            <QRCode
              id="qr-code-svg"
              value={value}
              size={size}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox="0 0 256 256"
            />
          </div>

          {/* Address/Value Display */}
          <div className="w-full">
            <div className="flex items-center justify-between p-3 bg-uniswap-surface/30 dark:bg-uniswap-surface/30 bg-light-surface/30 rounded-lg">
              <span className="font-mono text-sm text-uniswap-text-primary dark:text-uniswap-text-primary text-light-text-primary break-all">
                {copyText || value}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="ml-2 flex-shrink-0"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          {showActions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex gap-2 w-full"
            >
              <Button
                variant="outline"
                onClick={handleCopy}
                className="flex-1"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? t('qr.copied') : t('qr.copy')}
              </Button>
              <Button
                variant="outline"
                onClick={handleDownload}
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('qr.download')}
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="flex-1"
              >
                <Share2 className="w-4 h-4 mr-2" />
                {t('qr.share')}
              </Button>
            </motion.div>
          )}
        </motion.div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="w-full">
            {t('common.close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;