import React from "react";
import { Table, Image, Space } from "antd";

import { Instrumentos } from "../../service/ServiceInstrumentos";
import { DeleteOutlined,EditOutlined  } from "@ant-design/icons";
interface Props {
  datos: Instrumentos[];
}

const TablaGrilla: React.FC<Props> = ({ datos }) => {
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
        <Image src={`./img/${text}`} alt={text} width={50} />
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
        title: 'Acción',
        key: 'action',
        render: () => (
          <Space size="middle">
            <a ><EditOutlined /></a>
            <a ><DeleteOutlined /></a>
          </Space>
        ),
      },
  ];

  return (
    <Table
      dataSource={datos}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default TablaGrilla;
