import React from 'react';

function Footer() {
    return (
      <footer className="footer">
        <p className="footer__copyright">&copy; {new Date().getFullYear()} Mesto of travel</p>
      </footer>
    );
  }

  export default Footer;