import { Button, Card, Table} from '@mantine/core';
import {useEffect, useState} from "react";
//import axiosInstance from '../api/axios.config';
import api from '../api/api.ts';
import { IMovies } from '../interfaces/IMovies.ts';
//import formatDateTime from '../interfaces/DateTime.tsx';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
  const [items, setItems] = useState<IMovies[]>([])
  const navigate = useNavigate();

    useEffect( () => {
        api.Movies.getMovies().then(res => {
          setItems(res.data);
        });
    }, []);
    
    const rows = items.map((element) => (
      <Table.Tr key={element.id}>
        <Table.Td>{element.title}</Table.Td>
        <Table.Td>{element.duration} minute</Table.Td>
        <Table.Td>{element.genre}</Table.Td>
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
              <Table.Th>Cím</Table.Th>
              <Table.Th>Hossz</Table.Th>
              <Table.Th>Téma</Table.Th>
              <Table.Th>Műveletek</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    </Card>
    </div>
}

export default Movies;