import React, { useEffect, useState } from 'react';
import { IScreenings } from '../interfaces/IScreenings';
import { useNavigate } from 'react-router-dom';
import { purchaseTicket } from '../api/tickets';
import { ITicketPurchase } from '../interfaces/ITicket';
import { message, Modal, InputNumber, Table as AntTable, Button as AntButton, Popconfirm } from 'antd';
import api from '../api/api';
import formatDateTime from '../interfaces/DateTime';

const Screenings = () => {
  const [items, setItems] = useState<IScreenings[]>([]);
  const navigate = useNavigate();
  const [buyModal, setBuyModal] = useState<{ open: boolean; screeningId: number | null }>({ open: false, screeningId: null });
  const [price, setPrice] = useState<number>(2000);

  useEffect(() => {
    api.Screenings.getScreenings().then(res => {
      setItems(res.data);
    });
  }, []);

  const handleBuyTicket = async () => {
    if (!buyModal.screeningId) return;
    try {
      const ticket: ITicketPurchase = {
        screeningId: buyModal.screeningId,
        price: price,
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
    {
      title: 'Műveletek',
      key: 'actions',
      render: (_: any, record: IScreenings) => (
        <>
          <AntButton onClick={() => navigate(`${record.id}`)} type="primary" style={{ marginRight: 8 }}>
            Módosítás
          </AntButton>
          <AntButton onClick={() => setBuyModal({ open: true, screeningId: record.id })} type="default" style={{ marginRight: 8 }}>
            Jegyvásárlás
          </AntButton>
          <Popconfirm
            title="Biztosan törlöd ezt a vetítést?"
            onConfirm={() => handleDelete(record.id)}
            okText="Igen"
            cancelText="Mégse"
          >
            <AntButton danger>Törlés</AntButton>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <AntButton type="primary" onClick={() => navigate('create')} style={{ marginBottom: 16 }}>
        Új vetítés hozzáadása
      </AntButton>
      <AntTable dataSource={items} columns={columns} rowKey="id" pagination={false} />
      <Modal
        title="Jegyvásárlás"
        open={buyModal.open}
        onOk={handleBuyTicket}
        onCancel={() => setBuyModal({ open: false, screeningId: null })}
        okText="Vásárlás"
        cancelText="Mégse"
      >
        <div>Jegy ára:</div>
        <InputNumber min={1} value={price} onChange={v => setPrice(Number(v))} /> Ft
      </Modal>
    </div>
  );
};

export default Screenings;
