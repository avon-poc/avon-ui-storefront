<template>
  <div id="offerDetails">
    <div class="navbar section dividerColor">
      <div class="navbar__aside desktop-only">
        <LazyHydrate never>
          <SfHeading
            :level="3"
            :title="$t('Bestsellers Top Rated Whats New')"
            class="navbar__title"
          />
        </LazyHydrate>
      </div>

      <div class="navbar__main">
        <LazyHydrate never class="desktop-only">
          <div>
            <SfHeading
              :level="2"
              :title="data.name && data.name[locale]"
              class="navbar__title"
            />
            <SfHeading
              :level="3"
              :title="data.description && data.description[locale]"
              class="navbar__title"
            />
          </div>
        </LazyHydrate>
      </div>
    </div>

    <div class="main section">
      <div class="sidebar desktop-only">
        <LazyHydrate never>
          <SfHeading
            :level="3"
            :title="$t('Categories')"
            class="navbar__title categoryHeader"
          />
        </LazyHydrate>

        <div><hr class="sf-divider divider" /></div>
      </div>
      <div class="products">
        <p
          v-if="
            getListProducts &&
            getListProducts.value &&
            Object.keys(getListProducts.value).length > 0
          "
        >
          Buy List
        </p>
        <transition-group
          appear
          name="products__slide"
          tag="div"
          class="products__grid"
        >
          <ProductCard
            data-cy="category-product-card"
            v-for="(product, i) in buyListProducts.value"
            :key="i"
            :style="{ '--index': i }"
            :title="product.obj && product.obj.masterData.current.name[locale]"
            :image="getImage(product)"
            :regular-price="$n(getPrice(product).price, 'currency')"
            :special-price="
              getPrice(product).specialPrice &&
              $n(getPrice(product).specialPrice, 'currency')
            "
            :isOnWishlist="false"
            :link="
              localePath(
                `/p/${product.obj.id}/${product.obj.masterData.current.slug[locale]}`
              )
            "
            v-model="qty"
            :variant="getVariant(product)"
            class="products__product-card"
            @click:add-to-cart="addItemToCart1(product, qty)"
          >
          </ProductCard>
        </transition-group>
        <p
          v-if="
            getListProducts &&
            getListProducts.value &&
            Object.keys(getListProducts.value).length > 0
          "
        >
          Get List
        </p>
        <transition-group
          appear
          name="products__slide"
          tag="div"
          class="products__grid"
        >
          <ProductCard
            data-cy="category-product-card"
            v-for="(product, i) in getListProducts.value"
            :key="i"
            :style="{ '--index': i }"
            :title="product.obj && product.obj.masterData.current.name[locale]"
            :image="getImage(product)"
            :regular-price="$n(getPrice(product).price, 'currency')"
            :special-price="
              getPrice(product).specialPrice &&
              $n(getPrice(product).specialPrice, 'currency')
            "
            :isOnWishlist="false"
            :link="
              localePath(
                `/p/${product.obj.id}/${product.obj.masterData.current.slug[locale]}`
              )
            "
            v-model="qty"
            :variant="{ key: 'NoBtn' }"
            class="products__product-card"
          >
          </ProductCard>
        </transition-group>

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
  </div>
</template>
<script>
import {
  SfSidebar,
  SfButton,
  SfList,
  SfLink,
  SfIcon,
  SfHeading,
  SfMenuItem,
  SfFilter,
  SfProductCard,
  SfPagination,
  SfAccordion,
  SfSelect,
  SfBreadcrumbs,
  SfLoader,
  SfColor,
  SfProperty,
  SfImage,
} from "@storefront-ui/vue";
import {
  useCart,
  useProduct,
  productGetters,
} from "@vue-storefront/commercetools";
import { ref, computed, onMounted } from "@vue/composition-api";
import useCustomAPI from "../composables/useCustomAPI";
import LazyHydrate from "vue-lazy-hydration";
import ProductCard from "../components/ProductCard";
import { useVSFContext } from '@vue-storefront/core';

