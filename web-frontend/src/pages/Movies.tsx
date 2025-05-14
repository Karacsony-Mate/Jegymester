import React, { useEffect, useState } from 'react';
import { Table, Button, message, Popconfirm, Spin } from 'antd';
import { IMovies } from '../interfaces/IMovies.ts';
import { useNavigate } from 'react-router-dom';
import api from '../api/api.ts';

const Movies: React.FC = () => {
  const [items, setItems] = useState<IMovies[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await api.Movies.getMovies();
      setItems(res.data);
    } catch (error) {
      message.error('Nem sikerült betölteni a filmeket.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.Movies.deleteMovieById(id);
      message.success('Film törölve.');
      setItems(prev => prev.filter(movie => movie.id !== id));
    } catch (error: any) {
      const backendMsg = error?.response?.data?.message;
      if (backendMsg) {
        message.error(backendMsg);
      } else {
        message.error('Nem sikerült törölni a filmet.');
      }
    }
  };

  const columns = [
    {
      title: 'Cím',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Hossz',
      dataIndex: 'duration',
      key: 'duration',
      render: (val: number) => `${val} perc`,
    },
    {
      title: 'Téma',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Műveletek',
      key: 'actions',
      render: (_: any, record: IMovies) => (
        <>
          <Button type="primary" onClick={() => navigate(`${record.id}`)} style={{ marginRight: 8 }}>
            Módosítás
          </Button>
          <Popconfirm
            title="Biztosan törlöd?"
            onConfirm={() => handleDelete(record.id)}
            okText="Igen"
            cancelText="Mégse"
          >
            <Button danger>Törlés</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => navigate('create')} style={{ marginBottom: 16 }}>
        Új film hozzáadása
      </Button>

      <Spin spinning={loading}>
        <Table
          dataSource={items}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </Spin>
    </div>
  );
};

export default Movies;
