import {
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { useFormik } from 'formik';
import { useState } from 'react';
import userPool from '../auth/userPool';

const initialValues = {
  code: '',
};

export const ConfirmUser = () => {
  const [error, setError] = useState<string | null>(null);

  const confirmUser = (values: typeof initialValues) => {
    const userData = {
      Username: 'nabridhwan@gmail.com',
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(values.code, true, (err, result) => {
      if (err) {
        console.error(err);
        setError(err.message);

        // Empty the code field
        setFieldValue('code', '');
      } else {
        console.log('Success', result);
        window.location.href = '/login';
      }
    });
  };

  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    onSubmit: confirmUser,
  });

  const handleResendVerificationCode = () => {
    const userData = {
      Username: 'nabridhwan@gmail.com',
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Success', result);
      }
    });
  };

  return (
    <Container maxW={'4xl'}>
      <Stack>
        <Heading>Confirm your account</Heading>

        <Text>
          An email has been sent to your email address. Please enter the
          verification code to confirm your account.
        </Text>

        {error && <Text color={'red.500'}>{error}</Text>}

        <form onSubmit={handleSubmit}>
          <Input
            value={values.code}
            onChange={(e) => {
              setFieldValue('code', e.target.value);
            }}
            type={'text'}
            name={'code'}
            placeholder={'Verification Code'}
          />
          <Button isDisabled={!values.code} type={'submit'} variant={'solid'}>
            Confirm
          </Button>
        </form>

        <Text>
          Didn't receive the email?{' '}
          <Button onClick={handleResendVerificationCode}>Resend</Button>
        </Text>
      </Stack>
    </Container>
  );
};
