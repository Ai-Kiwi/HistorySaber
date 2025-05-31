import { getTableInfo } from '$lib/server/database/main'
import type { PageServerLoad } from './$types';

let cache: Record<string, any> = {};

export const load: PageServerLoad = async ({ params }) => {

    //const response = await fetch('https://api.example.com/data');
    //const data = await response.json();


    void (async () => {
        cache["system_info"] = await getTableInfo()
    })()

    if (!cache["system_info"]) {
        cache["system_info"] = await getTableInfo()
    }

    return {
        info : cache["system_info"]
    };
    


}