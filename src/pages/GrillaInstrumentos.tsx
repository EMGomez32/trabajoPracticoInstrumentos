import React, { useEffect, useState } from "react";
import TablaGrilla from "../components/table/TablaGrilla";
import { Instrumentos, getInstrumentos } from "../service/ServiceInstrumentos";
import { Button, Modal, Form } from "antd";
import FormularioInstrumento from "../components/form/FormularioInstrumento";

export default function GrillaInstrumentos() {
  const [instrumentos, setInstrumentos] = useState<Instrumentos[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        fetch("http://localhost:8080/instrumentos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setIsModalVisible(false);
            form.resetFields();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
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
      >
        <FormularioInstrumento  form={form}/>
      </Modal>
      <TablaGrilla datos={instrumentos} />
    </>
  );
}
