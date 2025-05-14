import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, InputNumber, Select, Space, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../api/api";
import { ICreateScreenings } from "../interfaces/ICreateScreenings";

interface IScreeningForm {
  isCreate: boolean;
}

const ScreeningForm = ({ isCreate }: IScreeningForm) => {
  const { id } = useParams(); // csak akkor van értéke, ha szerkesztésről van szó
  const [movies, setMovies] = useState<
    { id: number; title: string; description: string; duration: number; genre: string }[]
  >([]);
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
      api.Screenings.getScreeningById(Number(id)).then((res) => {
        const screening = res.data;
        form.setFieldsValue({
          movieId: screening.movieId.toString(),
          dateTime: screening.dateTime, // lehet szükséges formázás
          location: screening.location,
          availableSeats: screening.availableSeats,
        });
      });
    }
  }, [isCreate, id, form]);

  const handleSubmit = async (values: any) => {
    const payload: ICreateScreenings = {
      movieId: parseInt(values.movieId),
      dateTime: new Date(values.dateTime),
      location: values.location,
      availableSeats: values.availableSeats,
    };

    try {
      if (isCreate) {
        await api.Screenings.createScreening(payload);
        message.success("Vetítés sikeresen létrehozva!");
      } else if (id) {
        await api.Screenings.updateScreening(Number(id), payload);
        message.success("Vetítés sikeresen frissítve!");
      }
      navigate('/screenings'); // Redirect after save/update
    } catch (error) {
      message.error("Hiba történt a vetítés adatainak mentése közben.");
    }
  };

  return (
    <Card>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          movieId: '',
          dateTime: '',
          location: '',
          availableSeats: 0,
        }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          label="Film"
          name="movieId"
          rules={[{ required: true, message: 'Válassz filmet' }]}
        >
          <Select
            placeholder="Válassz filmet"
            options={movies.map((movie) => ({
              label: movie.title,
              value: movie.id.toString(),
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Helyszín"
          name="location"
          rules={[{ required: true, message: 'Nem létező hely' }, { min: 3, message: 'Nem létező hely' }]}
        >
          <Input placeholder="Pl. Cinema City Westend" />
        </Form.Item>

        <Form.Item
          label="Időpont"
          name="dateTime"
          rules={[{ required: true, message: 'Add meg a dátumot és időpontot' }]}
        >
          <Input placeholder="Pl. 2025-06-10 18:30" />
        </Form.Item>

        <Form.Item
          label="Szabad férőhelyek"
          name="availableSeats"
          rules={[{ required: true, message: 'Add meg a szabad férőhelyeket' }]}
        >
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            placeholder="Pl. 100"
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

export default ScreeningForm;
