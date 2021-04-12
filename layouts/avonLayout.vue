<template>
  <div>
    <LazyHydrate when-visible>
      <TopBar class="desktop-only" />
    </LazyHydrate>

    <div id="layout">
      <LazyHydrate when-idle>
        <AppHeader />
      </LazyHydrate>

      <nuxt :key="$route.fullPath" />

      <LazyHydrate when-visible>
        <BottomNavigation />
      </LazyHydrate>

      <LazyHydrate when-visible>
        <AppFooter />
      </LazyHydrate>

      <CartSidebar />
      <WishlistSidebar />
      <LoginModal />
    </div>
  </div>
</template>

<script>
import AppHeader from "~/components/AppHeader.vue";
import BottomNavigation from "~/components/BottomNavigation.vue";
import AppFooter from "~/components/AppFooter.vue";
import TopBar from "~/components/TopBar.vue";
import CartSidebar from "~/components/CartSidebar.vue";
import WishlistSidebar from "~/components/WishlistSidebar.vue";
import LoginModal from "~/components/LoginModal.vue";
import LazyHydrate from "vue-lazy-hydration";
import {ref, onMounted} from '@vue/composition-api';

export default {
  components: {
    LazyHydrate,
    TopBar,
    AppHeader,
    BottomNavigation,
    AppFooter,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
  },
  setup(props,{root}){
       onMounted(()=>{
         let rep =sessionStorage.getItem('rep')
         if(rep)
           root.$router.push('/avon/'+rep);
       })
  }
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";

#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}

// Reset CSS
html {
  width: auto;
  overflow-x: hidden;
}
body {
  font-family: "Montserrat,Arial" !important;
  --font-family--primary: "Montserrat,Arial" !important;
  --font-family--secondary: "Montserrat,Arial" !important;
  --font-size--base: 1.2rem !important;
  -webkit-font-smoothing: antialiased !important;
  color: #546264 !important;
}
a {
  text-decoration: none;
  color: var(--c-link);
  &:hover {
    color: #7f28c4;
  }
}
h1 {
  font-family: var(--font-family--secondary);
  font-size: var(--h1-font-size);
  line-height: 1.6;
  margin: 0;
  color: #7f28c4 !important;
}
h2 {
  font-family: var(--font-family--secondary);
  font-size: var(--h2-font-size);
  line-height: 1.6;
  margin: 0;
}
h3 {
  font-family: var(--font-family--secondary);
  font-size: var(--h3-font-size);
  line-height: 1.6;
  margin: 0;
}
h4 {
  font-family: var(--font-family--secondary);
  font-size: var(--h4-font-size);
  line-height: 1.6;
  margin: 0;
}
.sf-menu-item:hover {
  --menu-item-label-color: #7f28c4 !important;
}
.sf-menu-item:focus {
  --menu-item-label-color: #7f28c4 !important;
}
.sf-header-navigation-item__item:hover {
  --header-navigation-item-border-color: #7f28c4 !important;
  --header-navigation-item-color: #7f28c4 !important;
}
.sf-header-navigation-item__item:focus {
  --header-navigation-item-border-color: #7f28c4 !important;
  --header-navigation-item-color: #7f28c4 !important;
}
.sf-hero-item__title {
  color: #ffffff !important;
}
.sf-hero-item__subtitle {
  color: #ffffff !important;
  font-weight: bold;
}
.sf-hero-item__button .sf-button {
  background: #7f28c4 !important;
}
.sf-banner__title {
  color: #7f28c4 !important;
}
.sf-button--text:hover {
  color: #7f28c4 !important;
}
.sf-button--text:focus {
  color: #7f28c4 !important;
}
.sf-circle-icon {
  --button-background: #7f28c4 !important;
  --button-box-shadow: #7f28c4 !important;
}
:root {
  --c-primary: #7f28c4;
  --c-avon-secondary: red;
  --search-bar-button-right: 10px;
  --font-family: Roboto, Arial;
  --c-background-one: #fff;
  --c-background-two: rgb(241, 241, 241);
  --c-color-one: rgb(49, 49, 49);
  --c-color-two: #000;
  --image-width: 100% !important;
  --image-height: 664px !important;
}
.product__drag-icon {
  display: none;
}
.logo {
  .sf-image {
    width: 100px;
    object-fit: scale-down;
  }
}
.sf-search-bar__input {
  border-bottom: none;
  font-size: 14px;
  font-family: var(--font-family);
  &:focus {
    outline: none;
  }
}
.sf-search-bar__button {
  border-left: 1px solid #808080;
  padding-left: 8px;
}
.sf-rating__icon {
  --icon-color: var(--c-color-two) !important;
}
.sf-rating__icon--negative {
  --icon-color: var(--c-gray-variant);
}
.sf-tabs__title.is-active {
  --tabs-title-color: #7f28c4;
  --chevron-color: #7f28c4;
}
.sf-chevron {
  color: #7f28c4;
}
.sf-hero-item__title {
  font-family: var(--font-family);
}
.sf-footer-column__title {
  padding: var(--spacer-sm);
}
.sf-product-card-horizontal__title,
.sf-product-card__link {
  font-family: var(--font-family);
  font-weight: bold;
  color: var(--c-color-two);
}
.sf-price__regular {
  font-family: Montserrat, Arial;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: var(--c-avon-secondary);
}
.common-rep-block {
  margin-top: var(--spacer-lg);
  margin-bottom: var(--spacer-base);
  .subscribePDP {
    font-size: 18px;
    font-weight: bold;
  }
  .heading-offer {
    h2.sf-heading__title {
      font-size: 18px;
      font-weight: bold;
      font-family: var(--font-family);
      width: 80%;
      margin: 0 auto;
      text-transform: uppercase;
    }
  }
}
.sf-heading__title.h5 {
  font-family: var(--font-family);
}
.sf-icon {
  fill: var(--c-primary);
  path {
    fill: var(--c-primary);
  }
}
.sf-rating__icon {
  .sf-icon-path {
    path {
      fill: var(--c-color-two);
    }
  }
}
h3.sf-heading__title {
  font-family: var(--font-family);
  font-size: 22px !important;
  font-weight: 400 !important;
  color: var(--c-color-two);
  letter-spacing: 0.5px;
}
.sf-quantity-selector {
  margin: 20px auto;
  border: none;
  button {
    background: #fff;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 24px;
    font-size: 32px;
    color: var(--c-primary);
    font-weight: 100;
  }
  .sf-quantity-selector__input {
    width: 50px;
    border: 1px solid grey;
    border-radius: 5px;
    margin: 0px 10px;
    font-family: var(--font-family);
  }
}
.sf-tabs {
  width: 100%;
  button.sf-tabs__title {
    font-family: var(--font-family);
    color: var(--c-color-two);
  }
}
/** PRODUCT PAGE */
.selectedShade {
  h5 {
    font-weight: bold !important;
  }
}
.sf-gallery {
  &__big-image {
    --image-height: 100% !important;
    --image-width: 60% !important;
    width: 100%;
    img.sf-image {
      margin: 0 auto;
      outline: none;
    }
  }
  &__thumb {
    --image-height: 100px !important;
    --image-width: 100px !important;
    img.sf-image {
      margin: 0 auto;
      outline: none;
    }
  }
  &__item {
    border-right: 1px solid #e8e8e8;
  }
}
/*FOOTER CSS */
.sf-bottom-navigation-item__label {
  font-family: var(--font-family);
}
</style>
