<template>
<div>
   
    <div class="avon-recommended">
      <h2 class="avon-recommended__title"> Top Trending</h2>
        <div class="search-result">
          <div
            class="product-card"
            v-for="product in recomData"
            :key="product.key"
          >
            <div class="product-card__image">
              <img :src="product.attributes && product.attributes.image_url && product.attributes.image_url[0]" />
            </div>
            <div class="product-card__detail">
              <!-- <h2 class="product-card__title">
                {{ product.attributes.title[0] }}
              </h2> -->
              <SfLink :link="
                localePath(
                  `/p/c0fad67f-d10c-494c-9b8f-ed7e1604ca05/pink-butterfly-reusable-fashion-face-mask`
                )
              " class="sf-product-card__link">
                <h2 class="sf-product-card__title productTitle">
                {{ product.attributes.title[0] }}
                </h2>
              </SfLink>
              <p>
                 <span class="listPrice" v-if="product.attributes.list_price[0] !== product.attributes.price[0]">
                {{$n(product.attributes.list_price[0], 'currency')}}
              </span>
              <span class="product-card__price">
                {{$n(product.attributes.price[0], 'currency')}}
              </span>
              </p>
            </div>
          </div>
        </div>
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
  SfQuantitySelector
} from "@storefront-ui/vue";
export default {
  name: "RecommendedProductCard",
  components: {
    SfPrice,
    SfRating,
    SfIcon,
    SfImage,
    SfLink,
    SfCircleIcon,
    SfBadge,
    SfButton,
    SfQuantitySelector
  },
  props: {
   recomData:{
       type:[Array, Object, String],
       default: "chckkk"
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
      console.log("in event");
      var apiApptus = window.esalesAPI({
        market: "UK",
        clusterId: "wFE4AE5CF",
      });
      apiApptus.notify.nonEsalesAddToCart({ productKey:"1137_UK"});
      console.log("in event2");
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
.search-result{
  display: flex;
}
.avon-recommended{
  &__title{
    text-align: center;
   
    padding: 20px 0px;
    color: black;
    font-family: var(--font-family);
      font-size: 30px;
      font-weight: 500;
  }
}
.product-card {
  &__image {
    img{
    width: 80%;
    margin: 0 auto;
    display: block;

    }
  }
  &__detail{
    padding-top: 8px;
    h2{
      color: #546264;
      font-family: var(--font-family);
      font-size: 12px;
      font-weight: 500;   
      text-align: center;
    }
   p{
      color: #546264;
      font-family: var(--font-family);
      font-size: 12px;
      font-weight: 500;   
      text-align: center; 
       .listPrice{
        text-decoration: line-through;
        color: #a2acae;
        margin-right: 10px;
      }                          
    }    
  }
}

</style>
