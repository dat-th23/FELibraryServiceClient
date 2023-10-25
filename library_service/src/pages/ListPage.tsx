import { Helmet } from 'react-helmet-async';
// @mui
import { Divider, Container, Grid, Box } from '@mui/material';
// sections
import { BookPostsPage } from '../sections/list';
import NavVertical from '../sections/list/nav/NavVertical'

// ----------------------------------------------------------------------

export default function ListPage() {
    return (
        <>
            <Helmet>
                <title> Danh mục</title>
            </Helmet>

            <Container sx={{ mt: 4, position: 'relative' }}>
                <Grid container spacing={2}>
                    <Grid item md={3} sx={{

                    }}>
                        <NavVertical />
                    </Grid>
                    <Grid item md={9}>
                        <BookPostsPage />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
