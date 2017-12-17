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

    delete(url, request, callback) {
        request.method = 'delete';
        this.request(request, url, callback);
    }

    post(url, data, request, callback) {
        request.method = 'post';
        this.request(request, url, callback);
    }

    put(url, data, request, callback) {
        request.method = 'put';
        request.data = data;
        this.request(request, url, callback);
    }

    request(request, url, callback) {
        request.url = this.apiBaseUrl + url;
        console.log(request);
        axios(request)
            .then(response => callback(null, response))
            .catch(error => {
                if (typeof callback === 'function') {
                    callback(error);
                }
            });
    }
}

class ApiClient {
    constructor(apiBaseUrl, errorHandler) {
        this.client = new RestClient(apiBaseUrl);
        this.errorHandler = errorHandler;
    }

    login(email, password, success, error) {
        this.client.get('login/'+email+'/'+password, {}, (err, response) => {
            if (err) {
                return error(err);
            }
            this.saveToken(response.data._code);
            this.saveEmail(response.data.email);
            if(response.data.status == 0)
                success(response);
            else
                error(response);
        });
    }

    addMySet(key, price, success) {
        this.putAuthorized('/mysets', {'key': key, 'price': price}, success);
    }

    removeMySet(key, success) {
        this.deleteAuthorized('/mysets/' + key, success);
    }

    getMySet(success) {
        this.getAuthorized('/mysets', success);
    }

    getSets(theme, year, success) {
        this.getAuthorized('/sets/' + year + '/' + theme, success);
    }

    getSet(key, success) {
        this.getAuthorized('/set/' + key, success);
    }

    getSales(success) {
        this.getAuthorized('/sales', success);
    }

    getThemes(success) {
        this.getAuthorized('/themes', success);
    }

    getAuthorized(url, callback) {
        this.client.get(url, this.getHeaders(), this.getResponseHandler(callback));
    }

    deleteAuthorized(url, callback) {
        this.client.delete(url, this.getHeaders(), this.getResponseHandler(callback));
    }

    putAuthorized(url, data, callback) {
        this.client.put(url, data, this.getHeaders(), this.getResponseHandler(callback));
    }

    getResponseHandler(callback) {
        return (err, response) => {
            if (err) {
                return this.errorHandler(err);
            }

            callback(response.data);
        }
    }

    getHeaders() {
        return {
            headers: {'Authorization': "Bearer " + this.getToken()}
        };
    }

    getToken() {
        return localStorage.getItem('token');
    }

    saveToken(token) {
        return localStorage.setItem('token', token);
    }

    getEmail() {
        return localStorage.getItem('email');
    }

    saveEmail(email) {
        return localStorage.setItem('email', email);
    }

    register(email, password, success, error) {
        this.client.get('register/'+email+'/'+password, {}, (err, response) => {
            if (err) {
                return error(err);
            }
            this.saveToken(response.data._code);
            this.saveEmail(response.data.email);
            if(response.data.status == 0)
                success(response);
            else if (response.data.status == 2)
                success(response);
            else
                error(response);
        });
    }
}

module.exports = ApiClient;
