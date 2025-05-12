import { Button, Card, Group, NumberInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import formatDateTime from "../interfaces/DateTime";


interface IScreeningForm {
  isCreate: boolean;
}

const ScreeningForm = ({ isCreate }: IScreeningForm) => {
  const { id } = useParams();
  //const [movies,getMovies]=useState<{id: number,title: string, description: string, duration: number,genre:string}[]>([]);
  const [movies, getMovies] = useState<{ id: number; title: string; description: string; duration: number; genre: string }[]>([]);


  const form = useForm({
    initialValues: {
      movieId: '',
      movieName: '',
      dateTime: '',
      location: '',
      availableSeats: 0,
    },

    validate: {
      movieId: (value) => (value.length > 0 ? null : 'Nem létező Id.'),
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
      
      
      
      <p>{JSON.stringify(movies)}</p>
      <Card>
       

        
          <form onSubmit={form.onSubmit((values) => {

            if (isCreate) {
                api.Screenings.createScreanings({
                movieId: parseInt(values.movieId),
                dateTime: new Date(values.dateTime),
                location: values.location,
                availableSeats: values.availableSeats
              }).then();
            }
            else {
              
            }
            
            
          api.Screenings.createScreanings({
          movieId: parseInt(values.movieId),
          dateTime: new Date(values.dateTime),
          location: values.location,
          availableSeats: values.availableSeats
        }).then();
      })}>
          
          <Select
            withAsterisk
            label="movieName"
            placeholder="movieName"
            data={movies.map(c =>( 
              {label: c.title,
                 value: c.id.toString()
                }
            ))}
            key={form.key('movieName')}
            {...form.getInputProps('movieName')}
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
