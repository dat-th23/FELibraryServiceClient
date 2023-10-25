import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Container, Typography } from '@mui/material';
// components
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'url(/assets/background/bg-book.jpg)',
    opacity: 0.8,
    padding: theme.spacing(10, 0),
    marginTop: 90,
    [theme.breakpoints.up('md')]: {
        height: 560,
        padding: 0,
    },
}));

const StyledContent = styled('div')(({ theme }) => ({
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
        bottom: 200,
        textAlign: 'left',
        position: 'absolute',
    },
}));

// ----------------------------------------------------------------------

export default function AboutHero() {
    return (
        <StyledRoot>
            <Container component={MotionContainer}>
                <StyledContent>
                    <TextAnimate
                        text="Thư"
                        sx={{
                            color: 'primary.main',
                        }}
                        variants={varFade().inRight}
                    />
                    <TextAnimate
                        text="viện"
                        sx={{
                            color: 'primary.main',
                            pl: 2
                        }}
                        variants={varFade().inUp}
                    />
                    <TextAnimate
                        text="sách"
                        sx={{
                            color: 'primary.main',
                            pl: 2
                        }}
                        variants={varFade().inRight}
                    />

                    <br />


                    <m.div variants={varFade().inRight}>
                        <Typography
                            variant="h4"
                            sx={{
                                mt: 5,
                                color: 'common.main',
                                fontWeight: 'fontWeightMedium',
                            }}
                        >
                            Được xây dựng nhằm mục đích
                            <br /> phụng sự nhân loại phát triển về Trí và Tuệ
                        </Typography>
                    </m.div>
                </StyledContent>
            </Container>
        </StyledRoot>
    );
}
