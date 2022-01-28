import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './vehicle_model.json',
        method: 'get',
        params: query
    });
};
