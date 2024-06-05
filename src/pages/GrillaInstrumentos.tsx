import  { useEffect, useState } from "react";
import TablaGrilla from "../components/table/TablaGrilla";
import { getInstrumentos, Instrumentos } from "../service/ServiceInstrumentos";
import { Button, Modal } from "antd";
import FormularioInstrumento from "../components/form/FormularioInstrumento";

export default function GrillaInstrumentos() {
  const [instrumentos, setInstrumentos] = useState<Instrumentos[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchInstrumentos = async () => {
      const data = await getInstrumentos();
      setInstrumentos(data);
    };

    fetchInstrumentos();
  }, []);

  return (
    <>
      <div>GrillaInstrumentos</div>
      <Button type="primary" onClick={showModal}>
        Agregar Instrumentos
      </Button>
      <Modal
        title="Agregar Instrumentos"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={null}
      >
        <FormularioInstrumento />
      </Modal>
      <TablaGrilla datos={instrumentos} />
    </>
  );
}
