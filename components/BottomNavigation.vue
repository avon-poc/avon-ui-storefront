<template>
  <!-- TODO: create logic with isActive prop for BottomNavigationItems -->
  <SfBottomNavigation class="navigation-bottom smartphone-only">
    <nuxt-link data-cy="bottom-navigation-url_home" to="/">
      <SfBottomNavigationItem
        :class="$route.path == '/' ? 'sf-bottom-navigation__item--active' : ''"
        icon="home"
        size="20px"
        label="Home"
      />
    </nuxt-link>
    <SfBottomNavigationItem
      data-cy="bottom-navigation-url_menu"
      icon="menu"
      size="20px"
      label="Menu"
    />
    <SfBottomNavigationItem
      data-cy="bottom-navigation-url_wishlist"
      icon="heart"
      size="20px"
      label="Wishlist"
      @click="toggleWishlistSidebar"
    />
    <SfBottomNavigationItem
      data-cy="bottom-navigation-url_account"
      icon="profile"
      size="20px"
      label="Account"
      @click="handleAccountClick"
    />
    <!-- TODO: add logic for label - if on Home then Basket, if on PDC then AddToCart etc. -->
    <SfBottomNavigationItem
      data-cy="bottom-navigation-url_add-to-cart"
      label="Basket"
      icon="add_to_cart"
      @click="toggleCartSidebar"
      class="bottom-cart"
    >
      <template #icon>
        <svg viewBox="0 0 21 21" id="Svg_bag">
          <path
            fill="currentColor"
            d="m 1.573013,0.95981479 17.995268,0 0,2.45390021 1.289871,0.7865065 -0.03146,14.4087985 c -0.214975,0.747788 -0.472995,1.289367 -1.761774,1.541553 l -16.9885398,0 C 1.0964915,20.037816 0.37578471,19.618757 0.31460259,18.420259 l 0,-14.282958 1.22695011,-0.6292052 z"
          ></path>
          <circle
            r="1.2898706"
            cy="7.3147874"
            cx="6.04037"
            style="
              fill: #ffffff;
              stroke-width: 1px;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-opacity: 1;
            "
          ></circle>
          <circle
            style="
              fill: #ffffff;
              fill-opacity: 1;
              fill-rule: evenodd;
              stroke: none;
              stroke-width: 1px;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-opacity: 1;
            "
            cx="14.975083"
            cy="7.3147874"
            r="1.2898706"
          ></circle>
          <path
            d="m 6.6381147,8.4473566 c -0.029178,3.6032694 2.146418,4.6204984 4.0326393,4.6375324 1.86741,0.01686 3.659503,-1.470167 3.769505,-4.700453 l 1.25841,-0.125841 c -0.09959,4.565509 -2.467711,6.106906 -5.128022,6.10329 C 6.8231278,14.320164 5.3929038,11.946652 5.4111646,8.2271347 Z"
            style="
              fill: #ffffff;
              fill-opacity: 1;
              fill-rule: evenodd;
              stroke: none;
              stroke-width: 1px;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-opacity: 1;
            "
          ></path>
          <path
            d="m 2.9258041,2.1867649 15.2267659,0 -1.22695,1.2584104 0.471903,0.5977449 -13.7481329,0 0.5033641,-0.5977449 z"
            style="
              fill: #ffffff;
              fill-rule: evenodd;
              stroke: none;
              stroke-width: 1px;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-opacity: 1;
              fill-opacity: 1;
            "
          ></path>
        </svg>
        <span class="cart-count">3</span>
        <!-- <SfCircleIcon aria-label="Add to cart">
          <SfIcon
            icon="add_to_cart"
            color="white"
            size="25px"
            :style="{margin: '0 0 0 -2px'}"
          />
        </SfCircleIcon> -->
      </template>
    </SfBottomNavigationItem>
  </SfBottomNavigation>
</template>

<script>
import { SfBottomNavigation, SfIcon, SfCircleIcon } from "@storefront-ui/vue";
import { useUiState } from "~/composables";
import { useUser } from "@vue-storefront/commercetools";

export default {
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon,
  },
  setup(props, { root }) {
    const {
      toggleCartSidebar,
      toggleWishlistSidebar,
      toggleLoginModal,
    } = useUiState();
    const { isAuthenticated } = useUser();

    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push("/my-account");
      }
      toggleLoginModal();
    };

    return {
      toggleWishlistSidebar,
      toggleCartSidebar,
      handleAccountClick,
    };
  },
};
</script>
<style lang="scss" scoped>
.navigation-bottom {
  --bottom-navigation-z-index: 3;
}
#Svg_bag {
  width: 23px;
  color: var(--c-primary);
}
.sf-icon {
  fill: var(--c-primary);
}
.bottom-cart {
  position: relative;
  .cart-count {
    background: #000;
    color: #fff;
    font-family: "Roboto";
    font-size: 8px;
    border-radius: 10px;
    position: absolute;
    padding: 3px 5px;
    top: 2px;
    left: -1px;
    border: 1px solid #fff;
  }
}
</style>
