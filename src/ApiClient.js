// import axios from 'axios';
const axios = require('axios');

class RestClient {
    constructor(apiBaseUrl) {
        this.apiBaseUrl = apiBaseUrl;
    }

    get(url, request, callback) {
        request.method = 'get';
        this.request(request, url, callback);
    }

    post(headers, url, callback) {
        this.request('post', headers, url, callback);
    }

    request(request, url, callback) {
        request.url = this.apiBaseUrl + url;
        axios(request)
            .then(response => callback(null, response))
            .catch(error => {
                console.log(error);
                callback('error')
                // callback(error.response.data.Message);
            });
    }
}

class ApiClient {
    constructor(apiBaseUrl, errorHandler) {
        this.client = new RestClient(apiBaseUrl);
        this.errorHandler = errorHandler;
    }

    login(email, success, error) {
        this.client.get('login/'+email, {}, (err, response) => {
            if (err) {
                return error(err);
            }

            this.saveToken(response.data.code);
            success(response);
        });
    }

    getAuthorized(url, callback) {
        const request = {
            headers: {'Authorization': "Bearer " + this.getToken()}
        };
        this.client.get(url, request, (err, response) => {
            if (err) {
                return this.errorHandler(err);
            }

            callback(response);
        });
    }

    getActivations(callback) {
        this.getAuthorized('referral/activations', callback);
    }

    getReferralInfo(callback) {
        this.getAuthorized('referral/info', callback);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    saveToken(token) {
        return localStorage.setItem('token', token);
    }

}

module.exports = ApiClient;
