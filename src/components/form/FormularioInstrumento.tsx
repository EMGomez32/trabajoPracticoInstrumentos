import { Button, Form, Input, Modal, Select, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import Categoria from '../../entidades/Categoria';


export default function ModalFormulario({ title, onClose, isVisible }) {
  function setImagen(file: RcFile) {
    throw new Error('Function not implemented.');
  }

  return (
    <Modal
      title={title} // Aquí usamos el título
      visible={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <Form>
      
        layout="vertical"
        
        <Form.Item
          label="Nombre"
          name="instrumento"
          rules={[{ required: true, message: "El campo nombre es obligatorio" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Marca"
          name="marca"
          rules={[{ required: true, message: "El campo marca es obligatorio" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Modelo"
          name="modelo"
          rules={[{ required: true, message: "El campo modelo es obligatorio" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Imagen"
          name="imagen"
        >
          <Upload
            beforeUpload={(file) => {
              setImagen(file);
              return false;
            }}
            maxCount={1}
          >
            <Button>Seleccionar Imagen</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Precio"
          name="precio"
          rules={[{ required: true, message: "El campo precio es obligatorio" }]}
        >
          <Input type="number" min="0" />
        </Form.Item>
        <Form.Item
          label="Costo de envio"
          name="costoEnvio"
          rules={[{ required: true, message: "El campo costo de envio es obligatorio" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Cantidad vendida"
          name="cantidadVendida"
          rules={[{ required: true, message: "El campo cantidad vendida es obligatorio" }]}
        >
          <Input type="number" min="0" />
        </Form.Item>
        <Form.Item
          label="Descripcion"
          name="descripcion"
          rules={[{ required: true, message: "El campo descripcion es obligatorio" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Categoria"
          name="categoria"
          rules={[{ required: true, message: "El campo categoria es obligatorio" }]}
        >
          
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={save}>
            Guardar
          </Button>
        </Form.Item>
        
      </Form>
    </Modal>
  );
}