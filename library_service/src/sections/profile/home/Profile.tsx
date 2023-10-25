// @mui
import { Grid, Stack } from '@mui/material';
// @types
import { IUserProfile, IUserProfilePost } from '../../../@types/user';
//
import ProfileAbout from './ProfileAbout';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileGeneral from './ProfileGeneral'

// ----------------------------------------------------------------------

type Props = {
    info: IUserProfile;
    posts: IUserProfilePost[];
};

export default function Profile({ info, posts }: Props) {
    return (
        <Grid container spacing={3}>

            <Grid item xs={12} md={12}>
                <Stack spacing={3}>
                    <ProfileGeneral />

                </Stack>
            </Grid>
        </Grid>
    );
}
