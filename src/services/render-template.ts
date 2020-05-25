import axios from 'axios';
import { trim } from 'lodash';
import { IGetTemplateResponse, IRenderTemplateRequest } from '../types/service';

export async function renderTemplateService(mjml: string, templateData: any = {}): Promise<IGetTemplateResponse> {
    const { data } = await axios.post(
        `${trim(process.env.REACT_APP_API_URL, '/')}/render-template`,
        {
            mjml,
            data: templateData
        } as IRenderTemplateRequest
    );

    return data;
}
