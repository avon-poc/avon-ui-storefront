<template>
  <div class="pdtwidth">
    <div class="imagewrap">
      <div class="sf-product-card__image-wrapper">
        <SfLink
          :link="link"
          class="sf-product-card__link"
          v-if="variant.key === 'size' || variant.key === 'shade'"
        >
          <div class="variantBorder">
            <h4 class="variantContent" v-if="variant.key === 'shade'">
              More Colours Available
            </h4>
            <h4 class="variantContent" v-else>More Sizes Available</h4>
          </div>
        </SfLink>
        <slot
          name="image"
          v-bind="{ image, title, link, imageHeight, imageWidth }"
        >
          <SfLink :link="link" class="sf-product-card__link">
            <template v-if="Array.isArray(image)">
              <SfImage
                v-for="(picture, key) in image.slice(0, 2)"
                :key="key"
                class="sf-product-card__picture"
                :src="picture"
                :alt="title"
                :width="imageWidth"
                :height="imageHeight"
              />
            </template>
            <SfImage
              v-else
              class="sf-product-card__image"
              :src="image"
              :alt="title"
              :width="imageWidth"
              :height="imageHeight"
            />
          </SfLink>
        </slot>
        <slot name="badge" v-bind="{ badgeLabel, badgeColor }">
          <SfBadge
            v-if="badgeLabel"
            class="sf-product-card__badge"
            :class="badgeColorClass"
            >{{ badgeLabel }}</SfBadge
          >
        </slot>
      </div>
    </div>
    <div class="contentwrap">
      <slot name="title" v-bind="{ title, link }">
        <SfLink :link="link" class="sf-product-card__link">
          <h3 class="sf-product-card__title productTitle">
            {{ title }}
          </h3>
        </SfLink>
      </slot>
      <slot name="reviews" v-bind="{ maxRating, scoreRating }">
        <div
          v-if="typeof scoreRating === 'number'"
          class="sf-product-card__reviews"
        >
          <SfRating
            class="sf-product-card__rating"
            :max="maxRating"
            :score="scoreRating"
          />
          <SfButton
            v-if="reviewsCount"
            :aria-label="`Read ${reviewsCount} reviews about ${title}`"
            class="sf-button--pure sf-product-card__reviews-count"
            @click="$emit('click:reviews')"
          >
            ({{ reviewsCount }})
          </SfButton>
        </div>
      </slot>
      <slot name="price" v-bind="{ specialPrice, regularPrice }">
        <SfPrice
          v-if="regularPrice"
          class="sf-product-card__price productPrice"
          :regular="regularPrice"
          :special="specialPrice"
        />
      </slot>

      <slot v-bind="{ qty }">
        <div v-if="variant === ''">
          <SfQuantitySelector
            class="sf-quantity-selector--secondary quantitySelector"
            v-model="qty"
            aria-label="Quantity"
            @input="onQuantitySelect"
          />
        </div>
      </slot>
      <slot name="addtobag" v-bind="{ variant, link }">
        <div class="atbbtndiv">
          <div v-if="variant.key === 'shade'">
            <SfButton :key="Date.now()" class="atbbtn viewcolor" :link="link">
              View Colour Options
            </SfButton>
          </div>
          <div v-else-if="variant.key === 'size'">
            <SfButton :key="Date.now()" class="atbbtn viewcolor" :link="link">
              View Size Options
            </SfButton>
          </div>
          <div v-else-if="variant.key === 'variant'" appear tag="div">
            <SfButton :key="Date.now()" class="atbbtn viewcolor" :link="link">
              View Product
            </SfButton>
          </div>
          <div v-else-if="variant.key === 'NoBtn'" appear tag="div"/>
          <div v-else>
            <SfButton :key="Date.now()" class="atbbtn" @click="onAddToCart">
              Add to Bag
            </SfButton>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import { colorsValues as SF_COLORS } from "@storefront-ui/shared/variables/colors";
