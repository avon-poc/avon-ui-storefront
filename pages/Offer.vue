<template>
  <div>Offer Page {{ data }}</div>
</template>
<script>
import { ref, computed, onMounted } from "@vue/composition-api";
import { onSSR } from "@vue-storefront/core";
import useCustomAPI from "../composables/useCustomAPI";

export default {
  setup() {
    const { offer, getOffers } = useCustomAPI();
    const data = computed(() => offer.value);
    onMounted(async () => {
     await getOffers();
    });
    return { data };
  },
};
</script>
