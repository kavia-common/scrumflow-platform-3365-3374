import React from 'react';

// PUBLIC_INTERFACE
export default function Button({ children, variant = 'primary', ...rest }) {
  /** Styled button using theme classes */
  const cls = ['btn'];
  if (variant === 'secondary') cls.push('secondary');
  if (variant === 'ghost') cls.push('ghost');
  return <button className={cls.join(' ')} {...rest}>{children}</button>;
}
