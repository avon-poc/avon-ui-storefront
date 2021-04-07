
<template>
  <div id="product">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div>
      <div class="product__header">
        <SfHeading
          :title="productGetters.getName(product)"
          :level="3"
          class="sf-heading--no-underline sf-heading--left"
        />
        <SfIcon
          icon="drag"
          size="xxl"
          color="var(--c-text-disabled)"
          class="product__drag-icon smartphone-only"
        />
      </div>
      <div class="RatingAndShare">
        <div class="product__rating contentPadding">
          <SfRating :score="averageRating" :max="5" />
          <a v-if="!!totalReviews" href="#" class="product__count">
            ({{ totalReviews }})
          </a>
          <SfLink
            link="https://www.storefrontui.io/"
            class="sf-product-card__link reviewContent contentPadding"
          >
            GIVE FEEDBACK
          </SfLink>
          <SfLink
            link="https://www.storefrontui.io/"
            class="sf-product-card__link reviewContent"
          >
            SHARE THIS
          </SfLink>
        </div>

        <!-- <SfButton data-cy="product-btn_read-all" class="sf-button--text">{{ $t('Read all reviews') }}</SfButton> -->
      </div>
    </div>
    <div class="product">
      <LazyHydrate when-idle>
        <SfGallery
          :images="productGallery"
          class="product__gallery"
          imageWidth="100%"
          imageHeight="100%"
        />
      </LazyHydrate>

      <div class="product__info">
        <div class="product__price-and-rating">
          <SfPrice
            :regular="$n(productGetters.getPrice(product).regular, 'currency')"
            :special="
              productGetters.getPrice(product).special &&
              $n(productGetters.getPrice(product).special, 'currency')
            "
          />
        </div>

        <div>
          <!-- <p class="product__description desktop-only">
            {{ description }}
          </p> -->
          <div
            v-if="
              options.variantType &&
              options.variantType[0] &&
              options.variantType[0].value === 'shade'
            "
          >
            <div v-bind="{ shade }" class="contentPadding">
              <SfHeading
                :level="5"
                title="Selected shade: "
                class="filters__title sf-heading--left shadeSelection"
              />
              <SfHeading
                :level="5"
                :title="
                  shade && shade.length > 0
                    ? shade
                    : options.variantValue[0].value
                "
                class="filters__title sf-heading--left selectedShade"
              />
              <SfImage
                :src="
                  options.variantImage ? options.variantImage[0].label[0] : ''
                "
                class="shadeImage"
                alt="Vila stripe maxi shirt dress"
                :width="65"
                :height="35"
              />
            </div>
            <!-- val {{options.variantType[0].value}} -->
            <div
              v-for="(variant, i) in options.variantValue"
              :key="i"
              class="contentPadding"
            >
              <ShadeWrap
                :title="variant.value"
                :selectedShade="
                  shade && shade.length > 0
                    ? shade
                    : options.variantValue[0].value
                "
                :imagesrc="
                  options.variantImage ? options.variantImage[0].label[i] : ''
                "
                @click:shadeChange="changeShade(variant.value)"
              />
            </div>
            <!-- <SfSelect
            data-cy="product-select_size"
            v-if="options.variantValue"
            :value="options.variantValue"
           
            label="Variant"
            class="sf-select--underlined product__select-size"
            :required="true"
          >
            <SfSelectOption
              v-for="variant in options.variantValue"
              :key="variant.value"
              :value="variant.value"
            >
              {{variant.label}}
            </SfSelectOption>
          </SfSelect> -->
          </div>
          <div
            v-else-if="
              options.variantType &&
              options.variantType[0] &&
              options.variantType[0].value === 'variant'
            "
          >
            <!-- <div>
              <SfHeading
                :level="5"
                title="Selected variant: "
                class="filters__title sf-heading--left shadeSelection"
              />
            </div> -->

            <SfSelect
              data-cy="product-select_size"
              v-if="options.variantValue"
              :value="options.variantValue"
              label="Selected variant:"
              class="sf-select--underlined product__select-size"
              :required="true"
            >
              <SfSelectOption
                v-for="variant in options.variantValue"
                :key="variant.value"
                :value="variant.value"
              >
                {{ variant.label }}
              </SfSelectOption>
            </SfSelect>
          </div>
          <div
            v-else-if="
              options.variantType &&
              options.variantType[0] &&
              options.variantType[0].value === 'size'
            "
          >
            <!-- <div>
              <SfHeading
                :level="5"
                title="Selected variant: "
                class="filters__title sf-heading--left shadeSelection"
              />
            </div> -->

            <SfSelect
              data-cy="product-select_size"
              v-if="options.variantValue"
              :value="options.variantValue"
              label="Selected size:"
              class="sf-select--underlined product__select-size"
              :required="true"
            >
              <SfSelectOption
                v-for="variant in options.variantValue"
                :key="variant.value"
                :value="variant.value"
              >
                {{ variant.label }}
              </SfSelectOption>
            </SfSelect>
          </div>
          <div
            v-if="options.color && options.color.length > 1"
            class="product__colors desktop-only"
          >
            <p class="product__color-label">{{ $t("Color") }}:</p>
            <SfColor
              data-cy="product-color_update"
              v-for="(color, i) in options.color"
              :key="i"
              :color="color.value"
              class="product__color"
              @click="updateFilter({ color })"
            />
          </div>
          <div>
            <SfAddToCart
              data-cy="product-cart_add"
              :stock="stock"
              v-model="qty"
              :disabled="loading"
              :canAddToCart="stock > 0"
              class="product__add-to-cart addToBagPDP"
              @click="
                addItem({ product, quantity: parseInt(qty), repId: 'rep01' })
              "
            >
              <template v-slot:quantity-select-input>
                <SfQuantitySelector
                  :qty="qty"
                  aria-label="Quantity"
                  :disabled="loading"
                  class="sf-quantity-selector--secondary asdf"
                  v-model="qty"
                />
              </template>
              <template v-slot:add-to-cart-btn>
                <SfButton
                  class="sf-add-to-cart__button addToBagPDP atbbtnPDP"
                  :disabled="loading"
                  @click="
                    addItem({
                      product,
                      quantity: parseInt(qty),
                      repId: 'rep01',
                    })
                  "
                >
                  Add to Bag
                </SfButton>
              </template>
            </SfAddToCart>
          </div>
          <div class="wishlist">
            <SfLink
              link="https://www.storefrontui.io/"
              class="sf-product-card__link reviewContent"
            >
              Add to favourites
            </SfLink>
          </div>
        </div>

        <LazyHydrate when-idle>
          <SfTabs :open-tab="0" class="product__tabs">
            <SfTab data-cy="product-tab_description" title="Description">
              <div class="product__description" v-html="description"></div>
              <!-- <SfProperty
                v-for="(property, i) in properties"
                :key="i"
                :name="property.name"
                :value="property.value"
                class="product__property"
              >
                <template v-if="property.name === 'Category'" #value>
                  <SfButton class="product__property__button sf-button--text">
                    {{ property.value }}
                  </SfButton>
                </template>
              </SfProperty> -->
            </SfTab>
            <!-- <SfTab title="Read reviews" data-cy="product-tab_reviews">
              <SfReview
                v-for="review in reviews"
                :key="reviewGetters.getReviewId(review)"
                :author="reviewGetters.getReviewAuthor(review)"
                :date="reviewGetters.getReviewDate(review)"
                :message="reviewGetters.getReviewMessage(review)"
                :max-rating="5"
                :rating="reviewGetters.getReviewRating(review)"
                :char-limit="250"
                read-more-text="Read more"
                hide-full-text="Read less"
                class="product__review"
              />
            </SfTab> -->
            <SfTab
              title="Delivery & Returns"
              data-cy="product-tab_additional"
              class="product__additional-info"
            >
              <div class="product__additional-info">
                <p class="product__additional-info__title">{{ $t("Brand") }}</p>
                <p>{{ brand }}</p>
                <p class="product__additional-info__title">
                  {{ $t("Instruction1") }}
                </p>
                <p class="product__additional-info__paragraph">
                  {{ $t("Instruction2") }}
                </p>
                <p class="product__additional-info__paragraph">
                  {{ $t("Instruction3") }}
                </p>
                <p>{{ careInstructions }}</p>
              </div>
            </SfTab>
          </SfTabs>
        </LazyHydrate>
        <div class="common-rep-block">
          <SfHeading
            class="heading-offer"
            :title="$t('Get Exclusive Special Offers & The Latest News')"
          />
          <SfLink class="sf-product-card__link subscribePDP"
            >SUBSCRIBE / SIGN UP >
          </SfLink>
          <div class="smartphone-only">
            <SfButton
              class="sf-add-to-cart__button atbbtnPDP repButton"
              :disabled="loading"
              @click="
                addItem({
                  product,
                  quantity: parseInt(qty),
                  repId: 'rep01',
                })
              "
            >
              Find a Representative
            </SfButton>
            <SfButton
              class="sf-add-to-cart__button atbbtnPDP repButton"
              :disabled="loading"
              @click="
                addItem({
                  product,
                  quantity: parseInt(qty),
                  repId: 'rep01',
                })
              "
            >
              Become a Representative
            </SfButton>
          </div>
        </div>
      </div>
    </div>

    <!-- <LazyHydrate when-visible>
      <RelatedProducts
        :products="relatedProducts"
        :loading="relatedLoading"
        title="Match it with"
      />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <MobileStoreBanner />
    </LazyHydrate> -->
  </div>
