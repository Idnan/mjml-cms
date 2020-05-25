import axios from 'axios';
import { trim } from 'lodash';

export async function listTemplateService(): Promise<string[]> {
    const { data } = await axios.get(`${trim(process.env.REACT_APP_API_URL, '/')}/list-template`);

    return data;
}
