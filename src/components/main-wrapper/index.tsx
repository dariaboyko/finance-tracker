import React from 'react';
import MainMenu from 'components/main-menu';
import './main-wrapper.scss';

interface MainWrapperProps {
  children?: React.ReactNode;
}

const MainWrapper: React.FC<MainWrapperProps> = (props) => {
  return (
    <section className="dashboard--background">
      {props.children}
      <MainMenu />
    </section>
  );
};

export default MainWrapper;
