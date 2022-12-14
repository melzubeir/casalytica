import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../components/UI/Typography';
import MyForm from '../components/UI/MyForm';
import { email, required } from '../components/Form/validation';
import RFTextField from '../components/Form/RFTextField';
import FormButton from '../components/Form/FormButton';
import FormFeedback from '../components/Form/FormFeedback';
import withRoot from '../withRoot';
import axios from 'axios';
import DesoLogin from '../components/UI/DesoLogin';

let client = axios.create({
  baseURL: 'https://api.casalytica.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});


function Register() {
  const [sent, setSent] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);
  const username = useSelector(state => state.auth.username);
  const publicKey = useSelector(state => state.auth.publicKey);

  const validate = (values) => {
    const errors = required(['firstName', 'lastName', 'email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    if (!username) {
      errors.Auth = 'You must be logged in to register';
    }
    return errors;
  };

  const handleSubmit = (values) => {

    const payload = {
      "name": values.firstName + " " + values.lastName,
      "email": values.email,
      "password": values.password,
      "creator": {
        "username": username,
        "public_key_base58": publicKey
      }
    }

    client.post('/accounts/create/', payload)
      .then(reponse => {
        setRegistered(true);
      })
      .catch(error => {
        console.log(error);
      });
      setSent(true);
  };

  React.useEffect(() => {
    if (registered) {
      setSent(false);
    }
  }, [registered]);




  return (
    <MyForm>
      <React.Fragment>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          { registered ? "Thank You" : "Registration" }
        </Typography>
        <Typography variant="body2" align="center">
          <DesoLogin
            accessLevel={2}
            JWT={true}
            isButton={false}
            underline="always"
            component="a"
            buttontext={username ? "Logged in as: " + username : 'You must login to DeSo first'}
          />
        </Typography>
      </React.Fragment>

      { registered ? (
        <React.Fragment>
          <Typography variant="h4" gutterBottom marked="center" align="center">
            You are now registered!
          </Typography>
        </React.Fragment>
      ) : (
      <Form
        onSubmit={handleSubmit}
        subscription={{ submitting: true }}
        validate={validate}
      >
        {({ handleSubmit: handleSubmit2, submitting }) => (
          <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  autoFocus
                  component={RFTextField}
                  disabled={submitting || sent}
                  autoComplete="given-name"
                  fullWidth
                  label="First name"
                  name="firstName"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={RFTextField}
                  disabled={submitting || sent}
                  autoComplete="family-name"
                  fullWidth
                  label="Last name"
                  name="lastName"
                  required
                />
              </Grid>
            </Grid>
            <Field
              autoComplete="email"
              component={RFTextField}
              disabled={submitting || sent}
              fullWidth
              label="Email"
              margin="normal"
              name="email"
              required
            />
            <Field
              fullWidth
              component={RFTextField}
              disabled={submitting || sent}
              required
              name="password"
              autoComplete="new-password"
              label="Password"
              type="password"
              margin="normal"
            />
            <FormSpy subscription={{ submitError: true }}>
              {({ submitError }) =>
                submitError ? (
                  <FormFeedback error sx={{ mt: 2 }}>
                    {submitError}
                  </FormFeedback>
                ) : null
              }
            </FormSpy>
            <FormButton
              sx={{ mt: 3, mb: 2 }}
              disabled={submitting || sent}
              color="secondary"
              fullWidth
            >
              {submitting || sent ? 'In progress???' : 'Register'}
            </FormButton>
          </Box>
        )}
      </Form>
      )}
    </MyForm>
  );
}

export default withRoot(Register);