// import { deprecationWarning } from "../../../utilities/helpers";
import {
  SfIcon,
  SfButton,
  SfLink,
  SfPrice,
  SfRating,
  SfImage,
  SfCircleIcon,
  SfBadge,
  SfQuantitySelector,
} from "@storefront-ui/vue";
export default {
  name: "ProductCard",
  components: {
    SfPrice,
    SfRating,
    SfIcon,
    SfImage,
    SfLink,
    SfCircleIcon,
    SfBadge,
    SfButton,
    SfQuantitySelector,
  },
  props: {
    /**
     * Product image
     * It should be an url of the product
     */
    image: {
      type: [Array, Object, String],
      default: "",
    },
    /**
     * Product image width, without unit
     */
    imageWidth: {
      type: [String, Number],
      default: 216,
    },
    /**
     * Product image height, without unit
     */
    imageHeight: {
      type: [String, Number],
      default: 326,
    },
    /**
     * Badge label
     */
    badgeLabel: {
      type: String,
      default: "",
    },
    /**
     * Badge color
     * It can be according to our standard colors, or legitimate CSS color such as `#fff`, `rgb(255,255,255)`), and `lightgray` or nothing.
     * Standard colors: `primary`, `secondary`, `white`, `black`, `accent`, `green-primary`, `green-secondary`, `gray-primary`, `gray-secondary`, `light-primary`, `light-secondary`, `pink-primary`, `pink-secondary`, `yellow-primary`, `yellow-secondary`, `blue-primary`, `blue-secondary`.
     */
    badgeColor: {
      type: String,
      default: "",
    },
    /**
     * Product title
     */
    title: {
      type: String,
      default: "",
    },
    /**
     * Link to product page
     */
    link: {
      type: [String, Object],
      default: "",
    },
    /**
     * Link element tag
     * @deprecated will be removed in 1.0.0 use slot to replace content
     */
    linkTag: {
      type: String,
      default: undefined,
    },
    /**
     * Product rating
     */
    scoreRating: {
      type: [Number, Boolean],
      default: false,
    },
    /**
     * Product reviews count
     */
    reviewsCount: {
      type: [Number, Boolean],
      default: false,
    },
    /**
     * Maximum product rating
     */
    maxRating: {
      type: [Number, String],
      default: 5,
    },
    /**
     * Product regular price
     */
    regularPrice: {
      type: [Number, String],
      default: null,
    },
    /**
     * Product special price
     */
    specialPrice: {
      type: [Number, String],
      default: null,
    },
    /**
     * Wish list icon
     * This is the default icon for product not yet added to wish list.
     * It can be a icon name from our icons list, or array or string as SVG path(s).
     */
    wishlistIcon: {
      type: [String, Array, Boolean],
      default: "heart",
    },
    /**
     * Wish list icon for product which has been added to wish list
     * This is the icon for product added to wish list. Default visible on mobile. Visible only on hover on desktop.
     * It can be a icon name from our icons list, or array or string as SVG path(s).
     */
    isOnWishlistIcon: {
      type: [String, Array],
      default: "heart_fill",
    },
    /**
     * Status of whether product is on wish list or not
     */
    isOnWishlist: {
      type: Boolean,
      default: false,
    },
    /**
     * Status of showing add to cart button
     */
    showAddToCartButton: {
      type: Boolean,
      default: false,
    },
    /**
     * isAddedToCart status of whether button is showed, product is added or not
     */
    isAddedToCart: {
      type: Boolean,
      deafult: false,
    },
    /**
     * addToCartDisabled status of whether button is disabled when out of stock
     */
    addToCartDisabled: {
      type: Boolean,
      default: false,
    },

    qty: {
      type: [Number, String],
      default: 1,
    },

    variant: {
      type: [String, Object],
      default: "",
    }
  },
  data() {
    return {
      isAddingToCart: false,
    };
  },
  computed: {
    isSFColors() {
      return SF_COLORS.includes(this.badgeColor.trim());
    },
    badgeColorClass() {
      return this.isSFColors ? `${this.badgeColor.trim()}` : "";
    },
    currentWishlistIcon() {
      return this.isOnWishlist ? this.isOnWishlistIcon : this.wishlistIcon;
    },
    showAddedToCartBadge() {
      return !this.isAddingToCart && this.isAddedToCart;
    },
    ariaLabel() {
      return this.isOnWishlist ? "Remove from wishlist" : "Add to wishlist";
    },
    wishlistIconClasses() {
      const defaultClass = "sf-button--pure sf-product-card__wishlist-icon";
      return `${defaultClass} ${this.isOnWishlist ? "on-wishlist" : ""}`;
    },
  },
  methods: {
    toggleIsOnWishlist() {
      this.$emit("click:wishlist", !this.isOnWishlist);
    },
    onAddToCart(event) {
      var apiApptus = window.esalesAPI({
        market: "UK",
        clusterId: "wFE4AE5CF",
      });
      apiApptus.notify.nonEsalesClick({ productKey:"1137_UK"});
      // apiApptus.notify.addToCart("Oy9keW5hbWljLXBhZ2VzL3N0YXJ0L2VzYWxlcy1zdGFydC0xOyM7cHJvZHVjdF9rZXk7UF8xMjUzODMtMDAxNF9VSzsjOztOT05FOk5PTkU7NjE7");
      event.preventDefault();
      this.isAddingToCart = true;
      setTimeout(() => {
        this.isAddingToCart = false;
      }, 1000);
      this.$emit("click:add-to-cart");
    },
    onQuantitySelect(event) {
      console.log("qty>>>>>>>>>>>>");
      this.$emit("input", event);
    },
  },
};
</script>
<style lang="scss">
.atbbtn {
  font-size: 10pt;
  font-weight: bold;
  background-color: #7f28c4;
  color: white;
  height: 40px !important;
  border-radius: 5px;
  margin: 0px;
  font-family: Montserrat, Arial;
}
.atbbtn:hover {
  color: white;
  background-color: #6a17ad;
}
.viewcolor {
  width: 200px;
}
.pdtwidth {
  // width: 700px !important;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 50% !important;
  display: table;
  margin-bottom: 50px;
}
.imagewrap {
  float: left;
  width: 200px;
  display: table-cell;
}
.contentwrap {
  float: left;
  width: 300px;
  display: table-cell;
  padding-left: 2px;
}

