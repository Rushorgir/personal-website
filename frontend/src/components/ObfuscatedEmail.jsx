import React, { useRef, useEffect } from 'react';

const ObfuscatedEmail = ({ className, children }) => {
  // Base64 encoded email string (kept encoded in source)
  const encodedEmail = 'bmF5eWFycnVzaGFuQGdtYWlsLmNvbQ==';
  const anchorRef = useRef(null);

  useEffect(() => {
    // Decode on the client and set href so bots scraping static HTML don't see it
    try {
      const decoded = atob(encodedEmail);
      if (anchorRef.current) {
        anchorRef.current.setAttribute('href', `mailto:${decoded}`);
      }
    } catch (err) {
      // If atob isn't available or decoding fails, leave href as '#'
      console.warn('Failed to decode email', err);
    }
  }, []);

  const handleClick = (e) => {
    // If href has been set to mailto, let the default action proceed.
    const el = anchorRef.current;
    const href = el ? el.getAttribute('href') : null;
    if (!href || href === '#') {
      e.preventDefault();
      try {
        const decodedEmail = atob(encodedEmail);
        window.location.href = `mailto:${decodedEmail}`;
      } catch (err) {
        console.warn('Failed to open mail client', err);
      }
    }
    // otherwise allow the anchor to work normally
  };

  return (
    <a
      ref={anchorRef}
      href="#"
      onClick={handleClick}
      className={className}
      aria-label="Send email"
    >
      {children}
    </a>
  );
};

export default ObfuscatedEmail;
