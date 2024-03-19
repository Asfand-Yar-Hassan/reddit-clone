import { Post, postState } from '@/src/atoms/postsAtom'
import { firestore } from '@/src/firebase/clientApp'
import {
  Text,
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from '@chakra-ui/react'
import { User } from 'firebase/auth'
import {
  Timestamp,
  collection,
  doc,
  increment,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import CommentInput from './CommentInput'
import CommentItem, { Comment } from './CommentItem'

type CommentsProps = {
  user: User
  selectedPost: Post | null
  communityId: string
}

const Comments: React.FC<CommentsProps> = ({
  user,
  selectedPost,
  communityId,
}) => {
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [fetchLoading, setFetchLoading] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const setPostState = useSetRecoilState(postState)

  const onCreatecomment = async () => {
    setCreateLoading(true)
    try {
      const batch = writeBatch(firestore)
      const commentDocRef = doc(collection(firestore, 'comments'))

      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.email!.split('@')[0] as string,
        communityId,
        postId: selectedPost?.id!,
        postTitle: selectedPost?.title!,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      }

      batch.set(commentDocRef, newComment)

      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp

      const postDocRef = doc(firestore, 'posts', selectedPost?.id!)
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      })

      await batch.commit()

      setCommentText('')
      setComments((prev) => [newComment, ...prev])
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
      }))
    } catch (error) {
      console.log('onCreateComment error', error)
    }
    setCreateLoading(false)
  }
  console.log('comments', comments)

  const onDeleteComment = async (comment: Comment) => {}

  const getPostComments = async () => {}

  useEffect(() => {
    getPostComments()
  }, [])

  return (
    <Box bg={'white'} borderRadius={'0px 0px 4px 4px'} p={2}>
      <Flex
        direction={'column'}
        pl={10}
        pr={4}
        mb={6}
        fontSize={'10pt'}
        width={'100%'}>
        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          createLoading={createLoading}
          user={user}
          onCreateComment={onCreatecomment}
        />
      </Flex>
      <Stack spacing={6} p={2}>
        {fetchLoading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} padding={6} bg={'white'}>
                <SkeletonCircle size='10' />
                <SkeletonText mt={4} noOfLines={2} spacing={4} />
              </Box>
            ))}
          </>
        ) : (
          <>
            {comments.length === 0 ? (
              <Flex
                direction='column'
                justify='center'
                align='center'
                borderTop='1px solid'
                borderColor='gray.100'
                p={20}>
                <Text fontWeight={700} opacity={0.3}>
                  No Comments Yet
                </Text>
              </Flex>
            ) : (
              <>
                {comments.map((item) => (
                  <CommentItem
                    key={item.id}
                    comment={item}
                    userId={user.uid}
                    onDelete={onDeleteComment}
                    loadingDelete={false}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Stack>
    </Box>
  )
}
export default Comments
