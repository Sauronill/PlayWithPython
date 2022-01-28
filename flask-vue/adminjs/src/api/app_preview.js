import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './app_preview.json',
        method: 'get',
        params: query
    });
};
