import React from 'react';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface BalanceSectionProps {
  balance: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

export const BalanceSection: React.FC<BalanceSectionProps> = ({ 
  balance, 
  change, 
  changePercent, 
  isPositive 
}) => {
  return (
    <motion.div 
      className="my-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-4xl font-bold tracking-tight text-uniswap-text-primary dark:text-uniswap-text-primary light:text-light-text-primary">
        {balance}
      </h1>
      <div className={`flex items-center text-sm mt-1 ${        isPositive 
          ? 'text-uniswap-green' 
          : 'text-uniswap-red'
      }`}>
        <TrendingUp 
          size={16} 
          className={`mr-1 ${!isPositive ? 'rotate-180' : ''}`}
        />
        <span>{change} ({changePercent})</span>
      </div>
    </motion.div>
  );
};