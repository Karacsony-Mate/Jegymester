import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, InputNumber, Select, Space, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../api/api";
import { IMovies } from "../interfaces/IMovies";
import { ICreateMovies } from "../interfaces/ICreateMovies";

interface IMovieForm {
  isCreate: boolean;
}

const MovieForm = ({ isCreate }: IMovieForm) => {
  const { id } = useParams(); // csak akkor van értéke, ha szerkesztésről van szó
  const [movies, setMovies] = useState<IMovies[]>([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Filmek betöltése
  useEffect(() => {
    api.Movies.getMovies().then((res) => {
      setMovies(res.data);
    });
  }, []);

  // Ha szerkesztésről van szó, betöltjük az adott vetítés adatait
  useEffect(() => {
    if (!isCreate && id) {
      api.Movies.getMovieById(Number(id)).then((res) => {
        const movie = res.data;
        form.setFieldsValue({
          title: movie.title,
          description: movie.description,
          genre: movie.genre,
          duration: movie.duration
        });
      });
    }
  }, [isCreate, id, form]);

  const handleSubmit = async (values: any) => {
    const payload: ICreateMovies = {
      title: values.title,
      description: values.description,
      genre: values.genre,
      duration: values.duration,
    };

    try {
      if (isCreate) {
        await api.Movies.createMovie(payload);
        message.success("Film sikeresen létrehozva!");
      } else if (id) {
        await api.Movies.updateMovie(Number(id), payload);
        message.success("Film sikeresen frissítve!");
      }
      navigate('/app/movies'); // Redirect after save/update
    } catch (error) {
      message.error("Hiba történt a film adatainak mentése közben.");
    }
  };

  return (
    <Card>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          title: '',
          description: '',
          genre: '',
          duration: 0,
        }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          label="Cím"
          name="title"
          rules={[{ required: true, message: 'Válassz filmet' }]}
        >
          <Input placeholder="Pl. A Gyűrűk Ura" />
        </Form.Item>

        <Form.Item
          label="Leírás"
          name="description"
          rules={[{ required: true, message: 'Túl rövid leírás', min: 10 }]}
        >
          <Input.TextArea placeholder="Hol volt, hol nem volt..." />
        </Form.Item>

        <Form.Item
          label="Téma"
          name="genre"
          rules={[{ required: true, message: 'Add meg a témát' }]}
        >
          <Input placeholder="Pl. Fantasy" />
        </Form.Item>

        <Form.Item
          label="Hossz (perc)"
          name="duration"
          rules={[{ required: true, message: 'Add meg a film hosszát' }]}
        >
          <InputNumber
            min={10}
            style={{ width: '100%' }}
            placeholder="Pl. 120"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit">
            {isCreate ? "Létrehozás" : "Mentés"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default MovieForm;