export default {
  transition: "fade",
  setup(props, { root }) {
    const { addItem: addItemToCart, isInCart } = useCart();
    const { offerDetails, getOfferDetail } = useCustomAPI();
    const data = computed(() => offerDetails.value);
    console.log("data", data);
    const { id } = root.$route.params;
    console.log("params", id);
    const { $ct: { config } } = useVSFContext();
    const buyListProducts = ref({});
    const getListProducts = ref({});
    const qty = ref(1);
    const { products, search } = useProduct("offerProduct");
    onMounted(async () => {
      await getOfferDetail(id);
      buyListProducts.value = computed(
        () =>
          data &&
          data.value &&
          data.value.custom &&
          data.value.custom.fields &&
          data.value.custom.fields.buyList
      );
      getListProducts.value = computed(
        () =>
          data &&
          data.value &&
          data.value.custom &&
          data.value.custom.fields &&
          data.value.custom.fields.getList
      );
    });
    const product = computed(
      () =>
        productGetters.getFiltered(products.value, {
          master: true,
          attributes: root.$route.query,
        })[0]
    );
    const addItemToCart1 = async (productdet, qty) => {
      await search({ id: productdet.obj.id });
      console.log("product addItemToCart1>>>>>>>>>>>>", product.value);
      addItemToCart({ product:product.value, quantity: parseInt(qty) });
    };

    const getPrice = (product) => {
      const priceObj = product.obj.masterData.current.masterVariant.prices[0];
      var price = priceObj.value.centAmount / Math.pow(10, 2);
      var specialPrice =
        priceObj.discounted &&
        priceObj.discounted.value.centAmount / Math.pow(10, 2);
      var obj = { price: price };
      specialPrice > 0 ? (obj.specialPrice = specialPrice) : "";
      return obj;
    };
    const getVariant = (product) => {
      var variant = {};
      variant = product?.obj?.masterData?.current?.variants[0]?.attributes.find(
        (obj) => {
          return obj.name === "variantType";
        }
      );
      return variant ? variant.value : "";
    };
    const getImage = (product) => {
      var imgUrl = product.obj.masterData.current.masterVariant.images[0].url;
      return imgUrl;
    };
    return {
      data,
      buyListProducts,
      qty,
      getPrice,
      getImage,
      getVariant,
      getListProducts,
      addItemToCart,
      addItemToCart1,
      locale: config.locale,
      isInCart,
      breadcrumbs: [
        {
          text: "Home",
          route: {
            link: "#",
          },
        },
        {
          text: "Offers",
          route: {
            link: "#",
          },
        },
      ],
    };
  },
  components: {
    SfLink,
    SfButton,
    SfSidebar,
    SfIcon,
    SfList,
    SfFilter,
    SfProductCard,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfSelect,
    SfBreadcrumbs,
    SfLoader,
    SfColor,
    SfHeading,
    SfProperty,
    LazyHydrate,
    ProductCard,
    SfImage,
  },
};
</script>

<style lang="scss" scoped>
.divider {
  border-top: 1px dotted black;
}

