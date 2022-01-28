import request from '../utils/request';

export const fetchData2 = query => {
    return request({
        url: 'http://127.0.0.1:5000/test',
        method: 'get',
        params: {
            ID:12345
        }
    });
};
