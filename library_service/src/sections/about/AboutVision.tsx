import { m } from 'framer-motion';
// @mui
import { Box, Container, Typography, Stack } from '@mui/material';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function AboutVision() {
  return (
    <Container component={MotionViewport} sx={{ mt: 10 }}>
      <Box
        sx={{
          mb: 10,
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Image src="https://danviet.mediacdn.vn/upload/2-2015/images/2015-04-17/1434179549-hqkzthu_vien_my_2_jatu.jpg" alt="about-vision" />

        {/*  */}
      </Box>


    </Container>
  );
}
