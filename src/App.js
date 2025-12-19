import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/member/add" element={<MemberAdd />} />
        <Route path="/member/del" element={<MemberDel />} />
      </Routes>
    </Layout>
  );
}

export default App;
