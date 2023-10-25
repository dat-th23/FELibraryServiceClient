import { useState, useEffect } from 'react'
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import axios from 'axios'
import { useParams } from 'react-router-dom';

export default function BooksBread() {
    const { id } = useParams()

    const [books, setBooks] = useState<string | any>('')
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getAPIData = async () => {
            setLoading(true)
            try {
                const apiResponse = await axios.get(`http://localhost:8080/api/category/${id ? id : 1}`, {
                    headers: {
                        //     "Access-Control-Allow-Origin": "*",
                        //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                    }
                })
                setBooks(apiResponse.data)
            } catch (error) {
                console.log('error', error)
            }
        };
        getAPIData()
        setLoading(false)
    }, [id])
    return (
        <CustomBreadcrumbs
            heading="Thư viện"
            links={[
                { name: 'Loại sách' },
                {
                    name: `${books?.name}`,
                },
            ]}
        />
    )
}