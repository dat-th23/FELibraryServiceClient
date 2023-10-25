// @mui
import { Box, BoxProps } from '@mui/material';
// @type
// import { IProduct } from '../../../@types/product';
import { IBook } from '../../../@types/books';
// components
import { SkeletonProductItem } from '../../../components/skeleton';
//
import BookCards from './BookCards';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
    products: IBook[];
    loading: boolean;
}

export default function ShopProductList({ products, loading, ...other }: Props) {
    return (
        <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(, 1fr)',
            }}
            {...other}
        >
            {(loading ? [...Array(12)] : products).map((product, index) =>
                product ? (
                    <BookCards key={product.id} product={product} />
                ) : (
                    <SkeletonProductItem key={index} />
                )
            )}
        </Box>
    );
}
