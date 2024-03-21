import { Button, Flex, Link } from '@chakra-ui/react';

const CommunityNotFound: React.FC = () => {
  return (
    <Flex
      direction='column'
      justify='center'
      alignItems='center'
      minHeight='60vh'>
      Sorry, that community does not exist or has been banned
      <Link href='/'>
        <Button mt={4}>Go Home</Button>
      </Link>
    </Flex>
  );
};
export default CommunityNotFound;
