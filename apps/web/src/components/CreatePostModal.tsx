import {z} from "zod";
import {CreatePostSchema} from "@cat-hunter/types";
import {useFormik} from "formik";
import {
  Button,
  FormControl, FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay, Textarea, Text
} from "@chakra-ui/react";

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createPost, PostMutationKeys, PostQueryKeys} from "@cat-hunter/api";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const createPostInitialValues: z.infer<typeof CreatePostSchema> = {
  caption: '',
  location: {
    long: 0,
    lat: 0
  }
}

export function CreatePostModal({isOpen, onClose}: CreatePostModalProps) {

  const queryClient = useQueryClient()

  const {
    mutate: createPostMutation,
    isPending: isCreatePostPending,
    isError: isCreatePostError,
    error: createPostError
  } = useMutation({
    mutationFn: (values: z.infer<typeof CreatePostSchema>) => createPost(values),
    mutationKey: PostMutationKeys.CREATE_POST,
    onSuccess: async (values) => {
      await queryClient.invalidateQueries({
        queryKey: PostQueryKeys.GET_ALL_POSTS,
        exact: false
      })

      onClose()
    }
  })

  const submitForm = (values: z.infer<typeof CreatePostSchema>) => {
    createPostMutation(values)
  }


  const {
    handleSubmit,
    values, setFieldValue
  } = useFormik({
    initialValues: createPostInitialValues,
    onSubmit: submitForm
  })


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Create Post</ModalHeader>
        <ModalCloseButton/>

        <ModalBody>


          <FormControl>
            <FormLabel>
              Caption
            </FormLabel>
            <Textarea value={values.caption} onChange={event => setFieldValue('caption', event.target.value)}
                      placeholder='I saw a really cute cat! A british shorthair!'/>

          </FormControl>

          {isCreatePostError && (
            <Text color={'red.500'}>
              There was a problem creating your post ({createPostError.message})
            </Text>
          )}

        </ModalBody>


        <ModalFooter>
          <Button
            isDisabled={isCreatePostPending}
            colorScheme='blue' mr={3} onClick={onClose} type={'button'}>
            Close
          </Button>
          <Button onClick={() => submitForm(values)}
                  isDisabled={isCreatePostPending || values.caption.trim().length === 0} isLoading={isCreatePostPending}
                  variant='solid'
                  type={'submit'}>Done</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

}
