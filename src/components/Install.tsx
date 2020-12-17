// Module Start
// JS imports
import React, { FC, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TagManager from 'react-gtm-module';

// Install
const Install: FC = () => {
  const [
    installPrompt,
    setInstallPrompt,
  ] = useState<BeforeInstallPromptEvent | null>(null);
  // Install handler
  const handleInstall: () => void = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt', choice);
        } else {
          console.log('User dismissed the A2HS prompt', choice);
        }

        setInstallPrompt(null);
      });
    }
  };
  // Install prompt handler
  const handleInstallPrompt: (e: BeforeInstallPromptEvent) => void = (e) => {
    setInstallPrompt(e);
  };
  // Install log handler
  const handleInstallLog: () => void = () => {
    // Google Tag Manager Event
    TagManager.dataLayer({
      dataLayer: {
        event: 'install',
      },
    });
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    window.addEventListener('appinstalled', handleInstallLog);
  }, []);

  return (
    // Install Start
    <section className="install">
      <h6>Install</h6>
    </section>
    // Install End
  );
};

// Properties validation
Install.propTypes = {};

// Module export
export default Install;
// Module End
