import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactForm from "./ContactForm";
import SuccessPage from "./SuccessPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}
