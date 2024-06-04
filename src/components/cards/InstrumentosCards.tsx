import React, { useEffect, useState } from "react";
import { Card, Col, Row, Badge } from "antd";
import {
  Instrumentos,
  getInstrumentos,
} from "../../service/ServiceInstrumentos"; // Asegúrate de que esta ruta sea correcta

const { Meta } = Card;

const InstrumentosCard: React.FC = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumentos[]>([]);

  useEffect(() => {
    const fetchInstrumentos = async () => {
      const data = await getInstrumentos();
      setInstrumentos(data);
    };

    fetchInstrumentos();
  }, []);

  return (
    <div style={{ display: 'flex', padding: '20px', marginLeft: "20px" }}>
      <Row gutter={[16, 16]}>
        {instrumentos.map((instrumento) => (
          <Col span={24} key={instrumento.id}>
            <Card hoverable style={{ width: "60%" }}>
              <Row>
                <Col span={2}>
                  <img
                    alt={instrumento.instrumento}
                    src={`./img/${instrumento.imagen}`}
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col span={18} style={{ marginLeft: "20px", fontSize: "18px" }}>
                  <Meta title={instrumento.instrumento} />
                  <p>Precio: ${instrumento.precio}</p>
                  {instrumento.costoEnvio === "G" ? (
                    <Badge
                      count="Envío gratis a todo el país"
                      style={{ backgroundColor: "#52c41a" }}
                    />
                  ) : (
                    <p style={{ color: "#FFA500" }}>
                      Costo de envío interior de Argentina: $
                      {instrumento.costoEnvio}
                    </p>
                  )}
                  <p>Cantidad Vendida: {instrumento.cantidadVendida}</p>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default InstrumentosCard;
