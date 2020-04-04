import axios from 'axios';

export async function listTemplateService(): Promise<string[]> {
    const { data } = await axios.get('http://localhost:9000/list-template');

    return data;
}
