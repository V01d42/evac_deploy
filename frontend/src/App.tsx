import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TopPage } from './pages/top';
import { LoginPage } from './pages/login';
import SignupPage from './pages/signup/SignupPage';
import { ScorePage } from './pages/score';
import { FormPage } from '@/components/pages/form';
import { HeaderLayout } from '@/components/layout/HeaderLayout';

function App() {
  return (
    <HeaderLayout>
      <Router>
        <Routes>
          <Route path='/' element={<TopPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/form' element={<FormPage />} />
          <Route path='/score' element={<ScorePage />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
      </Router>
    </HeaderLayout>
  );
}

export default App;