</template>


<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfIcon,
  SfImage,
  SfBanner,
  SfAlert,
  SfSticky,
  SfReview,
  SfBreadcrumbs,
  SfButton,
  SfColor,
  SfLink,
  SfQuantitySelector,
} from "@storefront-ui/vue";

import InstagramFeed from "~/components/InstagramFeed.vue";
import RelatedProducts from "~/components/RelatedProducts.vue";
import { ref, computed, onMounted } from "@vue/composition-api";
import {
  useProduct,
  useCart,
  productGetters,
  useReview,
  reviewGetters,
  useCategory,
  facetGetters,
  useFacet,
} from "@vue-storefront/commercetools";
//import { useCart, useWishlist, productGetters, useFacet, facetGetters } from '@vue-storefront/commercetools';
import { onSSR } from "@vue-storefront/core";
import MobileStoreBanner from "~/components/MobileStoreBanner.vue";
import LazyHydrate from "vue-lazy-hydration";
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer.js";
import ShadeWrap from "~/components/ShadeWrap";

export default {
  name: "Product",
  transition: "fade",
  setup(props, context) {
    const qty = ref(1);
    const shade = ref("");
    const { id } = context.root.$route.params;
    const { products, search } = useProduct("products");
    const {
      products: relatedProducts,
      search: searchRelatedProducts,
      loading: relatedLoading,
    } = useProduct("relatedProducts");
    const { addItem, loading } = useCart();
    const { reviews: productReviews, search: searchReviews } = useReview(
      "productReviews"
    );
    const changeShade = (variant) => {
      shade.value = variant;
    };
    // cck custom query func
    // const { search } = useProduct();

    // search({ customQuery: { products: 'my-products-query' } });
    const isMobile = computed(() => mapMobileObserver().isMobile.get());
    console.log("products", products);
    const product = computed(
      () =>
        productGetters.getFiltered(products.value, {
          master: true,
          attributes: context.root.$route.query,
        })[0]
    );
    const options = computed(() =>
      productGetters.getAttributes(products.value, [
        "color",
        "size",
        "variantType",
        "variantValue",
        "variantImage",
      ])
    );

    console.log("options", options);
    // shade.value=options.value.variantValue[0].value
    const configuration = computed(() =>
      productGetters.getAttributes(product.value, ["color", "size"])
    );
    const categories = computed(() =>
      productGetters.getCategoryIds(product.value)
    );
    const description = computed(
      () =>
        "<p>" +
        productGetters
          .getDescription(product.value)
          .replace(/\n([ \t]*\n)+/g, "</p><p>")
          .replace("\n", "<br />") +
        "</p>"
    );
    const reviews = computed(() =>
      reviewGetters.getItems(productReviews.value)
    );
    // TODO: Breadcrumbs are temporary disabled because productGetters return undefined. We have a mocks in data
    // const breadcrumbs = computed(() => productGetters.getBreadcrumbs ? productGetters.getBreadcrumbs(product.value) : props.fallbackBreadcrumbs);
    // console.log("breadcrumbs",breadcrumbs);
    const productGallery = computed(() =>
      productGetters.getGallery(product.value).map((img) => ({
        mobile: { url: img.small },
        desktop: { url: img.normal },
        big: { url: img.big },
      }))
    );

    const { categories: catNew, search: searchCategory } = useCategory(
      "categories1"
    );

    const {
      result: categoriesTree,
      search: search1,
      loading: facetLoading,
    } = useFacet();
    const breadcrumbs = computed(() =>
      facetGetters.getBreadcrumbs(categoriesTree.value)
    );

    onSSR(async () => {
      await search({ id });
      await searchRelatedProducts({ catId: [categories.value[0]], limit: 8 });
      await searchReviews({ productId: id });
      await searchCategory({ catId: [categories.value[0]] });
      await search1({
        rootCatSlug: undefined,
        categorySlug:
          catNew && catNew.value && catNew.value[0] && catNew.value[0].slug,
        page: 1,
        sort: "latest",
        filters: {},
        itemsPerPage: 20,
        term: undefined,
      });
    });

    const updateFilter = (filter) => {
      context.root.$router.push({
        path: context.root.$route.path,
        query: {
          ...configuration.value,
          ...filter,
        },
      });
    };

    return {
      updateFilter,
      configuration,
      product,
      reviews,
      reviewGetters,
      averageRating: computed(() =>
        productGetters.getAverageRating(product.value)
      ),
      totalReviews: computed(() =>
        productGetters.getTotalReviews(product.value)
      ),
      relatedProducts: computed(() =>
        productGetters.getFiltered(relatedProducts.value, { master: true })
      ),
      relatedLoading,
      options,
      qty,
      addItem,
      loading,
      productGetters,
      productGallery,
      description,
      breadcrumbs,
      shade,
      changeShade,
      isMobile,
    };
  },
  components: {
    SfAlert,
    SfColor,
    SfProperty,
    SfHeading,
    SfPrice,
    SfRating,
    SfSelect,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfImage,
    SfBanner,
    SfSticky,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    InstagramFeed,
    RelatedProducts,
    MobileStoreBanner,
    LazyHydrate,
    ShadeWrap,
    SfLink,
    SfQuantitySelector,
  },
  data() {
    return {
      stock: 5,
      properties: [
        {
          name: "Product Code",
          value: "578902-00",
        },
        {
          name: "Category",
          value: "Pants",
        },
        {
          name: "Material",
          value: "Cotton",
        },
        {
          name: "Country",
          value: "Germany",
        },
      ],
      detailsIsActive: false,
      brand:
        "Brand name is the perfect pairing of quality and design. This label creates major everyday vibes with its collection of modern brooches, silver and gold jewellery, or clips it back with hair accessories in geo styles.",
      careInstructions: "Do not wash!",
      breadcrumbs1: [
        {
          text: "Home",
          route: {
            link: "#",
          },
        },
        {
          text: "Category",
          route: {
            link: "#",
          },
        },
        {
          text: "Pants",
          route: {
            link: "#",
          },
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}
.product {
  @include for-desktop {
    display: flex;
  }
  @include for-mobile {
    margin-top: -45px;
  }
  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }
  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }
  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  &__compare {
    margin-top: 0;
  }
  &__tabs {
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }
  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }
  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);
      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }
    &__paragraph {
      margin: 0;
    }
  }
  &__gallery {
    flex: 1;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
.shadeSelection {
  float: left;
}
.productrating {
  float: left;
}
.reviewContent {
  color: #7f28c4;
}
.contentPadding {
  margin-left: 20px;
  &:first-child {
    display: flex;
    margin-bottom: 5px;
    div {
      margin-right: 10px;
    }
    .selectedShade {
      h5 {
        font-weight: bold;
      }
    }
  }
  &:last-child {
    margin-bottom: 60px;
  }
}

.sf-quantity-selector {
  width: 300px;
}
.addToBagPDP {
  display: list-item;
}
.wishlist {
  margin: 20px;
  float: right;
}
.atbbtnPDP {
  font-size: 10pt;
  font-weight: bold;
  background-color: #7f28c4;
  color: white;
  height: 40px !important;
  border-radius: 5px;
  margin: 0px;
  font-family: Montserrat, Arial;
}
.subscribePDP {
  color: #7f28c4;
  text-align: center;
  align-items: center;
  line-height: 2rem;
  font-family: Montserrat, Arial;
}
.repButton {
  margin-top: 10px;
  margin-left: 20px;
  width: 380px;
}
#product {
  margin-top: 10px;
}
.selectedShade {
  font-weight: 700;
  color: #000;
  font-size: 1.34687rem;
  font-family: Montserrat;
}

.addToBagPDP {
  &::marker {
    content: "";
  }
}
</style>
