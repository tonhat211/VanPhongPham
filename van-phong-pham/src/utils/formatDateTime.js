import { format } from 'date-fns';


function formatDateTime(input) {
    return format(new Date(input), 'dd-MM-yyyy HH:mm:ss');
}

export default formatDateTime;