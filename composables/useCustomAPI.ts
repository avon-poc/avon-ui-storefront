import { ref } from '@vue/composition-api';
import axios from 'axios'

const useCustomAPI = function () {
    const offer = ref({});
    const offerDetails = ref({});
    const offerUrl = 'https://api.us-central1.gcp.commercetools.com/poc-avon-uk-dev/cart-discounts'
    const offerDetailsUrl = 'https://api.us-central1.gcp.commercetools.com/poc-avon-uk-dev/cart-discounts/e659e9c7-6b8f-4623-b763-28eb960211c8?expand=custom.fields.buyList[*]&expand=custom.fields.getList[*]'
    const getOffers = async function () {
        const data = await getAPI(offerUrl);
        offer.value = data.data.results;
    }
    const getOfferDetail = async function () {
        const data = await getAPI(offerDetailsUrl);
        offerDetails.value = data.data;
    }
    return {
        offer, offerDetails, getOffers, getOfferDetail
    }
}

function getAPI(url) {

    const header = {
        headers: {
            Authorization: 'Bearer a-bEJTp6V9ysWYubIZqp3Yky9y8jnj7u'
        }
    }
    return axios.get(url, header);
}

export default useCustomAPI;