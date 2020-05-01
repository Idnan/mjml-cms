import axios from 'axios';
import { IGetTemplateResponse, IRenderTemplateRequest } from '../types/service';

export async function renderTemplateService(mjml: string, templateData: any = {}): Promise<IGetTemplateResponse> {
    const { data } = await axios.post(
        'http://localhost:9000/render-template',
        {
            mjml,
            data: templateData
        } as IRenderTemplateRequest
    );

    return data;
}
