import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Modal,
  Row,
  Col,
  notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";

import { cargarInstrumentos } from "../../service/ServiceInstrumentos";
import { mostrarCategorias } from "../../service/ServiceCategoria";

interface Categoria {
  id?: number;
  denominacion: string;
}

interface Props {
  onClose: () => void; // Función para cerrar el modal
}

const FormularioInstrumento: React.FC<Props> = ({ onClose }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [form] = Form.useForm();
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await mostrarCategorias();
      setCategorias(data);
    };

    fetchCategorias();
  }, []);

  const onFinish = (values: any) => {
    const { categoria, ...rest } = values;
    const formData = new FormData();
    formData.append(
      "instrumento",
      JSON.stringify({ ...rest, categoria: { id: categoria } })
    );

    cargarInstrumentos(formData)
      .then((data) => {
        console.log(data);
        notification.success({
          message: "Instrumento Guardado",
          description: "El instrumento se ha guardado correctamente.",
        });
        form.resetFields(); // Limpiar el formulario después de agregar/editar el instrumento
        onClose(); // Cerrar el modal
      })
      .catch((error) => {
        console.error(error);
        notification.error({
          message: "Error al cargar el instrumento",
          description:
            "Hubo un error al cargar el instrumento. Por favor, inténtelo de nuevo más tarde.",
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
    notification.error({
      message: "Error de validación",
      description: "Por favor, complete todos los campos requeridos.",
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setPreviewImage(e.target.result);
          setPreviewVisible(true);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCancel = () => setPreviewVisible(false);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      encType="multipart/form-data"
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Instrumento"
            name="instrumento"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre del instrumento!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Marca"
            name="marca"
            rules={[
              { required: true, message: "Por favor ingrese la marca!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Modelo"
            name="modelo"
            rules={[
              { required: true, message: "Por favor ingrese el modelo!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Precio"
                name="precio"
                rules={[
                  { required: true, message: "Por favor ingrese el precio!" },
                ]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Cantidad Vendida"
                name="cantidadVendida"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese la cantidad vendida!",
                  },
                ]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Categoria" name="categoria">
            <Select>
              {categorias.map((categoria) => (
                <Select.Option key={categoria.id} value={categoria.id}>
                  {categoria.denominacion}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Costo Envio"
            name="costoEnvio"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el costo del envio!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Descripcion"
            name="descripcion"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la descripción!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Imagen" name="imagen">
            <label className="form-label">Imagen</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{ width: "100%" }}
                src={previewImage}
              />
            </Modal>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Agregar Instrumento
        </Button>
        <Button onClick={onClose} style={{ marginLeft: 8 }}>
          Cancelar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormularioInstrumento;
