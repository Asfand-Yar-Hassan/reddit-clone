import type { NextPage } from 'next'
import { useAuthState } from 'react-firebase-hooks/auth'
import PageContent from '../components/Layout/PageContent'
import { auth, firestore } from '../firebase/clientApp'
import { useEffect, useState } from 'react'
import { communityState } from '../atoms/communitiesAtom'
import { useRecoilValue } from 'recoil'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import usePosts from '../hooks/usePosts'
import { Post } from '../atoms/postsAtom'
import PostLoader from '../components/Posts/PostLoader'
import { Stack } from '@chakra-ui/react'
import CreatePostLink from '../components/Community/CreatePostLink'
import PostItem from '../components/Posts/PostItem'

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth)
  const [loading, setLoading] = useState(false)
  const communityStateValue = useRecoilValue(communityState)
  const {
    postStateValue,
    setPostStateValue,
    onSelectPost,
    onDeletPost,
    onVote,
  } = usePosts()

  const buildUserHomeFeed = () => {}

  const buildNoUserHomeFeed = async () => {
    setLoading(true)
    try {
      const postQuery = query(
        collection(firestore, 'posts'),
        orderBy('voteStatus', 'desc'),
        limit(10)
      )
      const postDocs = await getDocs(postQuery)
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }))
    } catch (error) {
      console.log('buildNoUserHomeFeed error', error)
    }
    setLoading(false)
  }

  const getUserPostVotes = () => {}

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed()
  }, [user, loadingUser])

  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id
                  )?.voteValue
                }
                onDeletePost={onDeletPost}
                onVote={onVote}
                onSelectPost={onSelectPost}
                userIsCreator={user?.uid === post.creatorId}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <>{/* <Recommendations/> */}</>
    </PageContent>
  )
}
export default Home
