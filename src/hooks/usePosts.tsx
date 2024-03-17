import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState, useRecoilValue } from 'recoil'
import { authModalState } from '../atoms/authModalAtom'
import { communityState } from '../atoms/communitiesAtom'
import { Post, PostVote, postState } from '../atoms/postsAtom'
import { auth, firestore, storage } from '../firebase/clientApp'
import { useRouter } from 'next/router'

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState)
  const [user] = useAuthState(auth)
  const router = useRouter()
  const currentCommunity = useRecoilValue(communityState).currentCommunity
  const [authModalStateValue, setAuthModalState] =
    useRecoilState(authModalState)

  const onVote = async (post: Post, vote: number, communityId: string) => {
    if (!user?.uid) {
      setAuthModalState({ open: true, view: 'login' })
      return
    }
    try {
      const { voteStatus } = post
      const existingVote = postStateValue.postVotes.find(
        (vote) => vote.postId === post.id
      )
      const batch = writeBatch(firestore)
      const updatedPost = { ...post }
      const updatedPosts = [...postStateValue.posts]
      let updatedPostVotes = [...postStateValue.postVotes]
      let voteChange = vote

      if (!existingVote) {
        // create a new postVote document for firebase
        const postVoteRef = doc(
          collection(firestore, 'users', `${user?.uid}/postVotes`)
        )
        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id!,
          communityId,
          voteValue: vote,
        }
        batch.set(postVoteRef, newVote)

        updatedPost.voteStatus = voteStatus + vote
        updatedPostVotes = [...updatedPostVotes, newVote]
      } else {
        const postVoteRef = doc(
          firestore,
          'users',
          `${user?.uid}/postVotes/${existingVote.id}`
        )

        if (existingVote.voteValue === vote) {
          updatedPost.voteStatus = voteStatus - vote
          updatedPostVotes = updatedPostVotes.filter(
            (vote) => vote.id !== existingVote.id
          )

          batch.delete(postVoteRef)
          voteChange *= -1
        } else {
          updatedPost.voteStatus = voteStatus + 2 * vote
          const voteIndex = postStateValue.postVotes.findIndex(
            (vote) => vote.id === existingVote.id
          )

          updatedPostVotes[voteIndex] = {
            ...existingVote,
            voteValue: vote,
          }

          batch.update(postVoteRef, {
            voteValue: vote,
          })

          voteChange = vote * 2
        }
      }

      const postRef = doc(firestore, 'posts', post.id!)
      batch.update(postRef, { voteStatus: voteStatus + voteChange })

      await batch.commit()

      const postIndex = postStateValue.posts.findIndex(
        (item) => item.id === post.id
      )
      updatedPosts[postIndex] = updatedPost

      setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPosts,
        postVotes: updatedPostVotes,
      }))
    } catch (error) {
      console.log('onVoteError', error)
    }
  }

  const onSelectPost = (post: Post) => {
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: post,
    }))
    router.push(`/r/${post.communityId}/comments/${post.id}`)
  }

  const onDeletPost = async (post: Post): Promise<Boolean> => {
    try {
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`)
        await deleteObject(imageRef)
      }

      const postDocRef = doc(firestore, 'posts', post.id!)
      await deleteDoc(postDocRef)

      setPostStateValue((prev) => ({
        ...prev,
        post: prev.posts.filter((item) => item.id !== post.id),
      }))
      return true
    } catch (error) {
      return false
    }
  }

  const getCommunityPostVotes = async (communityId: string) => {
    const postVotesQuery = query(
      collection(firestore, 'users', `${user?.uid}/postVotes`),
      where('commmunityId', '==', communityId)
    )

    const postVoteDocs = await getDocs(postVotesQuery)
    const postVotes = postVoteDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    setPostStateValue((prev) => ({
      ...prev,
      postVotes: postVotes as PostVote[],
    }))
  }

  useEffect(() => {
    if (!user || !currentCommunity?.id) return
    getCommunityPostVotes(currentCommunity?.id)
  }, [currentCommunity, user])

  //clear user votes when logged out
  useEffect(() => {
    if (!user) {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }))
    }
  }, [user])

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletPost,
  }
}
export default usePosts
