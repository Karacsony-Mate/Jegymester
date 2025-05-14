import React, { useEffect, useState, useContext } from 'react';
import { ITicket } from '../interfaces/ITicket';
import { IScreenings } from '../interfaces/IScreenings';
import { getAllTickets, deleteTicket, confirmTicket } from '../api/tickets';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { Button, Table, message, Popconfirm } from 'antd';

const AllTickets: React.FC = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [screenings, setScreenings] = useState<IScreenings[]>([]);
  const [loading, setLoading] = useState(false);
  const { role } = useContext(AuthContext);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await getAllTickets();
      setTickets(data);
    } catch (error) {
      message.error('Nem sikerült betölteni a jegyeket.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    api.Screenings.getScreenings().then(res => setScreenings(res.data));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteTicket(id);
      message.success('Jegy törölve.');
      fetchTickets();
    } catch (error: any) {
      const backendMsg = error?.response?.data?.message;
      if (backendMsg) {
        message.error(backendMsg);
      } else {
        message.error('Nem sikerült törölni a jegyet.');
      }
    }
  };

  const handleConfirm = async (id: number) => {
    try {
      await confirmTicket(id);
      message.success('Jegy megerősítve.');
      fetchTickets();
    } catch (error: any) {
      const backendMsg = error?.response?.data?.message;
      if (backendMsg) {
        message.error(backendMsg);
      } else {
        message.error('Nem sikerült megerősíteni a jegyet.');
      }
    }
  };

  return (
    <div>
      <h2>Összes jegy</h2>
      <Table
        dataSource={tickets}
        rowKey="id"
        loading={loading}
        pagination={false}
        columns={[
          { title: 'Jegy ID', dataIndex: 'id' },
          { title: 'Felhasználó ID', dataIndex: 'userId' },
          { title: 'Vetítés ID', dataIndex: 'screeningId' },
          { title: 'Ár', dataIndex: 'price' },
          { title: 'Vásárlás dátuma', dataIndex: 'purchaseDate', render: (date: string) => new Date(date).toLocaleString() },
          { title: 'Megerősítve', dataIndex: 'isConfirmed', render: (v: boolean) => v ? 'Igen' : 'Nem' },
          {
            title: 'Művelet',
            render: (_: any, record: ITicket) => (
              <>
                <Popconfirm title="Biztosan törlöd?" onConfirm={() => handleDelete(record.id)} okText="Igen" cancelText="Mégse">
                  <Button danger>Törlés</Button>
                </Popconfirm>
                {(role === 'Admin' || role === 'Cashier') && !record.isConfirmed && (
                  <Button type="primary" style={{ marginLeft: 8 }} onClick={() => handleConfirm(record.id)}>
                    Megerősítés
                  </Button>
                )}
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default AllTickets;
