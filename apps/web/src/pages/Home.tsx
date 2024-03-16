import {
  Stack,
  Container,
  useDisclosure
} from '@chakra-ui/react';
import {useQuery} from "@tanstack/react-query";
import {getMe, getPosts, PostQueryKeys, UserQueryKeys} from "@cat-hunter/api";
import {RiPencilFill} from "react-icons/ri";
import {z} from "zod";
import {CreatePostSchema, PostResponseSchema} from "@cat-hunter/types";
import PostCard from '../components/PostCard'
import {CreatePostModal} from "../components/CreatePostModal";
import {FloatingActionButton} from "../components/FloatingActionButton";
import {AnimatePresence} from "framer-motion";

function Home() {
  const {
    data: postsData,
    error: postsError,
  } = useQuery({
    queryKey: PostQueryKeys.GET_ALL_POSTS,
    queryFn: () => getPosts(),
    select: (data) => (data.data) as z.infer<typeof PostResponseSchema>,
  });

  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <Container maxW={'2xl'} my={10}>

      <FloatingActionButton onClick={onOpen} icon={<RiPencilFill size={20}/>}/>


      <Stack>
        <AnimatePresence presenceAffectsLayout={true} mode={'popLayout'}>
          {/*Posts Body*/}
          {postsData?.map((post, i) => (
            <PostCard custom={i} {...post} key={post.post_id}/>
          ))}
        </AnimatePresence>

      </Stack>

      {/*  Create post modal */}
      <CreatePostModal isOpen={isOpen} onClose={onClose}/>
    </Container>
  );
}


export default Home;
