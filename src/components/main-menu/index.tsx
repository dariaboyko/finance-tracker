import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './main-menu.scss';
import {
  HomeOutlined,
  BarChartOutlined,
  UserOutlined,
  SettingOutlined,
  DownOutlined,
  UpOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { logout } from 'services/authService';
import { getUserEmail, getUserName } from 'utils/tokenService';

const MainMenu = () => {
  const [showAnalyticsSubMenu, setShowAnalyticsSubMenu] = useState(true);
  const [currentPath, setCurrentPath] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = getUserEmail();
  const name = getUserName();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const toggleAnalyticsSubMenu = () => {
    setShowAnalyticsSubMenu(!showAnalyticsSubMenu);
  };

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
    navigate(path);
  };

  return (
    <section className="menu">
      <div>
        <div className="menu--title">
          <span>Tracker</span>
        </div>
        <ul className="menu--list">
          <li
            className={`menu--list--item ${currentPath === '/home' ? 'active' : ''}`}
            onClick={() => handleNavigation('/home')}>
            <HomeOutlined />
            <span>Home</span>
          </li>
          <li className="menu--list--item__expandable">
            <div
              onClick={() => handleNavigation('/analytics')}
              className={`title ${currentPath === '/analytics' ? 'active' : ''}`}>
              <BarChartOutlined />
              <span>Analytics</span>
            </div>
            {showAnalyticsSubMenu ? (
              <UpOutlined className="arrow" onClick={toggleAnalyticsSubMenu} />
            ) : (
              <DownOutlined className="arrow" onClick={toggleAnalyticsSubMenu} />
            )}
          </li>
          {showAnalyticsSubMenu && (
            <ul className="menu--list--item--submenu">
              <li
                onClick={() => handleNavigation('/incomes')}
                className={currentPath === '/incomes' ? 'active' : ''}>
                Incomes
              </li>
              <li
                onClick={() => handleNavigation('/expenses')}
                className={currentPath === '/expenses' ? 'active' : ''}>
                Expenses
              </li>
              <li
                onClick={() => handleNavigation('/debts')}
                className={currentPath === '/debts' ? 'active' : ''}>
                Debts
              </li>
            </ul>
          )}
          <li
            onClick={() => handleNavigation('/account')}
            className={currentPath === '/account' ? 'menu--list--item active' : 'menu--list--item'}>
            <UserOutlined />
            <span>Account</span>
          </li>
          {/* <li
            onClick={() => handleNavigation('/settings')}
            className={
              currentPath === '/settings' ? 'menu--list--item active' : 'menu--list--item'
            }>
            <SettingOutlined />
            <span>Settings</span>
          </li> */}
        </ul>
      </div>
      <footer className="footer">
        <div className="footer--info">
          <span>{name}</span>
          <span>{email}</span>
        </div>
        <LogoutOutlined
          onClick={() => {
            logout();
            handleNavigation('/login');
          }}
        />
      </footer>
    </section>
  );
};

export default MainMenu;
