import { communityState } from '@/src/atoms/communitiesAtom'
import { Box, Flex, Icon, MenuItem, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { useRecoilValue } from 'recoil'
import CreateCommunityModal from '../../Modal/CreateCommunity/CreateCommunityModal'
import MenuListItem from './MenuListItem'
import { FaReddit } from 'react-icons/fa'

type CommunitiesProps = {}

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false)
  const mySnippets = useRecoilValue(communityState).mySnippets

  return (
    <>
      <CreateCommunityModal
        open={open}
        handleClose={() => {
          setOpen(false)
        }}
      />
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize='7pt' fontWeight={500} color='gray.500'>
          MODERATING
        </Text>
        {mySnippets
          .filter((item) => item.isModerator)
          .map((snippet) => (
            <MenuListItem
              key={snippet.communityId}
              displayText={`r/${snippet.communityId}`}
              imageURL={snippet.imageURL}
              icon={FaReddit}
              link={`/r/${snippet.communityId}`}
              iconColor='brand.100'
            />
          ))}
      </Box>
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize='7pt' fontWeight={500} color='gray.500'>
          YOUR COMMUNITIES
        </Text>
        <MenuItem
          width='100%'
          fontSize='10pt'
          _hover={{ bg: 'gray.100' }}
          onClick={() => {
            setOpen(true)
          }}>
          <Flex align='center'>
            <Icon fontSize={20} as={GrAdd} mr={2} />
            Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            displayText={`r/${snippet.communityId}`}
            imageURL={snippet.imageURL}
            icon={FaReddit}
            link={`/r/${snippet.communityId}`}
            iconColor='blue.500'
          />
        ))}
      </Box>
    </>
  )
}
export default Communities
