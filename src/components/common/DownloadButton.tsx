import React from 'react';
import { FiDownload } from 'react-icons/fi';

interface DownloadButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  onClick,
  loading = false,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-md
        transition-all duration-200
        ${disabled || loading
          ? 'bg-gray-600 cursor-not-allowed'
          : 'bg-[#5865F2] hover:bg-[#4752C4] cursor-pointer'
        }
      `}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <FiDownload className="w-5 h-5" />
      )}
      <span className="text-white font-medium">
        {loading ? 'Generating PDF...' : 'Download Worksheet'}
      </span>
    </button>
  );
};
