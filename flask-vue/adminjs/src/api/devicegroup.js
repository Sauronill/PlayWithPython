import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './devicegroup.json',
        method: 'get',
        params: query
    });
};
