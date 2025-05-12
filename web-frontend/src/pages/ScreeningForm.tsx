import { Button, Card, Group, NumberInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";


interface IScreeningForm {
  isCreate: boolean;
}

const ScreeningForm = ({ isCreate }: IScreeningForm) => {
  const { id } = useParams();
  //const [movies,getMovies]=useState<{id: number,title: string, description: string, duration: number,genre:string}[]>([]);
  const [movies, setMovies] = useState<{ id: number; title: string; description: string; duration: number; genre: string }[]>([]);


  const form = useForm({
    initialValues: {
      movieId: 0,
      movieName: '',
      dateTime: '',
      location: '',
      availableSeats: 0,
    },

    validate: {
      movieId: (value) => (value >= 0 ? null : 'Nem létező Id.'),
      location: (value) => (value.length >= 3 ? null : 'Nem létező hely'),
      
    },
  });

  useEffect(() => {
    api.Movies.getMovies().then(res =>{

        getMovies(res.data);
    })
  },[]);

  return (
    <div>
      Hello screenings
      <p>{id}</p>
      <p>{JSON.stringify(isCreate)}</p>
      <p>{JSON.stringify(movies)}</p>
      <Card>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          
          <Select
            label="movieName"
            placeholder="movieName"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            key={form.key('movieName')}
            {...form.getInputProps('movieName')}
            />
          <NumberInput
            label="Movie ID"            
            placeholder="Szám"
            
            min={0}
            key={form.key('movieId')}
            {...form.getInputProps('movieId')}
           />
          <TextInput
            withAsterisk
            label="Location"
            placeholder="Enter location"
            key={form.key('location')}
            {...form.getInputProps('location')}
          />
          
          <TextInput
            withAsterisk
            label="Date Time"
            placeholder="YYYY-MM-DD HH:MM"
            key={form.key('dateTime')}
            {...form.getInputProps('dateTime')}
          />
          <NumberInput
            withAsterisk
            label="Available Seats"            
            placeholder="0"
            min={0}
            key={form.key('availableSeats')}
            {...form.getInputProps('availableSeats')}
           />         
          
          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Card>
    </div>
  );
};

export default ScreeningForm;
