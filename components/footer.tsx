import { Box, Container, Flex, Image, Link, Stack, Text } from '@chakra-ui/react';
import siteConfig from '../content/site.json';
import { CustomAd } from './custom-ad';
import React from 'react';

function NavigationLinks() {
  return (
    <>
      <Stack isInline d={['none', 'none', 'flex']} color='gray.400' fontWeight={600} spacing='30px'>
        <Link _hover={{ color: 'white' }} href='/roadmaps'>路线图</Link>
        <Link _hover={{ color: 'white' }} href='/guides'>教程</Link>
        {/* <Link _hover={{ color: 'white' }} href='/watch'>Videos</Link>
        <Link _hover={{ color: 'white' }} href='/about'>About</Link>
        <Link _hover={{ color: 'white' }} href={siteConfig.url.youtube} target='_blank'>YouTube</Link> */}
      </Stack>

      {/* <Stack d={['flex', 'flex', 'none']} color='gray.400' fontWeight={600} spacing={0}>
        <Link py='7px' borderBottomWidth={1} borderBottomColor='gray.800' _hover={{ color: 'white' }}
              href='/roadmaps'>Roadmaps</Link>
        <Link py='7px' borderBottomWidth={1} borderBottomColor='gray.800' _hover={{ color: 'white' }}
              href='/guides'>Guides</Link>
        <Link py='7px' borderBottomWidth={1} borderBottomColor='gray.800' _hover={{ color: 'white' }}
              href='/watch'>Videos</Link>
        <Link py='7px' borderBottomWidth={1} borderBottomColor='gray.800' _hover={{ color: 'white' }}
              href='/about'>About</Link>
        <Link py='7px' _hover={{ color: 'white' }} target='_blank'
              href={siteConfig.url.youtube}>YouTube</Link>
      </Stack> */}
    </>
  );
}

export function Footer() {
  return (
    <Box bg='brand.hero' p={['25px 0', '25px 0', '40px 0']}>
      <Container maxW='container.md'>
        <NavigationLinks />

        <Box mt={['40px', '40px', '50px']} mb='40px' maxW='500px'>
          <Flex spacing={0} alignItems='center' color='gray.400'>
            <Link d='flex' alignItems='center' fontWeight={600} _hover={{ textDecoration: 'none', color: 'white' }}
                  href='/'>
              <Image alt='' h='25px' w='25px' src='/logo.svg' mr='6px' />
              Awesome-roadmap
            </Link>
          </Flex>

          <Text my='20px' fontSize='14px' color='gray.500'>开源创建的路线图、文章、资源和教程，以帮助你选择你的道路并在你的职业生涯中成长。</Text>

          <Text fontSize='14px' color='gray.500'>
            <Text as='span' mr='10px'>&copy; roadmap.sh</Text>&middot;
            <Link href='/about' _hover={{ textDecoration: 'none', color: 'white' }} color='gray.400'
                  mx='10px'>常见问题</Link>&middot;
            <Link href='/terms' _hover={{ textDecoration: 'none', color: 'white' }} color='gray.400'
                  mx='10px'>服务条款</Link>&middot;
            <Link href='/privacy' _hover={{ textDecoration: 'none', color: 'white' }} color='gray.400'
                  mx='10px'>隐私</Link>
          </Text>
        </Box>
      </Container>

      <CustomAd />
    </Box>
  );
}
