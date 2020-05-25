import axios from 'axios';
import { trim } from 'lodash';
import { IGetTemplateRequest, IGetTemplateResponse } from '../types/service';

export async function getTemplateService(template: string, templateData: any = {}): Promise<IGetTemplateResponse> {
    const { data } = await axios.post(
        `${trim(process.env.REACT_APP_API_URL, '/')}/get-template`,
        {
            template,
            data: templateData
        } as IGetTemplateRequest
    );

    return data;
}
