// import {SimpleSlateEditor} from "./components/SimpleSlateEditor.tsx";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.less';
import TextPage from './pages/text.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/text" />} />
        <Route path="/text" element={<TextPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
