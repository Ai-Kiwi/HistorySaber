import type { PageServerLoad } from './$types';

let cache: Record<string, any> = {};

export const load: PageServerLoad = async ({ params }) => {

    //const response = await fetch('https://api.example.com/data');
    //const data = await response.json();
}