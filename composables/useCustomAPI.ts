import { ref } from '@vue/composition-api';
import axios from 'axios';
import { authUrl, baseOfferUrl, offerPageUrl, userName, password } from '../helpers/constants';

const useCustomAPI = function () {
    const offer = ref({});
    const offerDetails = ref({});
    const getOffers = async function () {
        const data = await getAPI(baseOfferUrl);
        offer.value = data.data.results;
    }
    const getOfferDetail = async function (id) {
        const data = await getAPI(baseOfferUrl + id + offerPageUrl);
        offerDetails.value = data.data;
    }
    return {
        offer, offerDetails, getOffers, getOfferDetail
    }
}

async function getAPI(url) {
    const header = {
        headers: {
            Authorization: 'Bearer ' + await getAuthToken()
        }
    }
    return axios.get(url, header);
}

async function getAuthToken() {
    if (getCookie('auth_token') == "") {
        const basicAuth = {
            auth: {
                username: userName,
                password: password
            }
        }
        const data = await axios.post(authUrl, {}, basicAuth);
        setCookie('auth_token', data.data.access_token, 1);
        return data.data.access_token;
    }
    else
        return getCookie('auth_token');
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default useCustomAPI;