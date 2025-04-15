import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LocalOrder } from "../pages/Order/CreateOrder";
import { RegisterOrder } from "../pages/Order/RegisterOrder";
import { FinishOrder } from "../pages/Order/FinishOrder";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LocalOrder />} />
        <Route path="/pedido" element={<RegisterOrder />} />
        <Route path="/conclusao" element={<FinishOrder/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
