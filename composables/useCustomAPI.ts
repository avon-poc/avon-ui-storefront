import { ref } from '@vue/composition-api';
import axios from 'axios'

const useCustomAPI = function () {
    const offer = ref({});

    const getOffers = async function () {
        console.log('Hi 1')
        const data = await getAPI();
        console.log('Hi', data)
        offer.value = data.data.results;
    }

    return {
        offer, getOffers
    }
}
const url = 'https://api.us-central1.gcp.commercetools.com/poc-avon-uk-dev/cart-discounts?expand=custom.fields.buyList[*]&expand=custom.fields.getList[*]'
function getAPI() {

    const header = {
        headers: {
            Authorization: 'Bearer YKt9_G8QYw_kZD_1BbffnJhVVeXg6sA_'
        }
    }
    return axios.get(url, header);
}

export default useCustomAPI;