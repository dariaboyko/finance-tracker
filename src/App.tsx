import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthRedirect from 'hooks/authRedirect';
import Login from 'pages/login';

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
                  {/* Wrap nested routes in a Routes component */}
                  <Routes>
                    <Route index element={<Navigate to="/home" />} />
                    <Route path="/home" element={<div />} />
                  </Routes>
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
