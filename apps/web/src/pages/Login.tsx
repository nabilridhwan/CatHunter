import { Button, Container, Input, Link, Stack, Text } from '@chakra-ui/react';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { useFormik } from 'formik';
import { useAuth } from '../hooks/useAuth';
import userPool from '../auth/userPool';
import { useScroll } from 'framer-motion';
import { useState } from 'react';

const initialValues = {
  email: '',
  password: '',
};

export const Login = () => {
  const { setAccessToken, setRefreshToken } = useAuth();

  const [error, setError] = useState();

  const login = (values: typeof initialValues) => {
    const cognitoUser = new CognitoUser({
      Username: values.email,
      Pool: userPool,
    });

    const authenticationDetails = new AuthenticationDetails({
      Username: values.email,
      Password: values.password,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        setAccessToken(session.getAccessToken().getJwtToken());
        setRefreshToken(session.getRefreshToken().getToken());

        console.log(session, cognitoUser);

        window.location.href = '/';
      },
      onFailure: (err) => {
        if (err.name === 'UserNotConfirmedException') {
          //     TODO: Redirect to confirm email page
          window.location.href = '/confirm';
          return;
        }

        setError(err.message);
        console.log(err);
      },
    });
  };

  const { values, setFieldValue, handleSubmit, isValid, dirty } = useFormik({
    initialValues,
    onSubmit: login,
  });

  return (
    <Container maxW={'4xl'} my={10}>
      <form onSubmit={handleSubmit}>
        <Stack>
          {error && <Text color={'red.500'}>{error}</Text>}

          <Input
            onChange={(e) => {
              setFieldValue('email', e.target.value);
            }}
            type={'email'}
            name={'email'}
            placeholder={'Email'}
          />

          <Input
            onChange={(e) => {
              setFieldValue('password', e.target.value);
            }}
            type={'password'}
            name={'password'}
            placeholder={'Password'}
          />

          <Button
            isDisabled={!isValid || !dirty}
            type={'submit'}
            onClick={() => login(values)}
            variant={'solid'}
          >
            Login
          </Button>
        </Stack>
      </form>
      <Text>
        New here? <Link href={'/signup'}>Sign up</Link>
      </Text>
    </Container>
  );
};
