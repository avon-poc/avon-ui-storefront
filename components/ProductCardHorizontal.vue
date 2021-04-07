<template>
  <div class="sf-product-card-horizontal">
    <div class="sf-product-card-horizontal__image-wrapper">
      <!--@slot Use this slot to replace image-->
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
        <SfLink
          :link="link"
          class="sf-product-card-horizontal__link sf-product-card-horizontal__link--image"
        >
          <template v-if="Array.isArray(image)">
            <SfImage
              v-for="(picture, key) in image.slice(0, 2)"
              :key="key"
              class="sf-product-card-horizontal__picture"
              :src="picture"
              :alt="title"
              :width="imageWidth"
              :height="imageHeight"
            />
          </template>
          <SfImage
            v-else
            class="sf-product-card-horizontal__image"
            :src="image"
            :alt="title"
            :width="imageWidth"
            :height="imageHeight"
          />
        </SfLink>
      </slot>
    </div>
    <div class="sf-product-card-horizontal__main">
      <div class="sf-product-card-horizontal__details">
        <!--@slot Use this slot to replace title-->
        <slot name="title" v-bind="{ title, link }">
          <SfLink :link="link" class="sf-product-card-horizontal__link">
            <h3 class="sf-product-card-horizontal__title">
              {{ title }}
            </h3>
          </SfLink>
        </slot>
        <slot v-bind="{ maxRating, scoreRating }">
          <div
            v-if="typeof scoreRating === 'number'"
            class="sf-product-card-horizontal__reviews"
          >
            <SfRating
              class="sf-product-card-horizontal__rating"
              :max="maxRating"
              :score="scoreRating"
            />
            <SfButton
              v-if="reviewsCount"
              :aria-label="`Read ${reviewsCount} reviews about ${title}`"
              class="sf-button--pure sf-product-card-horizontal__reviews-count"
              href="#"
              @click="$emit('click:reviews')"
            >
              ({{ reviewsCount }})
            </SfButton>
          </div>
        </slot>
        <slot v-bind="{ specialPrice, regularPrice }">
          <SfPrice
            v-if="regularPrice"
            class="sf-product-card-horizontal__price"
            :regular="regularPrice"
            :special="specialPrice"
          />
        </slot>
        <slot name="quantity-select-input" v-bind="{ qty }">
          <div v-if="variant === ''">
            <SfQuantitySelector
              class="sf-quantity-selector--secondary quantitySelector"
              v-model="qty"
              aria-label="Quantity"
              @input="onQuantitySelect"
            />
          </div>
        </slot>
        <slot name="addtobag">
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
            <div v-else>
              <SfButton :key="Date.now()" class="atbbtn" @click="onAddToCart">
                Add to Bag
              </SfButton>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfPrice,
  SfIcon,
  SfLink,
  SfRating,
  SfImage,
  SfButton,
  SfAddToCart,
  SfQuantitySelector,
} from "@storefront-ui/vue";
export default {
  name: "ProductCardHorizontal",
  components: {
    SfPrice,
    SfRating,
    SfImage,
    SfIcon,
    SfLink,
    SfButton,
    SfAddToCart,
    SfQuantitySelector,
  },
  props: {
    /**
     * Product description
     */
    description: {
      type: String,
      default: "",
    },
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
      default: 160,
    },
    /**
     * Product image height, without unit
     */
    imageHeight: {
      type: [String, Number],
      default: 200,
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
     * Selected quantity
     */
    qty: {
      type: [Number, String],
      default: 1,
    },

    variant: {
      type: [String, Object],
      default: "",
    },
  },
  computed: {
    currentWishlistIcon() {
      return this.isOnWishlist ? this.isOnWishlistIcon : this.wishlistIcon;
    },
    ariaLabel() {
      return this.isOnWishlist ? "Remove from wishlist" : "Add to wishlist";
    },
    wishlistIconClasses() {
      const defaultClass = "sf-product-card-horizontal__wishlist-icon";
      return `${defaultClass} ${
        this.isOnWishlist ? "sf-product-card-horizontal--on-wishlist" : ""
      }`;
    },
  },
  methods: {
    toggleIsOnWishlist() {
      this.$emit("click:wishlist", !this.isOnWishlist);
    },
    onAddToCart(event) {
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
.rating {
  color: black;
}
</style>
