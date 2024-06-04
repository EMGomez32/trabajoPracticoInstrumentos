// DetalleModal.js
import { Modal, Row, Col, Badge, Button } from 'antd';
import { useEffect, useState } from 'react';
import { buscarInstrumentoXId } from '../../service/ServiceInstrumentos';
import { ShoppingCartOutlined } from '@ant-design/icons';

interface DetalleModalProps {
    isVisible: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    instrumentoId: string | number;
}

const DetalleModal: React.FC<DetalleModalProps> = ({ isVisible, handleOk, handleCancel, instrumentoId }) => {
    const [instrumento, setInstrumento] = useState(null);

    useEffect(() => {
        const fetchInstrumento = async () => {
            if (instrumentoId) {
                try {
                    const instrumentoData = await buscarInstrumentoXId(instrumentoId);
                    setInstrumento(instrumentoData);
                } catch (error) {
                    console.error('Error fetching instrumento:', error);
                }
            }
        };

        fetchInstrumento();
    }, [instrumentoId]);

    return (
        <Modal title="Detalle" visible={isVisible} onOk={handleOk} onCancel={handleCancel} width={800} footer={null}>
            <Row >
                <Col span={15}>
                    {instrumento && (
                        <>
                            <img src={`./img/${instrumento.imagen}`} alt="Instrumento" style={{ width: '80%' }} />
                            <p>{instrumento.descripcion}</p>
                        </>
                    )}
                </Col>
                <Col span={5}>
                    {instrumento && (
                        <>
                            <p style={{ color: 'gray' }}>{instrumento.cantidadVendida} vendidos</p>
                            <p><h2>{instrumento.instrumento}</h2></p>
                            <p><h1>$ {instrumento.precio}</h1></p>
                            <p>Marca: {instrumento.marca}</p>
                            <p>Modelo: {instrumento.modelo}</p>
                            {instrumento.costoEnvio === "G" ? (
                                <Badge
                                    count="Envío gratis a todo el país"
                                    style={{ backgroundColor: "#52c41a" }}
                                />
                            ) : (
                                <Badge
                                    count={'Costo de envío interior de Argentina: $' + instrumento.costoEnvio}
                                    style={{ backgroundColor: "#FFA500" }}
                                />
                            )}
                            <br />
                            <br />
                            <Button type="primary" icon={<ShoppingCartOutlined />}>
                                Agregar al carrito
                            </Button>

                        </>
                    )}
                </Col>
            </Row>
        </Modal>
    );
};

export default DetalleModal;
