import { useSearchParams } from 'react-router-dom';

export function useUpdateUrlParams() {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log('useUpdateUrlParams');

    return function updateUrlParams(updates) {
        const newParams = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                newParams.set(key, value.toString());
            } else {
                newParams.delete(key);
            }
        });

        setSearchParams(newParams);
    };
}


// export const updateUrlParams = (searchParams, setSearchParams, updates) => {
//     const newParams = new URLSearchParams(searchParams.toString());
//     Object.entries(updates).forEach(([key, value]) => {
//         if (value !== null && value !== undefined) {
//             newParams.set(key, value.toString());
//         } else {
//             newParams.delete(key);
//         }
//     });
//     setSearchParams(newParams);
// };