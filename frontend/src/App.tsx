import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TopPage } from '@/components/pages/top';
import { LoginPage } from '@/components/pages/login';
import { ScorePage } from '@/components/pages/score';
import { FormPage } from '@/components/pages/form';
import { HeaderLayout } from '@/components/layout/HeaderLayout';
import { AuthProvider } from './context/auth.context';
import { SignupPage } from './components/pages/signup';
import { ModalProvider } from './context/modal.context';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ModalProvider>
          <HeaderLayout>
            <Routes>
              <Route path='/' element={<TopPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/form' element={<FormPage />} />
              <Route path='/score' element={<ScorePage />} />
            </Routes>
          </HeaderLayout>
        </ModalProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
