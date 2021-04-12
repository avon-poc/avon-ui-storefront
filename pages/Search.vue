<template>
  <div>
    <div class="avon-search">
      <div class="avon-search__header">
        <h1>Search Result Page</h1>
        <p
          class="total-count"
          v-if="didYouMean && Object.keys(didYouMean).length != 0"
        >
          No Result for {{ query.term }}
          <br />
          Did you mean "{{ didYouMean[0] && didYouMean[0].text }}"?
        </p>
      </div>
      <div class="avon-search__body">
        <div class="search-result">
          <div
            class="product-card"
            v-for="product in products"
            :key="product.key"
          >
            <div class="product-card__image">
              <img :src="product.attributes.image_url[0]" />
            </div>
            <div class="product-card__detail">
              <h2 class="product-card__title">
                {{ product.attributes.title[0] }}
              </h2>
              <button class="product-card__cta">View Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useUiHelpers } from "~/composables";
import { ref, computed, onMounted } from "@vue/composition-api";
import { getCurrentInstance } from "@vue/composition-api";
import LazyHydrate from "vue-lazy-hydration";

export default {
  name: "Search",
  transition: "fade",
  setup(props, context) {
    const SearchData = ref();
    const products = ref();
    const didYouMean = ref();
    const getInstance = () => {
      const vm = getCurrentInstance();
      return vm.$root;
    };
    const instance = getInstance();

    const { query } = instance.$router.history.current;
    console.log({ query });
    onMounted(() => {
      var apiApptus = window.esalesAPI({
        market: "UK",
        clusterId: "wFE4AE5CF",
      });
      apiApptus
        .panel("/search-page/search-result-zone", {
          window_first: 1,
          window_last: 10,
          search_phrase: query.term,
          max_facets: 10,
          // filter: "category:'book'",
        })
        .then(function (data) {
          SearchData.value = { ...data.response };
          products.value = { ...data.response.hits[0].products };
          didYouMean.value = { ...data.response.hits[2].corrections };
          // console.log({ products, didYouMean });
        })
        .catch(function (data) {
          console.log("Error: ", data);
        });
    });

    console.log("asdf", { products, didYouMean });

    return {
      SearchData,
      query,
      products,
      didYouMean,
    };
  },
  components: {
    LazyHydrate,
  },
};
</script>

<style lang="scss" scoped>
.avon-search__header {
  margin-bottom: 30px;
  h1 {
    color: #546264 !important;
    font-family: var(--font-family);
    font-weight: 400;
    text-align: center;
    font-size: 40px;
  }
  p {
    color: #546264 !important;
    font-family: var(--font-family);
    font-weight: 300;
    text-align: center;
    font-size: 25px;
    margin: 5px 0;
  }
}
.product-card {
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 30px;
  &__image {
    img {
      width: 100%;
    }
    width: 40%;
  }
  &__detail {
    width: 58%;
    h2 {
      color: #000;
      font-family: var(--font-family);
      font-size: 23px;
      font-weight: 500;
    }
  }
  &__cta {
    margin: 0 auto;
    display: block;
    margin-top: 15px;
    border: none;
    background: var(--c-primary);
    color: #fff;
    padding: 14px 11px;
    width: 220px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
  }
}
</style>
