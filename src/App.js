import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './layouts/layout';
import { Home } from './pages/home';
import { Map } from './pages/map';
import { Login } from './pages/login';
import { LoginCallback } from './pages/login/callback';
import { MemberAdd } from './pages/member/add';
import { MemberDel } from './pages/member/del';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="/member/add" element={<MemberAdd />} />
        <Route path="/member/del" element={<MemberDel />} />
      </Routes>
    </Layout>
  );
}

export default App;
