import { Stack, Text, Heading, Container } from '@chakra-ui/react';
import { useAuth } from './hooks/useAuth';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { useEffect } from 'react';

function App() {
  const { accessToken, refreshToken } = useAuth();

  const verifyToken = () => {
    console.log('accessToken', accessToken);

    if (!accessToken) {
      return;
    }

    const verifier = CognitoJwtVerifier.create({
      userPoolId: 'ap-southeast-1_MO91oKtAW', // Your user pool id here
      clientId: '3g7kko47585j4kbia7j3di5h2l', // Your client id heret
      tokenUse: 'access',
    });

    verifier
      .verify(accessToken)
      .then((decoded) => {
        console.log('decoded', decoded);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <Container maxW={'4xl'} my={10}>
      <Stack>
        <Heading>Welcome to Cat Hunter!</Heading>

        <Text>{JSON.stringify(accessToken)}</Text>
        <Text>Saw a cat? Take a picture (coming soon) and upload it here!</Text>
      </Stack>
    </Container>
  );
}

export default App;
