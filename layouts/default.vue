<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      style="display: block; width: 0px; height: 0px"
      id="SvgSpriteSheet"
    >
      <defs>
        <linearGradient
          id="avon_gradient-prefix__a"
          x1="-6.484%"
          x2="100%"
          y1="48.149%"
          y2="52.755%"
        >
          <stop offset="0%" stop-color="#7F28C4"></stop>
          <stop offset="64.421%" stop-color="#E2197C"></stop>
          <stop offset="100%" stop-color="#E5231B"></stop>
        </linearGradient>
      </defs>
    </svg>
    <LazyHydrate when-visible>
      <TopBar class="desktop-only" />
    </LazyHydrate>
    <LazyHydrate when-idle>
      <AppHeader />
    </LazyHydrate>

    <div id="layout">
      <nuxt :key="$route.fullPath" />

      <LazyHydrate when-visible>
        <BottomNavigation />
      </LazyHydrate>
      <CartSidebar />
      <WishlistSidebar />
      <LoginModal />
      <Notification />
    </div>
    <LazyHydrate when-visible>
      <AppFooter />
    </LazyHydrate>
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
import Notification from "~/components/Notification";

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
    Notification,
  },
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";
:root {
  --c-primary: #7f28c4;
  --c-transparent: transparent;
}

#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}

.no-scroll {
  overflow: hidden;
  height: 100vh;
}

// Reset CSS
html {
  width: auto;
  @include for-mobile {
    overflow-x: hidden;
  }
}
body {
  overflow-x: hidden;
  color: var(--c-text);
  font-size: var(--font-size--base);
  font-family: var(--font-family--primary);
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: var(--c-link);
  &:hover {
    color: var(--c-link-hover);
  }
}
h1 {
  font-family: var(--font-family--secondary);
  font-size: var(--h1-font-size);
  line-height: 1.6;
  margin: 0;
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
</style>
