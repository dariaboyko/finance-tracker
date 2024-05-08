import './home.scss';
import image from '../../assets/images/home.png';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getUserName } from 'utils/tokenService';

const HomePage = () => {
  const navigate = useNavigate();
  const name = getUserName();

  const handleAnalyticsClick = () => {
    navigate('/analytics');
  };

  return (
    <section className="home">
      <div className="home--main">
        <img src={image} className="home--image" />
        <div className="home--text">
          <header className="home--subtitle">Welcome, {name}!</header>
          <div className="home--title">
            Track your spending, save more, and achieve your financial goals effortlessly.
          </div>
          <div>
            Monitor your expenses, boost savings, and reach your financial milestones with our
            intuitive finance tracking tool.
            <br></br>Take control of your finances today!
          </div>
          <Button type="primary" className="home--button" onClick={handleAnalyticsClick}>
            Go to Analytics <ArrowRightOutlined />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
