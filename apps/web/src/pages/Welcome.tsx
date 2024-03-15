import {useMutation} from "@tanstack/react-query";
import {createUser, UserQueryKeys} from "@cat-hunter/api";
import {z} from "zod";
import {CreateUserSchema} from "@cat-hunter/types";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage, FormHelperText,
  FormLabel,
  Heading,
  Input, Select,
  Stack,
  Text,
  Textarea
} from "@chakra-ui/react";
import {useFormik} from "formik";

const initialValues: z.infer<typeof CreateUserSchema> = {
  name: '',
  bio: '',
  country: '',
  username: '',
}

export default function Welcome() {

  const {
    mutateAsync: createUserMutation,
    isPending: isCreatingUser,
    isError: createUserError,
  } = useMutation({
    mutationKey: UserQueryKeys.CREATE_USER,
    mutationFn: (body: z.infer<typeof CreateUserSchema>) => createUser(body),
    onSuccess: () => {
      //   Redirect to home
      window.location.href = '/home'
    }
  })

  const createUserFn = async (values: typeof initialValues) => {
    await createUserMutation(values)
  }

  const {
    values,
    errors,
    handleSubmit,
    setFieldValue,
    dirty,
    isValid,
    touched
  } = useFormik({
    initialValues,
    onSubmit: createUserFn
  })

  return (
    <Container maxW={'4xl'} my={10}>

      <Stack gap={5}>
        <Stack>
          <Heading>
            Hello,<br/>Welcome to Cat Hunter!
          </Heading>

          <Text>
            Let's get your profile set up so you can start hunting cats!
          </Text>
        </Stack>

        <form onClick={handleSubmit}>
          <Stack>

            <FormControl isInvalid={!!errors.username && touched.username}>

              <FormLabel>
                Username
              </FormLabel>

              <Input
                value={values.username}
                type={'text'}
                name={'username'}
                placeholder={'Username'}
                onChange={(e) => {
                  setFieldValue('username', e.target.value);
                }}
              />

              {errors.username && (
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.name && touched.name}>

              <FormLabel>
                Name
              </FormLabel>


              <Input
                value={values.name}
                type={'text'}
                name={'name'}
                placeholder={'Name'}
                onChange={(e) => {
                  setFieldValue('name', e.target.value);
                }}
              />

              <FormHelperText>
                This is the name that will be displayed to other users
              </FormHelperText>

              {errors.name && (
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              )}
            </FormControl>


            <FormControl isInvalid={!!errors.bio && touched.bio}>

              <FormLabel>
                Bio
              </FormLabel>

              <Textarea
                value={values.bio}
                name={'bio'}
                placeholder={'A little about yourself'}
                onChange={(e) => {
                  setFieldValue('bio', e.target.value);
                }}
              />

              {errors.bio && (
                <FormErrorMessage>{errors.bio}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.country && touched.country}>

              <FormLabel>
                Country
              </FormLabel>

              <Select
                value={values.country}
                name={'country'}
                placeholder={'Country'}
                onChange={(e) => {
                  setFieldValue('country', e.target.value);
                }}
              >
                <option value="SG">Singapore</option>
                <option value="_">Others</option>
              </Select>

              {errors.country && (
                <FormErrorMessage>{errors.country}</FormErrorMessage>
              )}
            </FormControl>

            <Button isDisabled={!isValid || !dirty} type={'submit'} isLoading={isCreatingUser}>
              Done
            </Button>

          </Stack>
        </form>
      </Stack>

    </Container>
  )

}
