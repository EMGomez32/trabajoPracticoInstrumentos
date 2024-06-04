import { Form, Input, Button, InputNumber } from 'antd';

export default function FormularioInstrumento() {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Instrumento"
        name="instrumento"
        rules={[{ required: true, message: 'Por favor ingrese el nombre del instrumento!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Marca"
        name="marca"
        rules={[{ required: true, message: 'Por favor ingrese la marca!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Modelo"
        name="modelo"
        rules={[{ required: true, message: 'Por favor ingrese el modelo!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Precio"
        name="precio"
        rules={[{ required: true, message: 'Por favor ingrese el precio!' }]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item>
        
      </Form.Item>
    </Form>
  );
}