import { Button, Card, Group, NumberInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  const form = useForm({
    initialValues: {
      movieId: '',
      dateTime: '',
      location: '',
      availableSeats: 0,
    },

    validate: {
      movieId: (value) => (value.length > 0 ? null : 'Válassz filmet'),
      location: (value) => (value.length >= 3 ? null : 'Nem létező hely'),
      dateTime: (value) => (value.length > 0 ? null : 'Add meg a dátumot és időpontot'),
    },
  });

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
        form.setValues({
          movieId: screening.movieId.toString(),
          dateTime: screening.dateTime, // lehet szükséges formázás
          location: screening.location,
          availableSeats: screening.availableSeats,
        });
      });
    }
  }, [isCreate, id]);

  const handleSubmit = (values: typeof form.values) => {
    const payload: ICreateScreenings = {
      movieId: parseInt(values.movieId),
      dateTime: new Date(values.dateTime),
      location: values.location,
      availableSeats: values.availableSeats,
    };

    if (isCreate) {
      api.Screenings.createScreening(payload).then(() => {
        alert("Vetítés sikeresen létrehozva!");
      });
    } else if (id) {
      api.Screenings.updateScreening(Number(id), payload).then(() => {
        alert("Vetítés sikeresen frissítve!");
      });
    }
  };

  return (
    <Card>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          withAsterisk
          label="Film"
          placeholder="Válassz filmet"
          data={movies.map((movie) => ({
            label: movie.title,
            value: movie.id.toString(),
          }))}
          {...form.getInputProps('movieId')}
        />

        <TextInput
          withAsterisk
          label="Helyszín"
          placeholder="Pl. Cinema City Westend"
          {...form.getInputProps('location')}
        />

        <TextInput
          withAsterisk
          label="Időpont"
          placeholder="Pl. 2025-06-10 18:30"
          {...form.getInputProps('dateTime')}
        />

        <NumberInput
          withAsterisk
          label="Szabad férőhelyek"
          placeholder="Pl. 100"
          min={0}
          value={form.values.availableSeats}
          onChange={(value) => form.setFieldValue('availableSeats', Number(value) ?? 0)}
          error={form.errors.availableSeats}
        />


        <Group justify="flex-end" mt="md">
          <Button type="submit">{isCreate ? "Létrehozás" : "Mentés"}</Button>
        </Group>
      </form>
    </Card>
  );
};

export default ScreeningForm;
