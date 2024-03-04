import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from './AuthButtons';
import AuthModal from '../../Modal/Auth/AuthModal';
import { signOut } from 'firebase/auth';
import { auth } from '@/src/firebase/clientApp';

type RightContentProps = {
 user: any
};

const RightContent:React.FC<RightContentProps> = ({user}) => {
 
 return (
   <>
     <AuthModal />
     <Flex justify='center' align='centrer'>
       {user ? <Button onClick={()=>{signOut(auth)}}>Logout</Button> : <AuthButtons />}
     </Flex>
   </>
 )
}
export default RightContent;