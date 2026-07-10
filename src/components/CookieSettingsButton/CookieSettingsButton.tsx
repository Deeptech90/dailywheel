'use client';

interface CookieSettingsButtonProps {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function CookieSettingsButton({ label = 'Open Privacy Settings', className, style }: CookieSettingsButtonProps) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('open-cookie-settings'));
  };

  return (
    <button
      id="trigger-preferences-btn"
      className={className}
      style={style}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
