import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Instrumentos from '../pages/Instrumentos';
import Home from '../pages/Home';
import DondeEstamos from '../pages/DondeEstamos';
import GrillaInstrumentos from '../pages/GrillaInstrumentos';





const Rutas: React.FC = () => {
    return (
      
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Instrumentos />} />
              <Route path="/dondeEstamos" element={<DondeEstamos />} />
              
              <Route path="/grillaInstrumentos" element={<GrillaInstrumentos />} />
             
            </Routes>
       
      
    );
  }
  
  export default Rutas;