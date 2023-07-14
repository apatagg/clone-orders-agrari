import React, {useState} from "react";
import {ActionIcon, Button, Container, Paper, TextInput} from '@mantine/core';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs'
import {Asterisk, At, Eye} from 'tabler-icons-react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import {WpAuth} from '../models/wp-auth';
import StorageService from '../services/storage.service';

dayjs.extend(customParseFormat)

const Login = () => {
    const auth = getAuth();
    const db = getFirestore();
    const [togglePassword, setTogglePassword] = useState(true);
    const [form, setForm] = useState<{email: string, password: string}>({email: '', password: ''});

    const handleSubmit = () => {
        signInWithEmailAndPassword(auth, form.email, form.password)
            .then((userCredential) => {
                // Signed in
                //const user = userCredential.user;
                const docRef = doc(db, "settings", "wp-tk");

                getDoc(docRef).then(doc => {
                    const wpAuth = doc.data() as WpAuth;
                    StorageService.getInstance().store({key: 'WPTK', value: wpAuth});
                    window.location.href = '/builder';
                });
            })
    }

    return (
        <Container>
            <Paper shadow="xs" p="md">
                <TextInput
                    icon={<At size={14}/>}
                    placeholder="Email"
                    label="Email:"
                    type={'email'}
                    value={form.email}
                    onChange={(event) => setForm({...form, email: event.currentTarget.value})}
                    required
                />
                <TextInput
                    icon={<Asterisk size={14}/>}
                    rightSection={
                        <ActionIcon onClick={() => setTogglePassword(!togglePassword)}>
                            <Eye size={14}/>
                        </ActionIcon>
                    }
                    placeholder="Contraseña"
                    label="Contraseña:"
                    value={form.password}
                    onChange={(event) => setForm({...form, password: event.currentTarget.value})}
                    type={(togglePassword ? 'password' : 'text')}
                    required
                />
                <Button onClick={handleSubmit} fullWidth style={{marginTop: '1rem'}}>Submit</Button>
            </Paper>
        </Container>
    );

};

export default Login;
