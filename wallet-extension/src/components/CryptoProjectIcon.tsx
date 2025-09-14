import React from 'react';

interface CryptoProjectIconProps {
  name: string;
  className?: string;
}

export const CryptoProjectIcon: React.FC<CryptoProjectIconProps> = ({ name, className = '' }) => {
  const getProjectIcon = (projectName: string) => {
    const icons: { [key: string]: string } = {
      ethereum: `
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <g fill="none" fillRule="evenodd">
            <circle cx="16" cy="16" r="16" fill="#627EEA"/>
            <g fill="#FFF" fillRule="nonzero">
              <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z"/>
              <path d="M16.498 4L9 16.22l7.498-3.35z"/>
              <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z"/>
              <path d="M16.498 27.995v-6.028L9 17.616z"/>
              <path fillOpacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/>
              <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z"/>
            </g>
          </g>
        </svg>
      `,
      uniswap: `
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <g fill="none" fillRule="evenodd">
            <circle cx="16" cy="16" r="16" fill="#FF007A"/>
            <path d="M20.5 10.5c1.5 0 2.5 1 2.5 2.5v6c0 1.5-1 2.5-2.5 2.5h-9c-1.5 0-2.5-1-2.5-2.5v-6c0-1.5 1-2.5 2.5-2.5h9z" fill="#FFF"/>
            <circle cx="13" cy="15" r="2" fill="#FF007A"/>
            <circle cx="19" cy="17" r="1.5" fill="#FF007A"/>
          </g>
        </svg>
      `,
      polygon: `
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <g fill="none" fillRule="evenodd">
            <circle cx="16" cy="16" r="16" fill="#8247E5"/>
            <path d="M21.092 12.693c-.369-.215-.848-.215-1.232 0l-2.363 1.377-1.696.985-2.363 1.377c-.369.215-.848.215-1.232 0l-1.88-1.091c-.369-.215-.616-.646-.616-1.108v-2.182c0-.462.231-.893.616-1.108l1.88-1.091c.369-.215.848-.215 1.232 0l1.88 1.091c.369.215.616.646.616 1.108v1.377l1.696-.985v-1.377c0-.462-.231-.893-.616-1.108L13.844 6.508c-.369-.215-.848-.215-1.232 0L9.247 9.477c-.384.215-.616.646-.616 1.108v5.907c0 .462.247.893.616 1.108l3.365 1.954c.369.215.848.215 1.232 0l2.363-1.377 1.696-.985 2.363-1.377c.369-.215.848-.215 1.232 0l1.88 1.091c.369.215.616.646.616 1.108v2.182c0 .462-.231-.893-.616 1.108l-1.88 1.091c-.369-.215-.848-.215-1.232 0l-1.88-1.091c-.369-.215-.616-.646-.616-1.108v-1.377l-1.696.985v1.377c0 .462.231.893.616 1.108l3.365 1.954c.369.215.848.215 1.232 0l3.365-1.954c.384-.215.616-.646.616 1.108v-5.907c0-.462-.231-.893-.616-1.108l-3.365-1.954z" fill="#FFF"/>
          </g>
        </svg>
      `,
      chainlink: `
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <g fill="none" fillRule="evenodd">
            <circle cx="16" cy="16" r="16" fill="#375BD2"/>
            <path d="M16 6l2.5 1.5v3L16 12l-2.5-1.5v-3L16 6zm5 3l2.5 1.5v9L21 21l-2.5-1.5v-9L21 9zm-10 0L8.5 10.5v9L11 21l2.5-1.5v-9L11 9zm2.5 7.5v3L16 21l2.5-1.5v-3L16 15l-2.5 1.5z" fill="#FFF"/>
          </g>
        </svg>
      `,
      solana: `
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <g fill="none" fillRule="evenodd">
            <circle cx="16" cy="16" r="16" fill="url(#solana-gradient)"/>
            <defs>
              <linearGradient id="solana-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00FFA3"/>
                <stop offset="100%" stopColor="#DC1FFF"/>
              </linearGradient>
            </defs>
            <path d="M7.5 20.5c0-.276.224-.5.5-.5h15c.138 0 .263.056.354.146l1.5 1.5c.195.195.057.354-.146.354H8c-.276 0-.5-.224-.5-.5v-1zm0-8c0-.276.224-.5.5-.5h15c.138 0 .263.056.354-.146l1.5-1.5c.195-.195.057-.354-.146-.354H8c-.276 0-.5.224-.5.5v1zm17-4.5c0 .276-.224.5-.5.5H9c-.138 0-.263.056-.354.146l-1.5 1.5c-.195.195-.057.354.146.354H24c.276 0 .5-.224.5-.5v-1z" fill="#FFF"/>
          </g>
        </svg>
      `,
      avalanche: `
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <g fill="none" fillRule="evenodd">
            <circle cx="16" cy="16" r="16" fill="#E84142"/>
            <path d="M14.5 10l7 12H7.5l7-12zm1 2l-5 8h10l-5-8z" fill="#FFF"/>
          </g>
        </svg>
      `,
      arbitrum: `
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <g fill="none" fillRule="evenodd">
            <circle cx="16" cy="16" r="16" fill="#28A0F0"/>
            <path d="M8 20l3-6 3 6H8zm8-8l3 6 3-6-3-6-3 6zm-2 2l-3 6h6l-3-6z" fill="#FFF"/>
          </g>
        </svg>
      `,
      optimism: `
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <g fill="none" fillRule="evenodd">
            <circle cx="16" cy="16" r="16" fill="#FF0420"/>
            <path d="M12 12c-2 0-3 1-3 3s1 3 3 3h2c1 0 2-1 2-2s-1-2-2-2h-2zm8 0c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3z" fill="#FFF"/>
          </g>
        </svg>
      `
    };
    
    return icons[projectName] || icons.ethereum;
  };

  return (
    <div 
      className={`${className}`}
      dangerouslySetInnerHTML={{ __html: getProjectIcon(name) }}
    />
  );
};