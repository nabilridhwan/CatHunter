import {Stack, Text, Heading, Container} from '@chakra-ui/react';
import {useAuth} from './hooks/useAuth';
import {CognitoJwtVerifier} from 'aws-jwt-verify';
import {useEffect} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getMe, UserQueryKeys} from "@cat-hunter/api";
import {AxiosError} from "axios";
import {redirect} from "react-router-dom";
import {useMe} from "./hooks/useMe";

function App() {
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
