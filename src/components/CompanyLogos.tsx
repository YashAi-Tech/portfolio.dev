import React from 'react';

export const DoearnoLogo: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect width="100" height="100" rx="26" fill="#111111" />
    {/* Stylized D mark with inward fold */}
    <path
      d="M34 26H56C72 26 80 36 80 50C80 64 72 74 56 74H42L34 62V26ZM42 36V58L47 64H55C65 64 70 58 70 50C70 42 65 36 55 36H42Z"
      fill="#FFFFFF"
    />
  </svg>
);

export const FunngroLogo: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect width="100" height="100" rx="26" fill="#0A0F0D" />
    {/* Bar chart lines */}
    <rect x="24" y="24" width="8" height="24" rx="3" fill="#10B981" />
    <rect x="38" y="16" width="8" height="32" rx="3" fill="#10B981" />
    <rect x="52" y="10" width="8" height="38" rx="3" fill="#10B981" />
    <rect x="66" y="2" width="8" height="46" rx="3" fill="#10B981" />
    {/* Paper Airplane */}
    <path
      d="M20 48L78 30L48 76L42 56L20 48Z"
      fill="#10B981"
    />
    <path
      d="M42 56L78 30L48 64L42 56Z"
      fill="#059669"
    />
    {/* Circular return arrow */}
    <path
      d="M24 74C24 82 32 88 44 88C56 88 68 82 78 72"
      stroke="#10B981"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M72 68L80 72L76 80"
      stroke="#10B981"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const InfusedPathLogo: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect width="100" height="100" rx="26" fill="#4F46E5" />
    {/* Lightning Bolt / Automation Path */}
    <path
      d="M54 18L26 54H48L44 82L74 46H50L54 18Z"
      fill="#FFFFFF"
    />
  </svg>
);
