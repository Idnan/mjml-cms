import axios from 'axios';
import { IGetTemplateRequest, IGetTemplateResponse } from '../types/service';

export async function getTemplateService(template: string, templateData: any = {}): Promise<IGetTemplateResponse> {
    const { data } = await axios.post(
        'http://localhost:9000/get-template',
        {
            template,
            data: templateData
        } as IGetTemplateRequest
    );

    return data;
}
