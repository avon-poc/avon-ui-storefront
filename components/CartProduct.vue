<template>
  <div>
    <div class="cart_products">
      <div class="cart_product_image">
        <nuxt-link data-cy="cart_product_link" :to="link">
          <SfImage
            :src="image"
            alt="cart_product_image"
            :width="75"
            :height="75"
          />
        </nuxt-link>
      </div>
      <div class="cart_product_title">
        <nuxt-link data-cy="cart_product_link" :to="link">
          <SfHeading
            :level="4"
            :title="title"
            class="filters__title sf-heading--left"
          />
        </nuxt-link>
      </div>
      <div class="cart_itemprice">
        <SfPrice
          class="sf-product-card__price productPrice"
          :regular="regularprice"
          :special="specialprice"
        />
        <SfHeading :level="5" :title="$t('Inc. VAT')" class="cart_vat" />
        <div class="exclusive_delivery_div">
          <SfHeading
            :level="6"
            :title="$t('Excludes delivery')"
            class="cart_delivery_price"
          />
          <svg
            viewBox="0 0 20 20"
            width="15px"
            class="cart_exclusive-delivery_icon"
            id="Svg_info-current-invert"
          >
            <g
              fill="var(--c-primary)"
              fill-rule="evenodd"
              transform="translate(1 1)"
            >
              <circle
                cx="9"
                cy="9"
                r="9"
                stroke="var(--c-primary)"
                stroke-width="1.5"
              ></circle>
              <rect width="2" height="7" x="8" y="7" fill="#FFF" rx="1"></rect>
              <circle cx="9" cy="5" r="1" fill="#FFF"></circle>
            </g>
          </svg>
        </div>
      </div>
      <div class="cart_quantity">
        <SfInput
          class="qnty smartphone-only"
          v-model="qty"
          label=""
          name="Quantity"
          type="number"
          valid
          @input="$emit('input', qty)"
        />
        <SfQuantitySelector
          class="sf-quantity-selector--secondary desktop-only cart_quantity-selector"
          v-model="qty"
          aria-label="Quantity"
          @input="$emit('input', qty)"
        />
        <div class="cart_remove" @click="$emit('click:remove')">
          <!-- <SfIcon
            icon="cross"
            size="xxs"
            color="#7f28c4"
            viewBox="0 0 24 24"
            :coverage="1"
            class="remove_icon"
          /> -->
          x remove
        </div>
      </div>
      <div class="cart_subtotalprice desktop-only">
        <SfPrice
          class="sf-product-card__price productPrice"
          :regular="totalProductPrice"
        />
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import {
  SfHeading,
  SfImage,
  SfLink,
  SfPrice,
  SfInput,
  SfIcon,
  SfTable,
  SfQuantitySelector,
} from "@storefront-ui/vue";
import { computed, ref } from "@vue/composition-api";
export default {
  name: "CartProduct",
  components: {
    SfHeading,
    SfImage,
    SfLink,
    SfPrice,
    SfInput,
    SfTable,
    SfIcon,
    SfQuantitySelector,
  },
  props: [
    "title",
    "image",
    "regularprice",
    "specialprice",
    "qty",
    "link",
    "totalProductPrice",
  ],
  setup(props, context) {
    console.log("props1234", props, context);
    const onRemove = (e) => {
      event.preventDefault();
      console.log("test...............", context);
      context.root.$emit("click:shadeChange", title);
    };
    const activeShadeClasses = (title) => {
      console.log("title>>>>>>>>>", title, props.selectedShade);
      let defaultClass = "shadeDet";
      if (title === props.selectedShade) {
        return `${defaultClass} ${"shadeActive"}`;
      } else {
        return `${defaultClass} ${"shadeInactive"}`;
      }
    };
    const productTotal = (quantity, price) => {
      console.log("productTotal>>>>", quantity, price);
      let totalPrice = quantity * price;
      return totalPrice;
    };
    return {
      productTotal,
    };
  },
};
</script>
<style lang="scss" scoped>
.cart_products {
  @include for-desktop {
    display: flex;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 115px;
  }
  @include for-mobile {
    display: grid;
    margin: 0px 20px;
  }
  .cart_product_image {
    @include for-mobile {
      grid-column: 1;
      grid-row: 1;
    }
  }
  .cart_product_title {
    @include for-mobile {
      grid-column: 2 / span 2;
      grid-row: 1;
    }
    @include for-desktop {
      width: 595px;
    }
  }
  .cart_itemprice {
    @include for-mobile {
      grid-column: 1;
      grid-row: 2;
      margin-top: 30px;
    }
    @include for-desktop {
      margin-top: 10px;
      width: 210px;
    }
    .cart_vat {
      text-align: left;
      margin-bottom: -15px;
    }
    .exclusive_delivery_div {
      display: flex;
      .cart_delivery_price {
        @include for-desktop {
          margin-top: 10px;
          text-align: left;
        }
      }
      .cart_exclusive-delivery_icon {
        margin-left: 5px;
        @include for-desktop {
          margin-top: 10px;
        }
        @include for-mobile {
          margin-bottom: 5px;
        }
      }
    }
  }
  .cart_quantity {
    @include for-mobile {
      grid-column: 2;
      grid-row: 2;
    }
    .qnty {
      border: 1px solid black;
      width: 75px;
      height: 50px;
      border-radius: 5px;
      margin-top: 20px;
      text-align: center;
    }
    .remove_icon {
      float: left;
      margin-top: 5px;
      margin-right: 5px;
    }
    .cart_remove {
      font-family: var(--font-family);
      font-weight: bolder;
      font-size: 15px;
      cursor: pointer;
      @include for-desktop {
        margin-left: 50px;
      }
    }
  }
  .cart_subtotalprice {
    @include for-mobile {
      grid-column: 3;
      grid-row: 2;
      margin-top: 30px;
    }
  }
}
</style>