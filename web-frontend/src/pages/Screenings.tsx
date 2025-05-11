import { Button, Card, Table} from '@mantine/core';
import {useEffect, useState} from "react";
//import axiosInstance from '../api/axios.config';
import api from '../api/api.ts';
import { IScreenings } from '../interfaces/IScreenings.ts';
import formatDateTime from '../interfaces/DateTime.tsx';
import { useNavigate } from 'react-router-dom';

const Screenings = () => {
  const [items, setItems] = useState<IScreenings[]>([])
  const navigate = useNavigate();

    useEffect( () => {
        api.Screenings.getScreenings().then(res => {
          setItems(res.data);
        });
    }, []);
    
    const rows = items.map((element) => (
      <Table.Tr key={element.id}>
        <Table.Td>{element.movieTitle}</Table.Td>
        <Table.Td>{formatDateTime(element.dateTime)}</Table.Td>
        <Table.Td>{element.location}</Table.Td>
        <Table.Td>{element.availableSeats}</Table.Td>
        <Table.Td>
          <Button onClick={() => navigate(`${element.id}`)} color='dark'>Módosítás</Button>
        </Table.Td>
      </Table.Tr>
    ));
  
  return <div>
    <button onClick={() => navigate('create')}>Új film hozzáadása</button>
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
    </div>
}

export default Screenings;