import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthRedirect from 'hooks/authRedirect';
import Login from 'pages/login';
import MainWrapper from 'components/main-wrapper';
import DashBoard from 'pages/dashboard';

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
                      <Route index element={<Navigate to="/dashboard" />} />
                      <Route path="/dashboard" element={<DashBoard />} />
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
