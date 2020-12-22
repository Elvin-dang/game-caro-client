import axiosClient from './axiosClient';

const userApi = {
    signin: (user) => {
        const url = 'user/signin';
        return axiosClient.post(url, user);
    },
    signup: (user) => {
        const url = 'user/signup';
        return axiosClient.post(url, user); 
    },
    getUser: (userId) => {
        const url = `user/${userId}`;
        return axiosClient.get(url);
    },
    getCurUser: () => {
        const url = 'user';
        return axiosClient.get(url);
    },
    changePassword: (data) => {
        const url = 'user/changePassword';
        return axiosClient.post(url, data);
    },
    updateUser: (user) => {
        const url = `user/profile`;
        return axiosClient.patch(url, user);
    },
};
export default userApi;