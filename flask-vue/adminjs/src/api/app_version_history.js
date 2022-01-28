import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './app_version_history.json',
        method: 'get',
        params: query
    });
};
