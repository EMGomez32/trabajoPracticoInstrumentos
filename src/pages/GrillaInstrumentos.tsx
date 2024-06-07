import React, { useEffect, useState } from "react";
import {
  Table,
  Image,
  Button,
  message,
  Modal,
  Form,
  Input,
  Row,
  Col,
  InputNumber,
  Select,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { mostrarCategorias } from "../service/ServiceCategoria";
import FormularioInstrumento from "../components/form/FormularioInstrumento";

interface Instrumento {
  id: number;
  instrumento: string;
  marca: string;
  modelo: string;
  imagen: string;
  precio: number;
  costoEnvio: string;
  cantidadVendida: number;
  descripcion: string;
  categoria: string;
}

interface Categoria {
  id: number;
  denominacion: string;
}

const MyTable: React.FC = () => {
  const [data, setData] = useState<Instrumento[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [editInstrumentoId, setEditInstrumentoId] = useState<number | null>(
    null
  );
  const [instrumento, setInstrumento] = useState<Instrumento | null>(null);
  const [form] = Form.useForm();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const handleNewInstrumento = () => {
    setIsCreateModalVisible(true);
  };

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false);
  };

  const handleEdit = (record: Instrumento) => {
    setEditInstrumentoId(record.id);
    setInstrumento(record);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/instrumentos/mostrarTodo");
        if (!response.ok) {
          throw new Error("Error fetching instrumentos");
        }
        const instrumentos: Instrumento[] = await response.json();

        const data = await Promise.all(
          instrumentos.map(async (instrumento) => {
            try {
              const categoriaResponse = await fetch(
                `http://localhost:8080/categorias/buscar/${instrumento.categoria.id}`
              );
              if (!categoriaResponse.ok) {
                throw new Error(
                  `Error fetching categoria for instrumento ${instrumento.id}`
                );
              }
              const categoria: Categoria = await categoriaResponse.json();
              return {
                ...instrumento,
                categoria: categoria.denominacion,
              };
            } catch (error) {
              console.error(error);
              return {
                ...instrumento,
                categoria: "Unknown",
              };
            }
          })
        );

        setData(data);
      } catch (error) {
        console.error(error);
        message.error("Error fetching instrumentos");
      } finally {
        setLoading(false);
      }
    };

    const cargarCategorias = async () => {
      try {
        const categoriasData: Categoria[] = await mostrarCategorias();
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Error fetching categorias:", error);
        message.error("Error fetching categorias");
      }
    };

    fetchData();
    cargarCategorias();
  }, []);

  useEffect(() => {
    const fetchInstrumento = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/instrumentos/${editInstrumentoId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching instrumento");
        }
        const data: Instrumento = await response.json();
        setInstrumento(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (editInstrumentoId) {
      fetchInstrumento();
    }
  }, [editInstrumentoId]);

  const handleSubmit = async (values: any) => {
    try {
      const categoriaSeleccionada = categorias.find(categoria => categoria.id === values.categoria);
      if (!categoriaSeleccionada) {
        throw new Error("Categoría no encontrada");
      }
  
      // Crear un objeto con los valores del formulario y la categoría seleccionada
      const instrumentoData = {
        ...values,
        categoria: categoriaSeleccionada,
      };
  
      const formData = new FormData();
      formData.append(
        "instrumento",
        new Blob([JSON.stringify(instrumentoData)], {
          type: "application/json",
        })
      );
  
      if (values.imagen && values.imagen.file) {
        formData.append("imagen", values.imagen.file.originFileObj);
      }
  
      const response = await fetch(
        `http://localhost:8080/instrumentos/actualizar/${editInstrumentoId}`,
        {
          method: "PUT",
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error("Error al actualizar el instrumento");
      }
  
      const data: Instrumento = await response.json();
      console.log("Instrumento actualizado con éxito:", data);
      setEditInstrumentoId(null);
      message.success("Instrumento actualizado con éxito");
      setIsCreateModalVisible(false);
    } catch (error) {
      console.error(error);
      message.error("Error al actualizar el instrumento");
    }
  };
  const handleImageChange = (info: any) => {
    if (info.file.status === 'done') {
      // Obtener la URL de la imagen para previsualización
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setPreviewImage(e.target.result);
          setPreviewVisible(true);
        }
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };
  
  const handleCancel = () => setPreviewVisible(false);

  const columns = [
    {
      title: "Instrumento",
      dataIndex: "instrumento",
      key: "instrumento",
    },
    {
      title: "Marca",
      dataIndex: "marca",
      key: "marca",
    },
    {
      title: "Modelo",
      dataIndex: "modelo",
      key: "modelo",
    },
    {
      title: "Imagen",
      dataIndex: "imagen",
      key: "imagen",
      render: (text: string) => (
        <Image src={`/img/${text}`} alt={text} width={50} />
      ),
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
    },
    {
      title: "Costo Envío",
      dataIndex: "costoEnvio",
      key: "costoEnvio",
    },
    {
      title: "Cantidad Vendida",
      dataIndex: "cantidadVendida",
      key: "cantidadVendida",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_: any, record: Instrumento) => (
        <Button type="primary" onClick={() => handleEdit(record)}>
          Editar
        </Button>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={handleNewInstrumento}>
        Nuevo Instrumento
      </Button>
      <Modal
        title="Nuevo Instrumento"
        visible={isCreateModalVisible}
        onCancel={handleCreateCancel}
        footer={null}
      >
        <FormularioInstrumento onCancel={handleCreateCancel} />
      </Modal>
      <Modal
        title={`Editar Instrumento ID: ${editInstrumentoId}`}
        visible={editInstrumentoId !== null}
        onCancel={() => setEditInstrumentoId(null)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={instrumento}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Instrumento"
                name="instrumento"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese el nombre del instrumento",
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
                  {
                    required: true,
                    message: "Por favor ingrese la marca",
                  },
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
                  {
                    required: true,
                    message: "Por favor ingrese el modelo",
                  },
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
                      {
                        required: true,
                        message: "Por favor ingrese el precio",
                      },
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
                        message: "Por favor ingrese la cantidad vendida",
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
                    message: "Por favor ingrese el costo del envio",
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
                    message: "Por favor ingrese la descripción",
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
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
      />
    </>
  );
};

export default MyTable;
