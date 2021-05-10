<template>
  <div class="selection">
    <SfHeader data-cy="app-header1" class="sf-header--has-mobile-search">
      <template>
        <SfSearchBar
          ref="searchBarRef1"
          :placeholder="$t('Search Representative')"
          aria-label="Search"
          class="sf-header__search"
        >
          <template #icon>
            <SfButton
              class="sf-search-bar__button sf-button--pure"
              @click="show = true"
            >
              <span class="sf-search-bar__icon">
                <SfIcon color="var(--c-text)" size="20px" icon="search" />
              </span>
            </SfButton>
          </template>
        </SfSearchBar>
      </template>
      selected Rep :{{selected}}
    </SfHeader>
    <div class="navbar__sort" v-if="show">
      <LazyHydrate on-interaction>
        <div>
          <div class="card" v-for="item in rep" :key="item.name">
            <img
              src="https://www.w3schools.com/howto/img_avatar2.png"
              alt="Avatar"
              style="width: 45%"
            />
            <div class="container">
              <h4>
                <b>{{ item.name }}</b>
              </h4>
              <p>{{ item.location }}</p>
              <SfButton class="btn" @click="onSelect(item)">Shop with me</SfButton>
            </div>
          </div>
        </div>
      </LazyHydrate>
    </div>
  </div>
</template>

<script>
import { SfSelect, SfSearchBar, SfButton, SfIcon } from "@storefront-ui/vue";
import LazyHydrate from "vue-lazy-hydration";
import { ref } from "@vue/composition-api";
import Vue from "vue";

export default {
  components: {
    SfSelect,
    LazyHydrate,
    SfSearchBar,
    SfButton,
    SfIcon,
  },
  setup(props, {root}) {
    const rep = [
      { name: "Rosetta Allen", location: "London" },
      { name: "Louise Fitzpatrick", location: "London" },
    ];
    console.log(root.$cookies.get('vsf-locale'));
    const onSelect=(item)=> {
     // this.selected = item.name;
      sessionStorage.setItem("rep", item.name);
      root.$cookies.set('rep',item.name);
      root.$router.push("/avon/"+item.name);
    }
    return {
      rep,
      onSelect
    };
  },
  data() {
    return {
      selected: "",
      show: "",
    };
  },
  methods: {
    // onSelect(item) {
    //   this.selected = item.name;
    //   sessionStorage.setItem("rep", item.name);
    //   this.$router.push("/avon/"+item.name);
    // },
  },
};
</script>

<style scoped>
.selection {
  width: 30%;
}
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin-top: 10px;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}
.btn {
  background-color: blueviolet;
  color: white;
  margin: 0;
  width: 62%;
}

</style>


