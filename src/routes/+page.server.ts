import { getTableInfo } from '$lib/server/database'
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ params }) => {

    //const response = await fetch('https://api.example.com/data');
    //const data = await response.json();



    const system_info = await getTableInfo()

    return {
        info : system_info
    };
}