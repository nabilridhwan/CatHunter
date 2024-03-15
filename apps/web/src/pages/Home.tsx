import {Stack, Text, Heading, Container, Button, IconButton, Tooltip, HStack, Flex, Divider} from '@chakra-ui/react';
import {useAuth} from '../hooks/useAuth';
import {CognitoJwtVerifier} from 'aws-jwt-verify';
import {useEffect} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getMe, getPosts, PostQueryKeys, UserQueryKeys} from "@cat-hunter/api";
import {AxiosError} from "axios";
import {redirect} from "react-router-dom";
import {IoIosAdd, IoIosHeartEmpty} from "react-icons/io";
import {RiPencilFill} from "react-icons/ri";
import CreatePost from "./post/CreatePost";
import {GoComment} from "react-icons/go";
import {z} from "zod";
import {PostResponseSchema} from "@cat-hunter/types";
import {DateTime} from "luxon";

function Home() {
  const {
    data: postsData,
    error: postsError,
  } = useQuery({
    queryKey: PostQueryKeys.GET_ALL_POSTS,
    queryFn: () => getPosts(),
    select: (data) => (data.data) as z.infer<typeof PostResponseSchema>,
  });

  return (
    <Container maxW={'2xl'} my={10}>

      <FloatingActionButton/>


      <Stack>
        {/*Posts Body*/}

        {postsData?.map(post => (
          <PostCard {...post} key={post.post_id}/>
        ))}

      </Stack>
    </Container>
  );
}

function PostCard(post: z.infer<typeof PostResponseSchema>[number]) {
  return (
    <Stack gap={2} key={post.post_id} p={3} shadow={'md'} borderWidth={1} rounded={'2xl'}>

      <Stack gap={0}>
        <Text fontWeight={'bold'}>
          {post.user.name}
        </Text>

        <Text fontSize={'sm'} color={'gray.500'}>
          @{post.user.username}
        </Text>


      </Stack>

      <Text>{post.caption}</Text>

      <Text ml='auto' fontSize={'xs'} color={'gray.500'} mt={1}>
        {DateTime.fromISO(post.created_at).toRelative({
          padding: 0.5
        })}
      </Text>


      <Divider mt={5}/>

      <HStack mt={1} gap={4}>
        {/*  Likes */}
        <Flex alignItems={'center'} color={'gray.500'} gap={1}>
          <IoIosHeartEmpty role={"button"} size={16}/>

          <Text fontSize={'sm'}>
            {post.likes} Likes
          </Text>

        </Flex>

        {/*Comments*/}
        <Flex role={'button'} alignItems={'center'} color={'gray.500'} gap={1}>
          <GoComment size={16}/>

          <Text fontSize={'sm'}>
            {post.comments} Comments
          </Text>

        </Flex>

      </HStack>
    </Stack>
  )

}

function FloatingActionButton() {
  return (
    <Tooltip
      label="Create a Post"
      aria-label="Create a Post"
    >

      <IconButton
        zIndex={999}
        rounded={'full'}
        colorScheme={'teal'}
        w={62}
        h={62}
        onClick={() => {
          window.location.href = '/create'
        }}
        dropShadow={'lg'}
        icon={<RiPencilFill size={30}/>}
        aria-label={'Create Post Button'}
        position={'fixed'}
        bottom={0}
        right={0}
        m={5}
      />
    </Tooltip>
  )

}

export default Home;
