export interface IGetTemplateRequest {
    template: string;
    data: any;
}

export interface IGetTemplateResponse {
    html: string;
    errors: string[];
    mjml: string;
}
