import React from 'react'
import { useRecoilState } from 'recoil'
import { Post, postState } from '../atoms/posts'
import { firestore, storage } from '../firebase/clientApp'
import { deleteObject, ref } from 'firebase/storage'
import { deleteDoc, doc } from 'firebase/firestore'

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState)

  const onVote = () => {}

  const onSelectPost = () => {}

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

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletPost,
  }
}
export default usePosts
