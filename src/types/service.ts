export interface IGetTemplateRequest {
    template: string;
    data: any;
}

export interface IGetTemplateResponse {
    html: string;
    errors: string[];
    mjml: string;
}

export interface IRenderTemplateRequest {
    mjml: string;
    data: any;
}

export interface IRenderTemplateResponse {
    html: string;
    errors: string[];
}
