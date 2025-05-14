import React, { useEffect, useState } from 'react';
import { ITicket } from '../interfaces/ITicket';
import { getMyTickets, deleteTicket } from '../api/tickets';
import { Button, Table, message, Popconfirm } from 'antd';

const MyTickets: React.FC = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await getMyTickets();
      setTickets(data);
    } catch (error) {
      message.error('Nem sikerült betölteni a jegyeket.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteTicket(id);
      message.success('Jegy törölve.');
      fetchTickets();
    } catch (error: any) {
      // Próbáljuk kiolvasni a backendtől kapott hibaüzenetet
      const backendMsg = error?.response?.data?.message;
      if (backendMsg) {
        message.error(backendMsg);
      } else {
        message.error('Nem sikerült törölni a jegyet.');
      }
    }
  };

  return (
    <div>
      <h2>Saját jegyeim</h2>
      <Table
        dataSource={tickets}
        rowKey="id"
        loading={loading}
        pagination={false}
        columns={[
          { title: 'Jegy ID', dataIndex: 'id' },
          { title: 'Vetítés ID', dataIndex: 'screeningId' },
          { title: 'Ár', dataIndex: 'price' },
          { title: 'Vásárlás dátuma', dataIndex: 'purchaseDate', render: (date: string) => new Date(date).toLocaleString() },
          { title: 'Megerősítve', dataIndex: 'isConfirmed', render: (v: boolean) => v ? 'Igen' : 'Nem' },
          {
            title: 'Művelet',
            render: (_, record) => (
              <Popconfirm title="Biztosan törlöd?" onConfirm={() => handleDelete(record.id)} okText="Igen" cancelText="Mégse">
                <Button danger>Törlés</Button>
              </Popconfirm>
            ),
          },
        ]}
      />
    </div>
  );
};

export default MyTickets;
