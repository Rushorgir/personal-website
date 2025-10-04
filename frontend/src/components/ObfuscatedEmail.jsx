import React from 'react';

const ObfuscatedEmail = ({ email, className, children }) => {
  // Obfuscate the email by encoding it
  const obfuscate = (str) => {
    return btoa(str); // Base64 encode
  };

  const handleClick = (e) => {
    e.preventDefault();
    // Decode and open mailto link
    const decodedEmail = atob(obfuscate(email));
    window.location.href = `mailto:${decodedEmail}`;
  };

  return (
    <a
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
