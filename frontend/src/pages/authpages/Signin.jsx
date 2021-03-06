import { useState, useEffect, useContext } from 'react';
import { Grid, Stack, TextField, InputAdornment, FormLabel , Link } from '@mui/material';
import { Email, Password } from '@mui/icons-material';
import { HostContext } from '../../util/contexts';
import LoadingButton from '@mui/lab/LoadingButton';
import validator from 'validator'
import formvalidation from '../../util/formvalidation';
import Form from '../../components/forms/Form';

function Signup() { 
    const [formdata, setFormdata] = useState({
        email: { value: '', err: true, touched: false  },
        pass: { value: '', err: true, touched: false  }
    });
    const [formvalid, setFormvalid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [alert, setAlert] = useState({text: undefined, severity: undefined})

    const formValidateEffect = formvalidation.formValidateEffect.bind(null, formdata, setFormvalid);
    const onChangeHandler = formvalidation.onChangeHandler.bind(null, formdata, setFormdata);
    const inErrorState = formvalidation.inErrorState.bind(null, formdata);
    
    /*eslint-disable */
    useEffect(formValidateEffect, [formdata]);

    useEffect(() => {
        const emailparam = new URLSearchParams(window.location.search).get('email');
        if (emailparam !== null)
        {
            setAlert({text: 'Conta criada com sucesso!', severity: 'success'})
            setFormdata({
                ...formdata,
                email: {value: emailparam}
            });
        }
    }, []);
    /*eslint-enable */

    // Backend
    const hostname = useContext(HostContext);
    
    function fetchSignin()
    {
        setIsLoading(true);  
        fetch(hostname + 'auth/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: formdata.email.value,
                pass: formdata.pass.value
            })
        }).then(response => {
            setIsLoading(false);
            if (response.ok) { 
                window.location.reload();
            } else if (response.status === 401) {
                setAlert({text: 'E-mail ou senha incorretos', severity: 'error'});
            } else {
                setAlert({text: 'A tentativa de login falhou', severity: 'error'});
            } 
        });
    }

    return (
        <>
            <Grid container direction="column" alignItems="center">
                <Form title="Entrar no Sinka" alert={alert.text} alertseverity={alert.severity} profileOnSession={true}>
                    <Stack sx={{width: '95%'}} marginY={'1em'} direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={'1em'}>
                        <TextField
                            label="E-mail"
                            placeholder="E-mail"
                            disabled={isLoading}
                            fullWidth
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"><Email /></InputAdornment>
                            ),
                            }}
                            variant="outlined"
                            type="email"
                            onChange={ (event) => onChangeHandler('email', event.target.value, (value) => validator.isEmail(value) ) }
                            value={formdata.email.value}
                            error={inErrorState('email')}
                            helperText={inErrorState('email') ? 'Insira um endere??o de e-mail v??lido' : ''}
                        />

                        <TextField
                            label="Senha"
                            placeholder="Senha"
                            disabled={isLoading}
                            fullWidth
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"><Password /></InputAdornment>
                            ),
                            }}
                            variant="outlined"
                            type="password"
                            autoComplete="new-password"
                            onChange={ (event) => onChangeHandler('pass', event.target.value, (value) => value !== '' ) }
                            value={formdata.pass.value}
                            error={inErrorState('pass')}
                            helperText={inErrorState('pass') ? 'Insira sua senha' : ''}
                        />

                        <LoadingButton loading={isLoading} onClick={fetchSignin} disabled={!formvalid} fullWidth size="large" variant="contained">Entrar</LoadingButton>
                        
                        <Grid container direction="row" alignItems="center" spacing={'0'} sx={{ fontSize:'0.75rem'}}>
                            <FormLabel sx={{ mr:'0.2rem', fontSize:'0.75rem'}}>Ainda n??o possu?? conta?</FormLabel>
                            <Link href="/registre-se" underline="hover">{'Registre-se'}</Link>
                        </Grid>
                    </Stack>
                </Form>
            </Grid >
        </>
    );
}
  
export default Signup;
