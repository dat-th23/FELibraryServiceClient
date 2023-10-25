// @mui
import { Box, BoxProps } from '@mui/material';
// @type
import { IProduct } from '../../../@types/product';
import { IBook } from '../../../@types/books';
// components
import { SkeletonProductItem } from '../../../components/skeleton';
//
import HomeBookCard from './HomeBookCard';
import product from 'src/redux/slices/product';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
    products: IBook[];
    loading: boolean;
}

export default function HomeBookList({ products, loading, ...other }: Props) {
    return (
        <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
            }}
            {...other}
        >
            {(loading ? [...Array(12)] : products).map((product, index) =>
                product && product.status == "HOT" ? (
                    <HomeBookCard key={product.id} product={product} />
                ) : (
                    // <SkeletonProductItem key={index} />
                    ""
                )
            )}
        </Box>
    );
}
