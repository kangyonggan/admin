import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = '/api/';
} else if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:8080/api/';
}

Vue.use(VueAxios, axios);
