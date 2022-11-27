import { Outlet } from 'react-router-dom';
import Media from 'react-media';
import {
  Section,
  ContainerDashboard,
  Container,
  MainPage,
} from './DashboardPage.styled';
import Dashboard from 'components/dashboard/Dashboard';

export function DashboardPage() {
  return (
    <>
      <MainPage>
        <Media
          query="(max-width: 767px)"
          render={() => (
            // <Section>
            <Container>
              <ContainerDashboard>
                <Dashboard />
              </ContainerDashboard>
              <Outlet />
            </Container>
            // </Section>
          )}
        />
        <Media
          query="(min-width: 768px)"
          render={() => (
            <Section>
              <Container>
                <ContainerDashboard>
                  <Dashboard />
                  <Outlet />
                </ContainerDashboard>
              </Container>
            </Section>
          )}
        />
      </MainPage>
    </>
  );
}
