<template>
<div>
  <nuxt-link :to="localePath('/OfferDetail/e659e9c7-6b8f-4623-b763-28eb960211c8')" >
        <!-- <p>{{ $t('Download') }}</p> -->
       <SfButton
          class="sf-button--text desktop-only"
          style="margin: 0 0 1rem auto; display: block"
          >
          View Offer
        </SfButton>
  </nuxt-link>
  
  <div>Offer Page {{ offer }}</div>
</div>
</template>
<script>
import { ref, computed, onMounted } from "@vue/composition-api";
import { onSSR } from "@vue-storefront/core";
import useCustomAPI from "../composables/useCustomAPI";
import {
  SfButton,
  
} from "@storefront-ui/vue";

export default {
  setup() {
    const { offer, getOffers } = useCustomAPI();
    const data = computed(() => offer.value);
    onMounted(async () => {
     await getOffers();
    });
    return { offer };
  },
  components:{
    SfButton
  }
};
</script>
