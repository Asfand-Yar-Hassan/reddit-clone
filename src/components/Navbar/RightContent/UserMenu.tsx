import { authModalState } from '@/src/atoms/authModalAtom'
import { communityState } from '@/src/atoms/communitiesAtom'
import { auth } from '@/src/firebase/clientApp'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { User, signOut } from 'firebase/auth'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaRedditSquare } from 'react-icons/fa'
import { IoSparkles } from 'react-icons/io5'
import { MdOutlineLogin } from 'react-icons/md'
import { VscAccount } from 'react-icons/vsc'
import { useRecoilState, useResetRecoilState } from 'recoil'

type MenuProps = {
  user?: User | null
}

const UserMenu: React.FC<MenuProps> = ({ user }) => {
  const [authModalStateValue, setAuthModalState] =
    useRecoilState(authModalState)

  const logout = async () => {
    await signOut(auth)
  }
  return (
    <>
      <Menu>
        <MenuButton
          cursor='pointer'
          padding='0px 6px'
          borderRadius={4}
          _hover={{ outline: '1px solig', outlineColor: 'gray.200' }}>
          <Flex align='center'>
            <Flex align='center'>
              {user ? (
                <>
                  <Icon
                    as={FaRedditSquare}
                    fontSize={24}
                    mr={1}
                    color='gray.300'
                  />
                  <Flex
                    direction='column'
                    display={{ based: 'none', lg: 'flex' }}
                    fontSize='8pt'
                    align='flex-start'
                    mr={8}>
                    <Text fontWeight={700}>
                      {user?.displayName || user?.email?.split('@')[0]}
                    </Text>
                    <Flex>
                      <Icon as={IoSparkles} color='brand.100' mr={1} />
                      <Text color='gray.400'>1 karma</Text>
                    </Flex>
                  </Flex>
                </>
              ) : (
                <Icon as={VscAccount} fontSize={24} color='gray.400' mr={1} />
              )}
            </Flex>
            <ChevronDownIcon />
          </Flex>
        </MenuButton>
        <MenuList>
          {user ? (
            <>
              <MenuItem
                fontSize='10pt'
                fontWeight={700}
                _hover={{ bg: 'blue.500', color: 'white' }}>
                <Flex align='center'>
                  <Icon as={CgProfile} fontSize={20} mr={2} />
                  Profile
                </Flex>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                fontSize='10pt'
                fontWeight={700}
                _hover={{ bg: 'blue.500', color: 'white' }}
                onClick={() => {
                  logout()
                }}>
                <Flex align='center'>
                  <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
                  Log Out
                </Flex>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                fontSize='10pt'
                fontWeight={700}
                _hover={{ bg: 'blue.500', color: 'white' }}
                onClick={() => {
                  setAuthModalState((prev) => ({
                    open: true,
                    view: 'login',
                  }))
                }}>
                <Flex align='center'>
                  <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
                  Log In / Sign Up
                </Flex>
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </>
  )
}
export default UserMenu
