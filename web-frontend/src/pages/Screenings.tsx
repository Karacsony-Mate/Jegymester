import { Button, Card, Table } from '@mantine/core';
import { useEffect, useState } from "react";
import api from '../api/api.ts';
import { IScreenings } from '../interfaces/IScreenings.ts';
import formatDateTime from '../interfaces/DateTime.tsx';
import { useNavigate } from 'react-router-dom';
import { purchaseTicket } from '../api/tickets';
import { ITicketPurchase } from '../interfaces/ITicket';
import { message, Modal, InputNumber } from 'antd';
import { getUserIdFromToken } from '../api/jwtUtils';
import useAuth from '../hooks/useAuth';

const Screenings = () => {
  const [items, setItems] = useState<IScreenings[]>([]);
  const navigate = useNavigate();
  const [buyModal, setBuyModal] = useState<{ open: boolean, screeningId: number | null }>({ open: false, screeningId: null });
  const [price, setPrice] = useState<number>(2000); // alapértelmezett jegyár
  const { token } = useAuth();

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
        price: price,
        userId: userId ?? undefined
      };
      await purchaseTicket(ticket);
      message.success('Jegy sikeresen megvásárolva!');
      setBuyModal({ open: false, screeningId: null });
    } catch (e) {
      message.error('Hiba történt a jegyvásárlás során!');
    }
  };

  const rows = items.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.movieTitle}</Table.Td>
      <Table.Td>{formatDateTime(element.dateTime)}</Table.Td>
      <Table.Td>{element.location}</Table.Td>
      <Table.Td>{element.availableSeats}</Table.Td>
      <Table.Td>
        <Button onClick={() => navigate(`${element.id}`)} color='dark'>Módosítás</Button>
        <Button ml={8} color='teal' onClick={() => setBuyModal({ open: true, screeningId: element.id })}>Jegyvásárlás</Button>
      </Table.Td>
    </Table.Tr>
  ));

  return <div>
    <button onClick={() => navigate('create')}>Új vetítés hozzáadása</button>
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Movie Title</Table.Th>
            <Table.Th>Screening date</Table.Th>
            <Table.Th>Room</Table.Th>
            <Table.Th>Seats Left</Table.Th>
            <Table.Th>Műveletek</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
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
}

export default Screenings;