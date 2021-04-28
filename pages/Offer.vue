<template>
  <div>
    <LazyHydrate on-interaction>
      <div style="display: flex">
        <div class="card" v-for="item in offerData" :key="item.id">
          <img
            :src="item.custom.fields.imageURL"
            alt="Avatar"
            style="width: 45%"
          />
          <div class="container">
            <h4>
              <b>{{ item.name.en }}</b>
            </h4>
            <SfButton class="btn" @click="onSelect(item.id)"
              >view Offer</SfButton
            >
          </div>
        </div>
      </div>
    </LazyHydrate>
  </div>
</template>
<script>
import { ref, computed, onMounted } from "@vue/composition-api";
import { onSSR } from "@vue-storefront/core";
import useCustomAPI from "../composables/useCustomAPI";
import { SfButton } from "@storefront-ui/vue";

export default {
  setup(props, { root }) {
    const { offer, getOffers } = useCustomAPI();
    const offerData = computed(() => offer.value);
    onMounted(async () => {
      await getOffers();
    });
    const onSelect = (item) => {
      root.$router.push("/OfferDetail/" + item);
    };
    return { offerData, onSelect };
  },
  components: {
    SfButton,
  },
};
</script>
<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin: 10px;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.container {
  padding: 2px 16px;
  display: inline-block !important;
}
.btn {
  background-color: blueviolet;
  color: white;
  margin: 0;
  width: 40%;
}
</style>
