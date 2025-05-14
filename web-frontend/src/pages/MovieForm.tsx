import { Button, Card, Group, NumberInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { IMovies } from "../interfaces/IMovies";
import { ICreateMovies } from "../interfaces/ICreateMovies";

interface IMovieForm {
  isCreate: boolean;
}

const MovieForm = ({ isCreate }: IMovieForm) => {
  const { id } = useParams(); // csak akkor van értéke, ha szerkesztésről van szó
  const [movies, setMovies] = useState<IMovies[]>([]);

  const form = useForm({
    initialValues: {
        id: 0,
        title: '',
        duration: 0,
        genre: '',
        description: ''
    },

    validate: {
        title: (value) => (value.length > 0 ? null : 'Válassz filmet'),
        description: (value) => (value.length >= 10 ? null : 'Túl rövid leírás'),
        genre: (value) => (value.length > 0 ? null : 'Add meg a témát'),
        duration: (value) => (value > 0 ? null : 'Add meg a film hosszát'),
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
      api.Movies.getMovieById(Number(id)).then((res) => {
        const movie = res.data;
        form.setValues({
          title: movie.title,
          description: movie.description,
          genre: movie.genre,
          duration: movie.duration
        });
      });
    }
  }, [isCreate, id]);

  const handleSubmit = (values: typeof form.values) => {
    const payload: ICreateMovies = {
      title: values.title,
      description: values.description,
      genre: values.genre,
      duration: values.duration,
    };

    if (isCreate) {
      api.Movies.createMovie(payload).then(() => {
        alert("Film sikeresen létrehozva!");
      });
    } else if (id) {
      api.Movies.updateMovie(Number(id), payload).then(() => {
        alert("Film sikeresen frissítve!");
      });
    }
  };

  return (
    <Card>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Cím"
          placeholder="Pl. A Gyűrűk Ura"
          {...form.getInputProps('title')}
        />

        <TextInput
          withAsterisk
          label="Leírás"
          placeholder="Hol volt, hol nem volt..."
          {...form.getInputProps('description')}
        />

        <TextInput
          withAsterisk
          label="Téma"
          placeholder="Pl. Fantasy"
          {...form.getInputProps('genre')}
        />

        <NumberInput
          withAsterisk
          label="Hossz (perc)"
          placeholder="Pl. 120"
          min={10}
          value={form.values.duration}
          onChange={(value) => form.setFieldValue('duration', Number(value) ?? 0)}
          error={form.errors.duration}
        />


        <Group justify="flex-end" mt="md">
          <Button type="submit">{isCreate ? "Létrehozás" : "Mentés"}</Button>
        </Group>
      </form>
    </Card>
  );
};

export default MovieForm;