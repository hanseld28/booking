import { Constants } from './constants';

interface ApiBuilderUrl {
    buildedUrl: string;
    endWithJson: boolean; 
    params?: string[];
    hasQueryParams?: boolean;
}

const addSeparatorOnUrl = (url: string, separator: '/' | '&' | '?'): string => {
    return url.concat(!url.endsWith(separator) ? separator : '');
}

const addBackslashOnUrlIfNeeded = (url: string) => {
    return addSeparatorOnUrl(url, '/');
}

const addQueryParamSeparatorOnUrlIfNeeded = (url: string) => {
    return addSeparatorOnUrl(url, '&');
}

const addInitializerQueryParamCharacter = (url: string) => {
    return addSeparatorOnUrl(url, '?');
}

const isLastParam = (paramsLength: number, currentIndex: number) => {
    return (paramsLength - 1) === currentIndex;
}

export function apiUrlBuilder({ buildedUrl, endWithJson, params = [], hasQueryParams = false }: ApiBuilderUrl): string {    
    const fixedApiUrl = Constants.API_URL;
    
    if (!buildedUrl.includes(fixedApiUrl)) {
        const buildedUrlWithBackslash = addBackslashOnUrlIfNeeded(fixedApiUrl);
        buildedUrl = `${buildedUrlWithBackslash}${buildedUrl}`;
    }

    if (params.length > 0 && params !== null) 
    {
        let i = 0;

        if (!hasQueryParams) 
        {
            buildedUrl = addBackslashOnUrlIfNeeded(buildedUrl);

            for (; i < params.length; i++) 
            {
                buildedUrl = buildedUrl.concat(params[i]);

                if (isLastParam(params.length, i)) 
                {
                    buildedUrl = buildedUrl.concat((endWithJson) ? '.json' : '');
                }
            }
        } 
        else 
        {           
            buildedUrl = buildedUrl.concat((endWithJson) ? '.json' : '');
            buildedUrl = addInitializerQueryParamCharacter(buildedUrl);
            
            for (; i < params.length; i++) 
            {
                buildedUrl = buildedUrl.concat(params[i]);
                
                if (!isLastParam(params.length, i)) 
                {
                    buildedUrl = addQueryParamSeparatorOnUrlIfNeeded(buildedUrl);
                }
            }
        }
    } 
    else 
    {
        buildedUrl = buildedUrl.concat((endWithJson) ? '.json' : '');
    }

    return buildedUrl;
};

