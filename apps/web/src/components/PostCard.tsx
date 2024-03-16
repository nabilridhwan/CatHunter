import {z} from "zod";
import {PostCommentsResponseSchema, PostResponseSchema} from "@cat-hunter/types";
import {
  Avatar, Button, Container,
  Divider, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay,
  Flex, Heading,
  HStack, IconButton, Input, InputGroup, InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text, useDisclosure
} from "@chakra-ui/react";
import {DateTime} from "luxon";
import {IoIosHeartEmpty} from "react-icons/io";
import {GoComment} from "react-icons/go";
import {useMe} from "../hooks/useMe";
import {BsMenuButton, BsThreeDotsVertical} from "react-icons/bs";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deletePost, getPostComments, PostMutationKeys, PostQueryKeys} from "@cat-hunter/api";
import {motion} from "framer-motion";
import {IoSend} from "react-icons/io5";

export default function PostCard(post: z.infer<typeof PostResponseSchema>[number] & { custom: number }) {

  const {
    isOpen,
    onOpen,
    onClose,
  } = useDisclosure()

  const {data: profileData} = useMe()

  const {
    data: commentsData
  } = useQuery({
    queryKey: PostQueryKeys.GET_POST_COMMENTS(post.post_id),
    queryFn: () => getPostComments(post.post_id),
    enabled: isOpen,
    select: data => data?.data
  })

  /**
   * isPostOwner is a boolean that checks if the current user is the owner of the post
   * Only the Post owner can delete or edit the post
   * @type {boolean}
   */
  const isPostOwner = profileData?.user_id === post.user_id || false;

  const queryClient = useQueryClient()

  const {
    mutate: deletePostMutation,
  } = useMutation({
    mutationKey: PostMutationKeys.DELETE_POST,
    mutationFn: () => deletePost(post.post_id),
    onSuccess: () => {
      //   Refetch the posts after deleting the post
      queryClient.invalidateQueries({
        queryKey: PostQueryKeys.GET_ALL_POSTS,
        exact: false
      })
    }
  })

  const handleDeletePost = () => {
    deletePostMutation()
  }

  return (
    <>

      <motion.div
        variants={{
          initial: ({y: -300, opacity: 0}),
          animate: custom => ({y: 0, opacity: 1, transition: {delay: custom * .05, ease: 'easeInOut'}}),
          exit: {x: 500, opacity: 0, transition: {ease: 'easeOut'}}
        }}
        initial={'initial'}
        animate={'animate'}
        exit={'exit'}
        transition={{duration: 0.2, ease: 'linear'}}
        custom={post.custom}
      >

        <Stack gap={2} key={post.post_id} p={3} borderWidth={1} rounded={'2xl'}>

          <HStack>

            <Avatar w={10} h={10} name={post.user.name}/>

            <Stack gap={0}>
              <Text fontWeight={'bold'}>
                {post.user.name}
              </Text>

              <Text fontSize={'sm'} color={'gray.500'}>
                @{post.user.username}
              </Text>


            </Stack>

            <Spacer/>

            {isPostOwner && (
              <Menu>
                <MenuButton
                  color={'gray.500'}
                  p={1.5}
                  transition='all 0.2s'
                  borderRadius='md'
                >
                  <BsThreeDotsVertical size={14}/>
                </MenuButton>
                <MenuList>
                  <MenuItem>Edit Post</MenuItem>
                  <MenuItem onClick={handleDeletePost} color={'red.500'}>Delete Post</MenuItem>
                </MenuList>
              </Menu>
            )}

          </HStack>


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
            <Flex onClick={onOpen} role={'button'} alignItems={'center'} color={'gray.500'} gap={1}>
              <GoComment size={16}/>

              <Text fontSize={'sm'}>
                {post.comments} Comments
              </Text>

            </Flex>

          </HStack>
        </Stack>


      </motion.div>


      {/*  Post comments drawer*/}
      <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay/>
        <DrawerContent borderTopRadius={10} pt={5}>
          <Container maxW={'3xl'}>

            <DrawerHeader>
              Comments
            </DrawerHeader>
            <DrawerBody py={5}>

              {!commentsData?.length && (
                <Text textAlign={'center'} color={'gray.500'}>
                  No comments yet
                </Text>
              )}

              {commentsData?.map(comment => (
                <CommentBubble post_user_id={post.user_id} comment={comment} key={comment.comment_id}/>
              ))}


              <InputGroup mt={10}>
                <Input placeholder={'Add a comment'}/>
                <InputRightElement>
                  <IconButton variant={'ghost'} aria-label={'Send comment'} icon={<IoSend/>}/>
                </InputRightElement>
              </InputGroup>
            </DrawerBody>

          </Container>
        </DrawerContent>
      </Drawer>
    </>

  )

}

export function CommentBubble({comment, post_user_id}: {
  comment: z.infer<typeof PostCommentsResponseSchema>[number],
  post_user_id: string
}) {

  const isOriginalPoster = comment.user_id === post_user_id

  return (
    <Stack p={3} borderWidth={1} rounded={'2xl'}>
      <HStack>
        <Text fontWeight={'bold'} fontSize={'sm'}>
          {comment.user.name}
        </Text>

        <Text fontSize={'sm'} color={'gray.500'}>
          @{comment.user.username}
        </Text>

        {isOriginalPoster && (
          <Text fontSize={'xs'} fontWeight={'bold'} color={'blue.500'}>
            OP
          </Text>
        )}

        <Spacer/>

        <Text fontSize={'xs'} color={'gray.500'}>
          {DateTime.fromISO(comment.created_at).toRelative({
            padding: 0.5
          })}
        </Text>
      </HStack>

      <Text>
        {comment.comment}
      </Text>
    </Stack>
  )
}
