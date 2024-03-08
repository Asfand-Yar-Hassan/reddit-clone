import { Flex } from '@chakra-ui/react'
import React, { ReactPropTypes } from 'react'

type PageContentProps = {
  children: any
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    // Parent container
    <Flex border='1px solid red' justify='center' p='16px 0px'>
      {/* Content container */}
      <Flex
        border='1px solid green'
        width='95%'
        justify='center'
        maxWidth='860px'>
        {/* Left Hand content container */}
        <Flex
          border='1px solid blue'
          direction='column'
          width={{ base: '100%', md: '65%' }}
          mr={{ base: 0, md: 6 }}>
          {children && children[0]}
        </Flex>
        {/* Right hand content container */}
        <Flex
          border='1px solid orange'
          direction='column'
          display={{ base: 'none', md: 'flex' }}
          flexGrow={1}>
          {children && children[1]}
        </Flex>
      </Flex>
    </Flex>
  )
}
export default PageContent
