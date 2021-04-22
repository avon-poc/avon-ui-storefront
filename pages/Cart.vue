<template>
  <div id="cart" class="cart_page">
    <div class="smartphone-only continue_shopping">
      <nuxt-link
        data-cy="app-header-url_logo"
        :to="localePath('/')"
        class="sf-header__logo"
      >
        <SfLink class="sf-product-card__link navTitle">
          {{ $t("Continue Shopping") }}
          <SfIcon
            v-bind="icon"
            icon="chevron_left"
            class="navIcon"
            color=" var(--c-primary)"
            size="sm"
          />
        </SfLink>
      </nuxt-link>
    </div>
    <div class="cart_header" v-if="totalItems">
      <SfHeading
        :level="3"
        :title="$t('Your Shopping Bag') + `${'(' + totalItems + ')'}`"
        class="cart_title"
      />
      <nuxt-link
        data-cy="app-header-url_logo"
        :to="localePath('/')"
        class="sf-header__logo desktop-only"
      >
        <SfLink class="sf-product-card__link navLink_top">
          {{ $t("Continue Shopping arrow") }}
        </SfLink>
      </nuxt-link>
      <div class="actions_top desktop-only">
        <SfButton
          class="sf-add-to-cart__button cart_update_actions"
          :disabled="loading"
          @click="updateQuantity(product, cartGetters.getItemQty(product))"
        >
          Update Bag
        </SfButton>
        <nuxt-link :to="`/checkout/shipping`">
          <SfButton
            class="sf-add-to-cart__button cart_checkout_actions"
            :disabled="loading"
          >
            Go to checkout
          </SfButton>
        </nuxt-link>
      </div>
    </div>
    <div v-if="totalItems" class="my-cart">
      <div class="cart_headers desktop-only">
        <SfHeading :level="6" title="ITEMS" />
        <SfHeading :level="6" title="" />
        <SfHeading :level="6" title="ITEM PRICE" class="cart_header_price" />
        <SfHeading :level="6" title="QUANTITY" />
        <SfHeading :level="6" title="SUBTOTAL" />
      </div>
      <div v-for="(product, i) in products" :key="i">
        <CartProduct
          :image="cartGetters.getItemImage(product)"
          :title="cartGetters.getItemName(product)"
          :regularprice="
            $n(cartGetters.getItemPrice(product).regular, 'currency')
          "
          :specialprice="
            cartGetters.getItemPrice(product).special &&
            $n(cartGetters.getItemPrice(product).special, 'currency')
          "
          :totalProductPrice="
            $n(
              (cartGetters.getItemPrice(product).special
                ? cartGetters.getItemPrice(product).special
                : cartGetters.getItemPrice(product).regular) *
                cartGetters.getItemQty(product),
              'currency'
            )
          "
          :stock="99999"
          :link="
            localePath(
              `/p/${product.productId}/${cartGetters.getItemSku(product)}`
            )
          "
          :qty="cartGetters.getItemQty(product)"
          @input="updateQuantity(product, $event)"
          @click:remove="removeItem({ product })"
        />
      </div>
    </div>
    <div v-else class="empty_cart">
      <div>
        <SfHeading
          :level="2"
          :title="$t('Shopping bag empty')"
          class="empty_bag_title"
        />
      </div>
      <div class="empty_cart_heading">
        <SfHeading
          :level="3"
          :title="$t('You do not have any items in your bag.')"
          class="empty_bag"
        />

        <SfLink class="sf-product-card__link" :link="localePath('/')">
          {{ $t("Continue Shopping") }}
        </SfLink>
        <h3>|</h3>
        <SfLink class="sf-product-card__link"> Your Wishlist </SfLink>
      </div>
    </div>
    <div class="highlighted promo-code" v-if="totalItems">
      <SfInput
        v-if="!coupons[0]"
        data-cy="cart-preview-input_promoCode"
        v-model="promoCode"
        name="promoCode"
        :label="$t('Enter promo code')"
        class="sf-input--filled voucher_input"
      />
      <SfButton
        v-if="!coupons[0]"
        class="promo-code__button"
        @click="() => applyCoupon({ couponCode: promoCode })"
        >{{ $t("Apply") }}</SfButton
      >
      <div v-if="coupons[0]" class="promo-code-remove__button">
        <p class="promo-code-display">
          Applied Coupon:
          <span class="promo-code-text">{{ coupons[0].code }}</span>
        </p>
        <SfButton @click="() => remCoupon(coupons)"> x </SfButton>
      </div>
    </div>
    <p class="error-block smartphone-only" v-if="error.applyCoupon">
      <SfAlert message="Invalid Coupon!" type="danger" />
    </p>
    <div class="cart_bottom" v-if="totalItems">
      <SfLink
        class="sf-product-card__link cart_navlink smartphone-only"
        :link="localePath('/')"
      >
        Continue Shopping
      </SfLink>
      <div class="cart_subtotal">
        <SfHeading
          :level="5"
          :title="$t('SUBTOTAL: ')"
          class="cart_subtotal-title"
        />
        <SfHeading :level="5" :title="$n(totals.total, 'currency')" />
      </div>
    </div>
    <div class="cart_actions" v-if="totalItems">
      <SfLink
        class="sf-product-card__link desktop-only continue_link"
        :link="localePath('/')"
      >
        {{ $t("Continue Shopping") }}
      </SfLink>
      <SfButton
        class="sf-add-to-cart__button cart_update_actions"
        :disabled="loading"
        @click="updateQuantity(product, cartGetters.getItemQty(product))"
      >
        Update Bag
      </SfButton>
      <nuxt-link :to="`/checkout/shipping`">
        <SfButton
          class="sf-add-to-cart__button cart_checkout_actions"
          :disabled="loading"
        >
          Go to checkout
        </SfButton>
      </nuxt-link>
    </div>
    <div class="cart_payment_options" v-if="totalItems">
      <SfHeading :level="3" :title="$t('We accept')" class="payment_title" />
      <div class="payment_options">
        <SfImage
          src="/cart/maestro.png"
          alt="mastero"
          :width="50"
          :height="30"
        />
        <SfImage
          src="/cart/mastercard.png"
          alt="master"
          :width="50"
          :height="30"
        />
        <SfImage src="/cart/visa.png" alt="visa" :width="50" :height="30" />
        <SfImage
          src="/cart/paypal-logo-20141.png"
          alt="paypal"
          :width="88"
          :height="30"
        />
      </div>
    </div>
    <div>
      <BottomRepBlock />
    </div>
  </div>
