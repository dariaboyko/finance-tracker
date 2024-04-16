import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthRedirect from 'hooks/authRedirect';
import Login from 'pages/login';
import MainWrapper from 'components/main-wrapper';
import AnalyticsPage from 'pages/analytics';
import HomePage from 'pages/home';

function App() {
  return (
    <>
      <ConfigProvider theme={{ cssVar: true }}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <AuthRedirect>
                  <MainWrapper>
                    <Routes>
                      <Route index element={<Navigate to="/home" />} />
                      <Route path="/home" element={<HomePage />} />
                      <Route path="/analytics" element={<AnalyticsPage />} />
                    </Routes>
                  </MainWrapper>
                </AuthRedirect>
              }
            />
          </Routes>
        </Router>
      </ConfigProvider>
    </>
  );
}

export default App;
