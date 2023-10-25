import { useState } from 'react';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Typography, Autocomplete, InputAdornment } from '@mui/material';
// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { IProduct } from '../../../@types/product';
// components
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
import { CustomTextField } from '../../../components/custom-input';
import SearchNotFound from '../../../components/search-not-found';

// ----------------------------------------------------------------------
type Props = {
    books: any
}
export default function ShopProductSearch({ books }: Props) {
    const navigate = useNavigate();
    const { id } = useParams()

    const [searchProducts, setSearchProducts] = useState('');

    const [searchResults, setSearchResults] = useState<any | undefined>(books);
    const [filteredList, setFilteredList] = useState<any | undefined>(books);

    const handleChangeSearch = (event: any) => {
        console.log()
        // Access input value
        const query = event;
        // Create copy of item list
        var updatedList = [...books];
        // console.log(updatedList)
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
            return item.detail.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        console.log(updatedList)
        // Trigger render with updated values
        setSearchResults(updatedList);
    };

    const handleGotoProduct = (name: string) => {
        navigate(PATH_DASHBOARD.eCommerce.view(paramCase(name)));
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleGotoProduct(searchProducts);
        }
    };

    return (
        <Autocomplete
            size="small"
            autoHighlight
            popupIcon={null}
            options={searchResults}
            onInputChange={(event, value) => handleChangeSearch(value)}
            getOptionLabel={(product: IProduct) => product.name}
            noOptionsText={<SearchNotFound query={searchProducts} />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            componentsProps={{
                popper: {
                    sx: {
                        width: `280px !important`,
                    },
                },
                paper: {
                    sx: {
                        '& .MuiAutocomplete-option': {
                            px: `8px !important`,
                        },
                    },
                },
            }}
            renderInput={(params) => (
                <CustomTextField
                    {...params}
                    width={220}
                    placeholder="Search..."
                    onKeyUp={handleKeyUp}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            )}
            renderOption={(props, product, { inputValue }) => {
                const { name, cover } = product;
                const matches = match(name, inputValue);
                const parts = parse(name, matches);

                return (
                    <li {...props}>
                        <Image
                            alt={cover}
                            src={cover}
                            sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }}
                        />

                        <Link underline="none" onClick={() => handleGotoProduct(name)}>
                            {parts.map((part, index) => (
                                <Typography
                                    key={index}
                                    component="span"
                                    variant="subtitle2"
                                    color={part.highlight ? 'primary' : 'textPrimary'}
                                >
                                    {part.text}
                                </Typography>
                            ))}
                        </Link>
                    </li>
                );
            }}
        />
    );
}
