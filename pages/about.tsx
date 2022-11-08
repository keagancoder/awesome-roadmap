import React from 'react';
import { Box, Button, Container, Flex, Heading, Image, Link, Stack, Text } from '@chakra-ui/react';
import { GlobalHeader } from '../components/global-header';
import { OpensourceBanner } from '../components/opensource-banner';
import { Footer } from '../components/footer';
import MdRenderer from '../components/md-renderer';
import Helmet from '../components/helmet';
import { TeamsBanner } from '../components/teams-banner';

function AboutHeader() {
  return (
    <Box pt={['45px', '45px', '70px']} pb={['45px', '45px', '55px']} borderBottomWidth={1} mb='30px' textAlign='left'
         position='static'
         top='10px'>
      <Helmet
        title={'About roadmap.sh'}
      />
      <Container maxW='container.md' position='relative' textAlign='left'>
        <Flex alignItems='center'>

          <Box>
            <Heading as='h1' color='black' fontSize={['35px', '35px', '40px']} fontWeight={700} mb='10px'>
              关于Awesome Roadmap
            </Heading>
            <Text fontSize={['15px', '15px', '17px']} color='gray.700' mb='15px'>
              开源项目来帮助开发人员在困惑时找到他们的道路，并帮助他们在职业生涯中成长。
            </Text>

            <Stack isInline flexDirection={['column', 'column', 'row']} spacing={0} shouldWrapChildren>


              <Button as={Link} bg='green.500' color='white' size='sm'
                      _hover={{ textDecoration: 'none', bg: 'green.700' }} href='mailto:kamranahmed.se@gmail.com'
                      target='_blank'>
                Email
              </Button>
            </Stack>

          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default function About() {
  const AboutContent = require(`../content/pages/about.md`).default;

  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
      <Box mb='60px'>
        <AboutHeader />
        <Container maxW={'container.md'} position='relative'>
          <MdRenderer>
            <AboutContent />
          </MdRenderer>
        </Container>
      </Box>

      <OpensourceBanner />
      <TeamsBanner />
      <Footer />
    </Box>
  );
}
