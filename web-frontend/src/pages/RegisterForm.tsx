import {
    Stack,
    TextInput,
    PasswordInput,
    Group,
    Button,
    Anchor, 
    Divider,
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useNavigate} from "react-router-dom";
import { showNotification } from "@mantine/notifications"; // Importálás
//import axiosInstance from "../utils/axiosInstance"; // Győződj meg róla, hogy az axiosInstance helyesen van importálva
import AuthContainer from "../components/AuthContainer.tsx";
import axiosInstance from "../api/axios.config.ts";
import api from "../api/api.ts"

const RegisterForm = () => {
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            phonenumber: '',
        },

        validate: {
            email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Érvénytelen e-mail cím'),
            password: (val: string) => (val.length < 8 ? 'A jelszónak 8 karakter hosszúnak kell lennie.' : null),
            name: (val: string) => (val.length < 2 ? 'A névnek legalább 2 karakter hosszúnak kell lennie.' : null),
        },
    });

    const submit = async () => {
        const { name, email, password, phonenumber } = form.values;
         try {
            await api.User.registerUser(name, email, password, phonenumber, [1]);
            showNotification({
                title: 'Sikeres regisztráció',
                message: 'A regisztráció sikeresen megtörtént! Hamarosan átirányítunk a bejelentkezéshez.',
                color: 'green',
                autoClose: 2000,
            });
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error: any) {
            let msg = 'A regisztráció nem sikerült. Kérlek, próbáld újra!';
            if (error?.response?.data) {
                msg = Object.values(error.response.data).flat().join('');
            } else if (error?.response?.data?.message) {
                msg = error.response.data.message;
            }
            showNotification({
                title: 'Hiba történt',
                message: msg,
                color: 'red',
                autoClose: 3000,
            });
        }
    };
    
    return (
        <AuthContainer>
            <div>
                <form onSubmit={form.onSubmit(submit)}>
                    <Stack>
                        <TextInput
                            required
                            label="Név"
                            placeholder="Pl: Kötvény János"
                            key={form.key('name')}
                            radius="md"
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            required
                            label="E-mail cím"
                            placeholder="hello@mantine.dev"
                            key={form.key('email')}
                            radius="md"
                            {...form.getInputProps('email')}
                        />
                        <PasswordInput
                            required
                            label="Jelszó"
                            placeholder="Jelszavad"
                            key={form.key('password')}
                            radius="md"
                            {...form.getInputProps('password')}
                        />
                        <TextInput
                            required
                            label="Telefonszám"
                            placeholder="+36 30 123 4567"
                            key={form.key('phonenumber')}
                            radius="md"
                            {...form.getInputProps('phonenumber')}
                        />
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            c="dimmed"
                            onClick={() => navigate('/login')}
                            size="xs"
                        >
                            Bejelentkezés
                        </Anchor>
                        <Button type="submit" radius="xl" id="login-button">
                            Regisztráció
                        </Button>
                    </Group>
                    <Divider my="lg" />
                </form>
            </div>
        </AuthContainer>
    );
};

export default RegisterForm;