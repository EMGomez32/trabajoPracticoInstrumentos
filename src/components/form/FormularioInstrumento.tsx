import { Form, Input, Button, InputNumber, Select, Upload, Row, Col } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';
import { cargarInstrumentos } from '../../service/ServiceInstrumentos';
import { mostrarCategorias } from '../../service/ServiceCategoria';
import { useEffect, useState } from 'react';

export default function FormularioInstrumento() {

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await mostrarCategorias();
      setCategorias(data);
    };

    fetchCategorias();
  }, []);




  const onFinish = async (values: any) => {
    try {
      // Obtén la categoría completa basada en el ID
      const categoria = categorias.find(categoria => categoria.id === values.categoria);
  
      // Reemplaza el ID de la categoría con el objeto de la categoría completa
      values.categoria = categoria;
  
      // Asegúrate de que los valores se envían como una lista
      await cargarInstrumentos([values]);
      console.log('Instrumento agregado exitosamente');
    } catch (error) {
      console.error('Error al agregar instrumento:', error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  function normFile(...args: EventArgs) {
    throw new Error('Function not implemented.');
  }

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Instrumento"
            name="instrumento"
            rules={[{ required: true, message: 'Por favor ingrese el nombre del instrumento!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Marca"
            name="marca"
            rules={[{ required: true, message: 'Por favor ingrese la marca!' }]}
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
            rules={[{ required: true, message: 'Por favor ingrese el modelo!' }]}
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
                rules={[{ required: true, message: 'Por favor ingrese el precio!' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>


            </Col>
            <Col span={12}>
              <Form.Item
                label="Cantidad Vendida"
                name="cantidadVendida"
                rules={[{ required: true, message: 'Por favor ingrese la cantidad vendida!' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
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
            rules={[{ required: true, message: 'Por favor ingrese el costo del envio!' }]}
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
            rules={[{ required: true, message: 'Por favor ingrese la descripción!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Imagenes" name="imagenes" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 0 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Agregar Intrumentos
        </Button>
      </Form.Item>
    </Form>
  );
}
