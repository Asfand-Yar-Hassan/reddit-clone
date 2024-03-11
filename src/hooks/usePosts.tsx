import React from 'react'
import { useRecoilState } from 'recoil'
import { postState } from '../atoms/posts'

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState)

  const onVote = () => {}

  const onSelectPost = () => {}

  const onDeletPost = async () => {}

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletPost,
  }
}
export default usePosts