.sortBy {
  border: 1px solid black;
  padding: 5px;
  padding-left: 1rem;
  border-radius: 5px;
  margin-top: 0px !important;
  margin-left: 35px !important;
}
.categoryHeader {
  font-weight: bold;
  color: #181818;
  text-transform: uppercase;
  line-height: 2.4rem;
  font-family: Montserrat, Arial;
  font-size: 1.4rem;
}
#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.main {
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }
  &__aside {
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }
  &__main {
    flex: 1;
    padding: 0;
    justify-content: space-between;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }
  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--font-size--xl);
  }
  &__filters-icon {
    margin: 0 0 0 var(--spacer-xs);
    order: 1;
    @include for-desktop {
      margin: 0 var(--spacer-xs) 0 0;
      order: 0;
    }
  }
  &__filters-button {
    display: flex;
    align-items: center;
    --button-font-size: var(--font-size--base);
    --button-text-decoration: none;
    --button-color: var(--c-link);
    --button-font-weight: var(--font-weight--normal);
    @include for-mobile {
      --button-font-weight: var(--font-weight--medium);
      order: 2;
    }
    svg {
      fill: var(--c-text-muted);
      transition: fill 150ms ease;
    }
    &:hover {
      svg {
        fill: var(--c-primary);
      }
    }
  }
  &__label {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    color: var(--c-text-muted);
    @include for-desktop {
      color: var(--c-link);
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }
  &__select {
    --select-width: 220px;
    --select-padding: 0;
    --select-height: auto;
    --select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --select-margin: 0;
    --select-option-font-size: var(--font-size-sm);
    --select-error-message-height: 0;
    ::v-deep .sf-select__dropdown {
      width: 280px;
      background: var(--c-background-two);
      font-family: var(--font-family);
      font-weight: var(--font-weight--light);
      font-size: 16px;
      margin: 0;
    }
    ::v-deep .sf-select__placeholder {
      --select-option-font-size: var(--font-size-sm);
    }
  }
  &__sort {
    display: flex;
    align-items: center;
    margin: 0 auto 0 var(--spacer-2xl);
  }
  &__counter {
    font-family: var(--font-family--secondary);
    order: 1;
    @include for-desktop {
      margin: auto 0 auto auto;
      order: 0;
    }
  }
  &__view {
    display: flex;
    align-items: center;
    order: 0;
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
      order: 0;
    }
    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 0;
      &:last-child {
        margin: 0;
      }
    }
    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6
        var(--font-family--secondary);
      text-decoration: none;
      color: var(--c-link);
    }
  }
}
.sort-by {
  flex: unset;
  width: 11.875rem;
}
.main {
  display: flex;
}
.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}
.sidebar-filters {
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;
  @include for-desktop {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}
.list {
  --menu-item-font-size: var(--font-size--sm);
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }

    .nuxt-link-exact-active {
      text-decoration: underline;
    }
  }
}
.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__grid {
    justify-content: space-between;
    @include for-desktop {
      justify-content: flex-start;
    }
  }
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__product-card {
    --product-card-title-margin: var(--spacer-base) 0 0 0;
    --product-card-title-font-weight: var(--font-weight--medium);
    --product-card-title-margin: var(--spacer-xs) 0 0 0;
    flex: 1 1 50%;
    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
    }
  }
  &__product-card-horizontal {
    flex: 0 0 100%;
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  @include for-desktop {
    &__grid {
      margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    }
    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}
.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: 6.25rem;
  }
}
::v-deep .sf-sidebar__aside {
  --sidebar-z-index: 3;
}
.filters {
  &__title {
    --heading-title-font-size: var(--font-size--xl);
    margin: var(--spacer-xl) 0 var(--spacer-base) 0;
    &:first-child {
      margin: calc(var(--spacer-xl) + var(--spacer-base)) 0 var(--spacer-xs) 0;
    }
  }
  &__colors {
    display: flex;
  }
  &__color {
    margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
  }
  &__chosen {
    color: var(--c-text-muted);
    font-weight: var(--font-weight--normal);
    font-family: var(--font-family--secondary);
    position: absolute;
    right: var(--spacer-xl);
  }
  &__item {
    --radio-container-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    --radio-background: transparent;
    --filter-label-color: var(--c-secondary-variant);
    --filter-count-color: var(--c-secondary-variant);
    --checkbox-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    padding: var(--spacer-sm) 0;
    border-bottom: 1px solid var(--c-light);
    &:last-child {
      border-bottom: 0;
    }
    @include for-desktop {
      --checkbox-padding: 0;
      margin: var(--spacer-sm) 0;
      border: 0;
      padding: 0;
    }
  }
  &__accordion-item {
    --accordion-item-content-padding: 0;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }
  &__buttons {
    margin: var(--spacer-sm) 0;
  }
  &__button-clear {
    --button-background: var(--c-light);
    --button-color: var(--c-dark-variant);
    margin: var(--spacer-xs) 0 0 0;
  }
}

.dividerColor {
  border-bottom-style: solid;
  border-bottom-color: grey;
}

.iconSize {
  width: 35px;
  height: 33px;
}
.parallelIcon {
  float: left;
}
.icondiv {
  margin-top: 10px;
  margin-left: 10px;
}
.navTitle {
  margin: 10px;
  margin-bottom: 0px;
  padding: 18px;
  background: whitesmoke;
  width: 350px;
}
.navIcon {
  float: right;
  margin-bottom: 10px;
  margin-top: -12px;
  margin-right: -26px;
}
.navbar__sort {
  margin-left: 0 !important;
  width: 90%;
  border: 1px solid #cccccc;
  background: var(--c-background-two);
}

/* Common */
.atbbtnPDP {
  font-size: 10pt;
  font-weight: bold;
  background-color: #7f28c4;
  color: white;
  height: 40px !important;
  border-radius: 5px;
  margin: 0px;
  font-family: var(--font-family);
}
.subscribePDP {
  color: #7f28c4;
  text-align: center;
  align-items: center;
  line-height: 2rem;
  font-family: Montserrat, Arial;
}
.repButton {
  margin: 10px auto;
  width: 380px;
}
.navbar__label {
  font-family: var(--font-family);
  font-size: 16px;
}
.banner_plp {
  margin: 20px 20px 10px 15px;
}
</style>
