import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './top_recommendation.json',
        method: 'get',
        params: query
    });
};