</template>
<script>
import {
  SfHero,
  SfBanner,
  SfImage,
  SfCallToAction,
  SfSection,
  SfCarousel,
  SfProductCard,
  SfBannerGrid,
  SfHeading,
  SfArrow,
  SfButton,
  SfLink,
  SfIcon,
  SfPrice,
  SfInput,
  SfProperty,
  SfTable,
  SfAlert,
} from "@storefront-ui/vue";
import MobileStoreBanner from "~/components/MobileStoreBanner.vue";
import LazyHydrate from "vue-lazy-hydration";
import CartProduct from "~/components/CartProduct.vue";
import { computed, ref } from "@vue/composition-api";
import {
  useCart,
  useUser,
  cartGetters,
  productGetters,
} from "@vue-storefront/commercetools";
import { useUiState } from "~/composables";
import { onSSR } from "@vue-storefront/core";
import BottomRepBlock from "~/components/BottomRepBlock.vue";

export default {
  name: "Cart",
  components: {
    SfHero,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfBannerGrid,
    SfHeading,
    SfArrow,
    SfButton,
    MobileStoreBanner,
    LazyHydrate,
    SfLink,
    SfIcon,
    SfPrice,
    CartProduct,
    SfInput,
    SfProperty,
    SfTable,
    BottomRepBlock,
    SfAlert,
  },
  setup() {
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();
    const {
      cart,
      removeItem,
      updateItemQty,
      load: loadCart,
      applyCoupon,
      removeCoupon,
      error,
    } = useCart();
    const { isAuthenticated } = useUser();
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const coupons = computed(() => cartGetters.getCoupons(cart.value));
    const promoCode = ref("");
    // console.log("coupons>>>", coupons.value);

    const remCoupon = (couponObj) => {
      promoCode.value = "";
      removeCoupon({
        coupon: { id: couponObj && couponObj[0] && couponObj[0].id },
      });
    };

    const updateQuantity = (product, quantity) => {
      console.log("updateQuantity>>>", product, typeof parseInt(quantity));
      updateItemQty({ product, quantity: parseInt(quantity) });
    };

    onSSR(async () => {
      await loadCart();
      // console.log(
      //   "\n gdgd",
      //   cartGetters.getItemPrice(products.value[0]).regular *
      //     cartGetters.getItemQty(products.value[0])
      // );
    });

    return {
      isAuthenticated,
      products,
      removeItem,
      updateItemQty,
      isCartSidebarOpen,
      toggleCartSidebar,
      totals,
      totalItems,
      cartGetters,
      applyCoupon,
      promoCode,
      productGetters,
      remCoupon,
      coupons,
      error,
      updateQuantity,
    };
  },
};
</script>
<style scoped lang="scss">
.cart_page {
  .cart_tableheading {
    tr {
      th {
        margin-right: 10px;
      }
    }
  }
  .my-cart {
    .cart_headers {
      display: flex;
      justify-content: space-between;
      border-bottom: 3px solid;
      border-bottom-color: lightgrey;
      padding-bottom: 10px;
      .cart_header_price {
        margin-left: 240px;
      }
    }
  }
  .navTitle {
    margin: 10px;
    margin-bottom: 0px;
    padding: 18px;
    background: whitesmoke;
    width: 350px;
    .navIcon {
      float: right;
      margin-bottom: 10px;
      margin-top: -12px;
      margin-right: -26px;
    }
  }
}

