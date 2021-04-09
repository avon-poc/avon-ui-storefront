<template>
  <div>
    SEARCH PAGE
    {{ SearchData }}
  </div>
</template>
<script>
import { useUiHelpers } from "~/composables";
import { ref, computed, onMounted } from "@vue/composition-api";
import { getCurrentInstance } from "@vue/composition-api";

export default {
  name: "Search",
  transition: "fade",
  setup(props, context) {
    const SearchData = ref();
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
          //renderOnPage(data);
          SearchData.value = { ...data.response };
        })
        .catch(function (data) {
          console.log("Error: ", data);
        });
    });

    return {
      SearchData,
    };
  },
};
</script>