.atbbtndiv {
  margin-top: 20px;
}
.productTitle {
  font-family: Montserrat, Arial;
  display: block;
  font-size: 1.6rem;
  line-height: 1.5;
  font-weight: bold;
  margin-bottom: 0.5rem;
  white-space: inherit !important;
  margin-top: -5px;
}

.productWithVariant {
  margin-top: -10px;
}
.quantitySelector {
  border-radius: 0.8rem;
  font-size: 1.3rem;
  min-height: 3.6rem;
  width: 9.2rem;
  color: #181818;
  // border: 1px solid #ccc;
  line-height: 3.6rem;
  text-align: center;
}
.variantBorder {
  border-style: solid;
  border-width: thin;
  border-color: #000;
}
.variantContent {
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  font-family: Montserrat, Arial;
  padding: 10px;
  text-decoration: none;
}
// .sf-quantity-selector__input {
//   border-radius: 0.8rem;
//   font-size: 1.3rem;
//   min-height: 3.6rem;
//   width: 4.6rem;
//   color: #181818;
//   border: 1px solid #ccc;
//   line-height: 3.6rem;
//   text-align: center;
//   margin-left: 5px;
//   margin-right: 5px;
// }

// .sf-quantity-selector__button{
//   background-color: white;
//   border: 1px solid #ccc;
//   color: #7f28c4;
//   font-size: 1.3rem;
// }
</style>
