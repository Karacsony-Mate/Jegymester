import React, { useEffect, useState, useContext } from 'react';
import { IScreenings } from '../interfaces/IScreenings';
import { useNavigate } from 'react-router-dom';
import { purchaseTicket } from '../api/tickets';
import { ITicketPurchase } from '../interfaces/ITicket';
import { message, Modal, Popconfirm, Button, Table } from 'antd';
import formatDateTime from '../interfaces/DateTime';
import { getUserIdFromToken } from '../api/jwtUtils';
import useAuth from '../hooks/useAuth';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

const Screenings = () => {
  const [items, setItems] = useState<IScreenings[]>([]);
  const navigate = useNavigate();
  const [buyModal, setBuyModal] = useState<{ open: boolean, screeningId: number | null }>({ open: false, screeningId: null });
  const { token } = useAuth();
  const { role } = useContext(AuthContext);

  useEffect(() => {
    api.Screenings.getScreenings().then(res => {
      setItems(res.data);
    });
  }, []);

  const handleBuyTicket = async () => {
    if (!buyModal.screeningId) return;
    try {
      let userId = null;
      if (token) {
        userId = getUserIdFromToken(token);
      }
      const ticket: ITicketPurchase = {
        screeningId: buyModal.screeningId,
        price: 2000, // fix ár
        userId: userId ?? undefined
      };
      await purchaseTicket(ticket);
      message.success('Jegy sikeresen megvásárolva!');
      setBuyModal({ open: false, screeningId: null });
    } catch (e) {
      message.error('Hiba történt a jegyvásárlás során!');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.Screenings.deleteScreeningById(id);
      setItems(prev => prev.filter(item => item.id !== id));
      message.success('Vetítés sikeresen törölve!');
    } catch (error) {
      message.error('Hiba történt a vetítés törlése során!');
      console.error(error);
    }
  };

  const columns = [
    {
      title: 'Film címe',
      dataIndex: 'movieTitle',
      key: 'movieTitle',
    },
    {
      title: 'Vetítés dátuma',
      dataIndex: 'dateTime',
      key: 'dateTime',
      render: (text: string) => formatDateTime(text),
    },
    {
      title: 'Helyszín',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Szabad helyek',
      dataIndex: 'availableSeats',
      key: 'availableSeats',
    },
    // Csak ha nem pénztáros, jelenjen meg a műveletek oszlop
    ...(role !== 'Cashier' ? [
      {
        title: 'Műveletek',
        key: 'actions',
        render: (_: any, record: IScreenings) => (
          <>
            {role === 'Admin' && (
              <>
                <Button onClick={() => navigate(`${record.id}`)} type="primary" style={{ marginRight: 8 }}>
                  Módosítás
                </Button>
                <Popconfirm
                  title="Biztosan törlöd ezt a vetítést?"
                  onConfirm={() => handleDelete(record.id)}
                  okText="Igen"
                  cancelText="Mégse"
                >
                  <Button danger>Törlés</Button>
                </Popconfirm>
              </>
            )}
            {/* Admin ne tudjon magának jegyet venni */}
            {role !== 'Admin' && (
              <Button onClick={() => setBuyModal({ open: true, screeningId: record.id })} type="default" style={{ marginRight: 8 }}>
                Jegyvásárlás
              </Button>
            )}
          </>
        ),
      }
    ] : [])
  ];

  return (
    <div>
      {role === 'Admin' && (
        <Button type="primary" onClick={() => navigate('create')} style={{ marginBottom: 16 }}>
          Új vetítés hozzáadása
        </Button>
      )}
      <Table dataSource={items} columns={columns} rowKey="id" pagination={false} />
      <Modal
        title="Jegyvásárlás"
        open={buyModal.open}
        onOk={handleBuyTicket}
        onCancel={() => setBuyModal({ open: false, screeningId: null })}
        okText="Vásárlás"
        cancelText="Mégse"
      >
        <div>Jegy ára: <b>2000 Ft</b></div>
      </Modal>
    </div>
  );
};

export default Screenings;