.empty_cart {
  .empty_bag_title {
    text-align: left;
    margin-left: 10px;
  }
  .empty_cart_heading {
    display: flex;
    a {
      margin-top: 20px;
      margin-left: 15px;
      width: 150px;
    }
  }
  .empty_bag {
    text-align: left;
    margin-left: 10px;
  }
}

.cart_header {
  @include for-desktop {
    display: flex;
    align-items: baseline;
  }
  .cart_title {
    margin: 10px 0px;
  }
  .navLink_top {
    color: #707677;
    font-size: 12px;
  }
  .actions_top {
    display: flex;
    margin-left: auto;
    .cart_update_actions {
      width: 170px;
      margin: 20px 10px;
      background: white;
      border: 1px solid;
      color: var(--c-primary);
      border-radius: 5px;
      height: 40px;
    }
    .cart_checkout_actions {
      width: 190px;
      margin: 20px 10px;
      border-radius: 5px;
      height: 40px;
    }
  }
}
.cart_voucher {
  display: flex;
  margin: 15px 10px;
  .promo-code__button {
    background: white;
    color: var(--c-primary);
    border: 1px solid;
    border-color: var(--c-primary);
    border-radius: 5px;
    height: 35px;
    padding: 10px;
    margin-right: 5px;
    margin-top: 8px;
  }

  .promo-code__input {
    margin-right: 5px;
    margin-left: 5px;
    margin-top: 10px;
    // .sf-input__wrapper {
    //   #voucherCode {
    //     border-radius: 35px !important;
    //   }
    // }
  }
}

.cart_bottom {
  .cart_navlink {
    margin-left: 10px;
    font-weight: bold;
    color: var(--c-primary);
    font-family: var(--font-family);
    margin-top: 25px;
  }
  .cart_subtotal {
    .cart_subtotal-title {
      @include for-desktop {
        margin-right: 50px;
      }
    }
    @include for-desktop {
      display: flex;
    }
    font-family: var(--font-family);
    font-size: 12px;
    float: right;
    margin-right: 20px;
    margin-top: -10px;
  }
}

.cart_actions {
  margin-top: 10px;
  @include for-desktop {
    display: flex;
    margin-top: 50px;
    margin-left: 10px;
  }
  .continue_link {
    float: left;
    margin-top: 30px;
    color: var(--c-primary);
  }
  .cart_update_actions {
    @include for-desktop {
      width: 170px;
    }
    margin: 20px 10px;
    width: 385px;
    background: white;
    border: 1px solid;
    color: var(--c-primary);
    border-radius: 5px;
    height: 40px;
  }
  .cart_checkout_actions {
    @include for-desktop {
      width: 190px;
    }
    margin: 20px 10px;
    width: 385px;
    border-radius: 5px;
    height: 40px;
  }
}
.cart_payment_options {
  @include for-mobile {
    border-bottom: 1px solid gray;
    padding-bottom: 50px;
  }
  @include for-desktop {
    display: flex;
  }
  .payment_title {
    font-family: var(--font-family);
  }
  .payment_options {
    display: flex;
    justify-content: center;
    @include for-desktop {
      margin-left: 10px;
    }
    div {
      margin-right: 10px;
    }
  }
}
.promo-code {
  display: flex;
  align-items: flex-start;
  &__button {
    --button-width: 6.3125rem;
    --button-height: var(--spacer-lg);
  }
  &__input {
    --input-background: var(--c-white);
    flex: 1;
  }
  .voucher_input {
    width: 275px;
    height: 50px;
    margin: 0px 10px;
    text-align: left;
    .sf-input__wrapper {
      input {
        border-radius: 35px;
      }
    }
  }
}
.promo-code__button {
  background: white;
  color: var(--c-primary);
  border: 1px solid;
  border-color: var(--c-primary);
  border-radius: 5px;
  height: 35px;
  padding: 10px;
  margin-right: 5px;
  margin-top: 8px;
}

.promo-code__input {
  margin-right: 5px;
  margin-left: 5px;
  margin-top: 10px;
  .sf-input__wrapper {
    input {
      width: 200px;
    }
  }
}

.error-block {
  background: var(--c-transparent);
  text-align: center;
}

.promo-code-remove__button {
  display: flex;
  align-items: center;
  position: relative;
  padding-right: 20px;
  width: 100%;
  border: 1px solid var(--c-white);
  text-align: center;
  button {
    position: absolute;
    top: 5px;
    right: 0;
    border-radius: 28px;
    padding: 3px 5px;
    font-size: 6px;
    background: var(--c-transparent);
    color: var(--c-primary);
    border: 1px solid var(--c-primary);
  }
  p {
    display: block;
    margin: 0 auto;
    padding: 10px 0px;
  }
  .promo-code-text {
    color: var(--c-primary);
  }
}

.error-block {
  background: #f1f2f3;
  padding: 0px 42px;
  margin: 0;
}
</style>