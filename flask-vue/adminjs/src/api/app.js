import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './app.json',
        method: 'get',
        params: query
    });
};
