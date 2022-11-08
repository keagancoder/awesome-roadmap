import { Box, Container, Heading, Link, Text } from '@chakra-ui/react';

export function OpensourceBanner() {
  return (
    <Box bg='white' borderTopWidth={1} py={['45px', '45px', '70px']} textAlign='center'>
      <Container maxW='container.sm'>
        <Heading fontSize={['25px', '25px', '35px']} mb={['10px', '10px', '20px']}>Open Source</Heading>
        <Text lineHeight='26px' fontSize={['15px', '15px', '16px']} mb='20px'>该项目是开源项目&nbsp;
          <Link
            _hover={{ textDecoration: 'none' }}
            href='https://roadmap.sh/'
            target='_blank'
            borderBottomWidth={1}
            fontWeight={600}
          >roadmap.sh</Link>的中文修改版，符合国内开发人员学习路线和学习资源，原仓库Github的star数量第六。</Text>
        <iframe
          src='https://ghbtns.com/github-btn.html?user=keagancoder&repo=awesome-roadmap&type=star&count=true&size=large'
          frameBorder='0'
          scrolling='0'
          width='170'
          height='30'
          style={{ margin: 'auto' }}
          title='GitHub'
        />
      </Container>
    </Box>
  );
}
