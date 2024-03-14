import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import userPool from '../auth/userPool';

const signUpFormSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be a minimum of 8 characters')
    .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
    .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
    .matches(/^(?=.*[0-9])/, 'Must contain at least one number'),

  confirm_password: yup
    .string()
    .required('Please re-enter your password')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
});

const initialValues = {
  email: '',
  password: '',
  confirm_password: '',
};

export const Signup = () => {
  const [error, setError] = useState<string | null>(null);

  const signUp = (values: typeof initialValues) => {
    userPool.signUp(values.email, values.password, [], [], (err, data) => {
      if (err) {
        console.error(err);
        setError(err.message);
        return;
      } else {
        // Redirect to confirm page
        window.location.href = '/confirm';
      }
    });
  };

  const { values, setFieldValue, errors, dirty, isValid, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpFormSchema,
      onSubmit: signUp,
    });

  useEffect(() => {
    console.log(userPool.getCurrentUser());
  }, []);

  return (
    <Container maxW={'4xl'} my={10}>
      {/*<Text>*/}
      {/*    {JSON.stringify(errors)}*/}
      {/*    {JSON.stringify(values)}*/}
      {/*</Text>*/}

      {error && <Text color={'red.500'}>{error}</Text>}
      <form onSubmit={handleSubmit}>
        <Stack>
          <FormControl isInvalid={!!errors.email && dirty}>
            <Input
              value={values.email}
              type={'email'}
              name={'email'}
              placeholder={'Email'}
              onChange={(e) => {
                setFieldValue('email', e.target.value);
              }}
            />

            {errors.email && (
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.password && dirty}>
            <Input
              value={values.password}
              type={'password'}
              name={'password'}
              placeholder={'Password'}
              onChange={(e) => {
                setFieldValue('password', e.target.value);
              }}
            />

            {errors.password && (
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.confirm_password}>
            <Input
              value={values.confirm_password}
              type={'password'}
              name={'confirm_password'}
              placeholder={'Confirm Password'}
              onChange={(e) => {
                setFieldValue('confirm_password', e.target.value);
              }}
            />

            {errors.confirm_password && (
              <FormErrorMessage>{errors.confirm_password}</FormErrorMessage>
            )}
          </FormControl>

          <Button
            onClick={() => signUp(values)}
            isDisabled={!isValid || !dirty}
            variant={'solid'}
          >
            Sign Up
          </Button>

          <Text>
            Already have an account? <Link href={'/login'}>Log In</Link>
          </Text>
        </Stack>
      </form>
    </Container>
  );
};
