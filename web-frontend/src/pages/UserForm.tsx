import {
    Stack,
    TextInput,
    PasswordInput,
    Group,
    Button,
    Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../components/AuthContainer.tsx";
import api from "../api/api";

const UserForm = () => {
    const navigate = useNavigate();

    const form = useForm({
    initialValues: {
        name: '',
        email: '',
        phoneNumber: '',
    },

    validate: {
        email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Érvénytelen e-mail cím'),
        name: (val: string) => (val.trim().length > 0 ? null : 'A név nem lehet üres.'),
        phoneNumber: (val: string) => (val.trim().length > 0 ? null : 'A telefonszám nem lehet üres.'),
    },
});

    const submit = async () => {
    try {
        const { name, email, phoneNumber } = form.values;
        const response = await api.User.changeUserData(email, name, phoneNumber, [3]); // Assuming role ID 0
        console.log("User data updated successfully:", response.data);
        alert("Siker!"); // Show success message
    } catch (error) {
        console.error("Error updating user data:", error);
        alert("Hiba történt az adatok frissítése közben."); // Show error message
    }
};

    return (
        <AuthContainer>
            <div style={{ width: '100%', padding: '2rem' }}>
                <form onSubmit={form.onSubmit(submit)}>
                    <Stack>
                        <TextInput
                            required
                            label="Új név"
                            placeholder="Nagy sándor"
                            key={form.key('name')}
                            radius="md"
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            required
                            label="Új email"
                            placeholder="hello@mantine.dev"
                            key={form.key('email')}
                            radius="md"
                            {...form.getInputProps('email')}
                        />
                        <PasswordInput
                            required
                            label="Új jelszó"
                            placeholder="Jelszavad"
                            key={form.key('password')}
                            radius="md"
                            {...form.getInputProps('password')}
                        />
                        <TextInput
                            required
                            label="Új telefonszám"
                            placeholder="+36 30 123 4567"
                            key={form.key('phoneNumber')}
                            radius="md"
                            {...form.getInputProps('phoneNumber')}
                        />
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Button type="submit" radius="xl" id="login-button">
                            Adatok változtatása
                        </Button>
                    </Group>
                    <Divider my="lg" />
                </form>
            </div>
        </AuthContainer>
    );
};

export default UserForm;