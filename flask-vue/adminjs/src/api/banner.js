import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './banner.json',
        method: 'get',
        params: query
    });
};
