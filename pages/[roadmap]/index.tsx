import React from 'react';
import { Box, Button, Container, Flex, Heading, Image, Input, Text } from '@chakra-ui/react';
import { GlobalHeader } from '../../components/global-header';
import { OpensourceBanner } from '../../components/opensource-banner';
import { Footer } from '../../components/footer';
import {
  filterRoadmapsByIds,
  getAllRoadmaps,
  getRoadmapById,
  isInteractiveRoadmap,
  RoadmapType
} from '../../lib/roadmap';
import MdRenderer from '../../components/md-renderer';
import Helmet from '../../components/helmet';
import { RoadmapPageHeader } from '../../components/roadmap/roadmap-page-header';
import { InteractiveRoadmapRenderer } from './interactive';
import { BellIcon, EmailIcon } from '@chakra-ui/icons';
import { RelatedRoadmaps } from '../../components/related-roadmaps';
import { TeamsBanner } from '../../components/teams-banner';

type RoadmapProps = {
  roadmap: RoadmapType;
};

function ImageRoadmap(props: RoadmapProps) {
  const { roadmap } = props;

  if (isInteractiveRoadmap(roadmap.id)) {
    return <InteractiveRoadmapRenderer roadmap={roadmap} />;
  }

  if (!roadmap.imageUrl) {
    return null;
  }

  return (
    <Container maxW={'900px'} position='relative'>
      <Box mb='30px'>
        <Image alt={roadmap.title} src={roadmap.imageUrl} />
      </Box>
    </Container>
  );
}

function TextualRoadmap(props: RoadmapProps) {
  const { roadmap } = props;
  if (!roadmap.landingPath) {
    return null;
  }

  // Remove trailing slashes
  const normalizedPath = roadmap.landingPath.replace(/^\//, '');
  const LandingContent = require(`../../content/${normalizedPath}`).default;

  return (
    <Container maxW={'container.md'} position='relative'>
      <MdRenderer>
        <LandingContent />
      </MdRenderer>
    </Container>
  );
}

function UpcomingRoadmap(props: RoadmapProps) {
  const { roadmap } = props;
  if (!roadmap.isUpcoming) {
    return null;
  }

  return (
    <Container maxW={'container.md'} position='relative' mx='auto'>
      <Flex flexDir='column' alignItems='center' borderWidth={1} rounded='lg' py={10} boxShadow='inner' px={5}>
        <BellIcon w='90px' h='90px' color='gray.200' mb={5} />
        <Heading mb={2} fontSize='2xl'>即将推出的路线图</Heading>
        <Text fontSize='sm' mb={4}>请稍后回来查看或在下面订阅。</Text>

      </Flex>
    </Container>
  );
}

type RoadmapPageProps = RoadmapProps & {
  relatedRoadmaps: RoadmapType[]
};

export default function Roadmap(props: RoadmapPageProps) {
  const { roadmap, relatedRoadmaps } = props;

  return (
    <Box bg='white' minH='100vh'>
      <GlobalHeader />
      <Helmet
        title={roadmap?.seo?.title || roadmap.title}
        description={roadmap?.seo?.description || roadmap.description}
        keywords={roadmap?.seo.keywords || []}
        roadmap={roadmap}
      />
      <Box mb='60px'>
        <RoadmapPageHeader roadmap={roadmap} />
        <ImageRoadmap roadmap={roadmap} />
        <TextualRoadmap roadmap={roadmap} />
        <UpcomingRoadmap roadmap={roadmap} />
      </Box>
      <RelatedRoadmaps roadmaps={relatedRoadmaps} />

      <OpensourceBanner />
      <TeamsBanner />
      <Footer />
    </Box>
  );
}

type StaticPathItem = {
  params: {
    roadmap: string;
  };
};

export async function getStaticPaths() {
  const roadmaps = getAllRoadmaps();
  const paramsList: StaticPathItem[] = roadmaps.map((roadmap) => ({
    params: { roadmap: roadmap.id }
  }));

  return {
    paths: paramsList,
    fallback: false
  };
}

type ContextType = {
  params: {
    roadmap: string;
  };
};

export async function getStaticProps(context: ContextType) {
  const roadmapId: string = context?.params?.roadmap;
  const roadmap: RoadmapType = getRoadmapById(roadmapId)!;
  const relatedRoadmaps: RoadmapType[] = filterRoadmapsByIds(roadmap?.relatedRoadmaps || []);

  return {
    props: {
      roadmap,
      relatedRoadmaps,
    }
  };
}
