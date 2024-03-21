import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from './AuthButtons';
import AuthModal from '../../Modal/Auth/AuthModal';
import { User, signOut } from 'firebase/auth';
import { auth } from '@/src/firebase/clientApp';
import Icons from './Icons';
import UserMenu from './UserMenu';

type RightContentProps = {
 user?: User | null
};

const RightContent:React.FC<RightContentProps> = ({user}) => {
 
 return (
   <>
     <AuthModal />
     <Flex justify='center' align='centrer'>
       {user ? <Icons/> : <AuthButtons />}
     </Flex>
     <UserMenu user={user}/>
   </>
 );
};
export default RightContent;