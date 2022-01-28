import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './app_category.json',
        method: 'get',
        params: query
    });
};
