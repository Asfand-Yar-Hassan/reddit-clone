import { Flex } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from './AuthButtons';
import AuthModal from '../../Modal/Auth/AuthModal';

type RightContentProps = {
 
};

const RightContent:React.FC<RightContentProps> = () => {
 
 return(
  <>
  <AuthModal/>
  <Flex justify="center" align="centrer">
   <AuthButtons/>
  </Flex>
  </>
 )
}
export default RightContent;