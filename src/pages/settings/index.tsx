import './settings.scss';
import { useEffect, useState } from 'react';
const SettingsPage = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <section className="settings">
      <header className="settings--title">Settings</header>
      <div className="settings--main"> </div>
    </section>
  );
};

export default SettingsPage;
