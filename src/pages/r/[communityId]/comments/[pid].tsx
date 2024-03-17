import PageContent from '@/src/components/Layout/PageContent'
import PostItem from '@/src/components/Posts/PostItem'
import { auth } from '@/src/firebase/clientApp'
import usePosts from '@/src/hooks/usePosts'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const PostPage: React.FC = () => {
  const { postStateValue, setPostStateValue, onDeletPost, onVote } = usePosts()
  const [user] = useAuthState(auth)
  return (
    <PageContent>
      <>
        {postStateValue.selectedPost && (
          <PostItem
            post={postStateValue.selectedPost}
            onDeletePost={onDeletPost}
            onVote={onVote}
            userVoteValue={
              postStateValue.postVotes.find(
                (item) => item.id === postStateValue.selectedPost?.id
              )?.voteValue
            }
            userIsCreator={postStateValue.selectedPost?.creatorId === user?.uid}
          />
        )}
      </>
      <></>
    </PageContent>
  )
}
export default PostPage
