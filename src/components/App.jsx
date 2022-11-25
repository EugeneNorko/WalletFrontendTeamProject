import { Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// import PrivatRoutes from './protectedRoutes/privatRoutes';
import PublicRoutes from './protectedRoutes/publicRoutes';

import LoginPage from '../pages/LoginPage';
import { DashboardPage } from '../pages/dashboardPage/DashboardPage';
import { RegistrationPage } from '../pages/registrationPage/registrationPage';
import { DiagramTab } from './diagramTab/diagramTab';
import { HomeTab } from './homeTab/homeTab';
// import Currency from './currency/Currency';

export const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* <Route element={<PrivatRoutes />}> */}
        <Route path="/" element={<DashboardPage />}>
          <Route path="homeTab" element={<HomeTab />} />
          <Route path="diagramTab" element={<DiagramTab />} />
          {/* <Route path="currency" element={<Currency />} /> */}
        </Route>
        {/* </Route> */}

        <Route path="*" element={<Navigate to="login" />} />
      </Routes>
    </>
  );
};
