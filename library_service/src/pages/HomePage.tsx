import { Helmet } from 'react-helmet-async';
import { m, useScroll, useSpring } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
// sections
import {

  HomeHeader,
  HomeCategory,
  HomeHot,
  HomeBanner,
  HomeList,
} from '../sections/home';

// ----------------------------------------------------------------------

export default function HomePage() {
  const theme = useTheme();

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progress = (
    <m.div
      style={{
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1999,
        position: 'fixed',
        transformOrigin: '0%',
        backgroundColor: theme.palette.primary.main,
        scaleX,
      }}
    />
  );

  return (
    <>
      <Helmet>
        <title> Trang chủ</title>
      </Helmet>

      <HomeHeader />
      <Container sx={{ pt: 10, position: 'relative' }}>
        <HomeCategory />
        <HomeHot />
      </Container>
      <HomeBanner />

      <Container>
        <HomeList />
      </Container>
    </>
  );
}
