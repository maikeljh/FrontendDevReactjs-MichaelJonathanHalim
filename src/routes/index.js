import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RestaurantDetail from "../pages/detail";
import Main from "../pages/main";

const RouteIndex = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
      </Routes>
    </Router>
  );
};

export default RouteIndex;
