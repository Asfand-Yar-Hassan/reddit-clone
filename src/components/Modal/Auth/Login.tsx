import { auth } from '@/src/firebase/clientApp'
import { authModalState } from '../../../atoms/authModalAtom'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'
import { FIREBASE_ERRORS } from '@/src/firebase/errors'

type LoginProps = {}

const Login: React.FC<LoginProps> = () => {
  const [authModalStateValue, setAuthModalState] =
    useRecoilState(authModalState)

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signInWithEmailAndPassword(loginForm.email, loginForm.password)
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name='email'
        placeholder='email'
        type='email'
        mb={2}
        onChange={onChange}
        fontSize='10pt'
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        bg='gray.50'
      />
      <Input
        required
        name='password'
        placeholder='password'
        type='password'
        mb={2}
        onChange={onChange}
        fontSize='10pt'
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        bg='gray.50'
      />
      <Text textAlign='center' color='red' fontSize='10pt'>
        {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button
        type='submit'
        width='100%'
        height='36px'
        mt={2}
        mb={2}
        isLoading={loading}>
        Log In
      </Button>
      <Flex justifyContent='center' mb={2}>
        <Text fontSize='9pt' mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize='9pt'
          color='blue.500'
          cursor='pointer'
          onClick={() => {
            setAuthModalState((prev) => ({
              ...prev,
              view: 'resetPassword',
            }))
          }}>
          Reset
        </Text>
      </Flex>
      <Flex fontSize='9pt' justify='center'>
        <Text mr={1}>New here?</Text>
        <Text
          color='blue.500'
          fontWeight={700}
          cursor='pointer'
          onClick={() => {
            setAuthModalState((prev) => ({
              ...prev,
              view: 'signup',
            }))
          }}>
          Sign Up
        </Text>
      </Flex>
    </form>
  )
}
export default Login
