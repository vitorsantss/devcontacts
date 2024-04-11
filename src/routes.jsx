import Home from "@/pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "@/pages/notFound";
import Header from "./components/Header";
import Footer from "./components/Footer";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
