import {Stack, Text, Heading, Container} from '@chakra-ui/react';
import {useAuth} from './hooks/useAuth';
import {CognitoJwtVerifier} from 'aws-jwt-verify';
import {useEffect} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getMe, UserQueryKeys} from "@cat-hunter/api";
import {AxiosError} from "axios";
import {redirect} from "react-router-dom";

function App() {
  const {accessToken, refreshToken} = useAuth();

  const {
    data: meData,
    error: meError,
  } = useQuery({
    queryKey: UserQueryKeys.ME,
    queryFn: () => getMe(),
    enabled: !!accessToken,
  });

  useEffect(() => {

    if (meError && meError instanceof AxiosError) {

      // If the error is a 404, the user is not found meaning that they are not signed up, so we should redirect them to the onboarding page
      if (meError.response?.status === 404) {
        console.log("Redirecting")
        window.location.href = '/welcome'
        return;
      }

    }
  }, [meError, meData])

  return (
    <Container maxW={'4xl'} my={10}>
      <Stack>
        <Heading>Welcome to Cat Hunter!</Heading>

        {/*<Text>{JSON.stringify(accessToken)}</Text>*/}
        <Text>Saw a cat? Take a picture (coming soon) and upload it here!</Text>
      </Stack>
    </Container>
  );
}

export default App;
