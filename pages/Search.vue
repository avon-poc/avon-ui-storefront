<template>
  <div>
    <div class="avon-search smartphone-only">
      <div class="avon-search__header">
        <h1>Search Result Page</h1>
        <p
          class="total-count"
          v-if="didYouMean && Object.keys(didYouMean).length != 0"
        >
          No Result for {{ query.term }}
          <br />
          Did you mean "{{ didYouMean[0] && didYouMean[0].text }}"?
        </p>
      </div>
      <div class="avon-search__body">
        <div class="search-result">
          <div
            class="product-card"
            v-for="product in products"
            :key="product.key"
          >
            <div class="product-card__image">
              <img :src="product.attributes.image_url[0]" />
            </div>
            <div class="product-card__detail">
              <h2 class="product-card__title">
                {{ product.attributes.title[0] }}
              </h2>
              <button class="product-card__cta">View Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="desktop-only asearch">
      <div class="avon-search__header">
        <h1>Search Result</h1>
        <p
          class="total-count"
          v-if="didYouMean && Object.keys(didYouMean).length != 0"
        >
          No Result for {{ query.term }}
          <br />
          Did you mean "{{ didYouMean[0] && didYouMean[0].text }}"?
        </p>
        <p v-else>{{ productCount }} results for {{ query.term }}</p>
      </div>
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
          <!-- <LazyHydrate on-interaction>
          <SfButton
            class="sf-button--text navbar__filters-button"
            data-cy="category-btn_filters"
            aria-label="Filters"
            @click="toggleFilterSidebar"
          >
            <SfIcon
              size="24px"
              color="dark-secondary"
              icon="filter2"
              class="navbar__filters-icon"
              data-cy="category-icon_"
            />
            {{ $t('Filters') }}
          </SfButton>
        </LazyHydrate> -->

          <LazyHydrate never class="desktop-only">
            <SfHeading
              :level="3"
              :title="'Home | Search'"
              class="navbar__title"
            />
          </LazyHydrate>
          <div class="navbar__sort sortBy">
            <span class="navbar__label">{{ $t("Sort By") }}:</span>
            <SfSelect
              :value="seachSortBy.selected"
              placeholder="Select sorting"
              data-cy="category-select_sortBy"
              class="navbar__select"
              @input="th.changeSorting"
            >
              <SfSelectOption
                v-for="option in seachSortBy.options"
                :key="option.id"
                :value="option.id"
                class="sort-by__option"
                >{{ option.value }}</SfSelectOption
              >
            </SfSelect>
          </div>
           
          <!-- <div class="navbar__counter">
          <span class="navbar__label desktop-only"
            >{{ $t("Products found") }}:
          </span>
          <span class="desktop-only">{{ pagination.totalItems }}</span>
          <span class="navbar__label smartphone-only"
            >{{ pagination.totalItems }} {{ $t("Items") }}</span
          >
        </div> -->

          <div class="navbar__view desktop-only">
            <span class="navbar__view-label desktop-only">{{
              $t("View")
            }}</span>
            <SfIcon
              data-cy="category-icon_grid-view"
              class="navbar__view-icon"
              :color="isCategoryGridView ? 'black' : 'dark-secondary'"
              icon="tiles"
              size="12px"
              role="button"
              aria-label="Change to grid view"
              :aria-pressed="isCategoryGridView"
            />
            <SfIcon
              data-cy="category-icon_list-view"
              class="navbar__view-icon"
              :color="!isCategoryGridView ? 'black' : 'dark-secondary'"
              icon="list"
              size="12px"
              role="button"
              aria-label="Change to list view"
              :aria-pressed="!isCategoryGridView"
            />
          </div>
        </div>
      </div>
      <div class="main section">
        <div class="sidebar desktop-only">
          <!-- <LazyHydrate never>
          <SfHeading
            :level="3"
            :title="$t('Filte')"
            class="navbar__title categoryHeader"
          />
        </LazyHydrate> -->
          {{ handleFilter }}
          <LazyHydrate when-idle>
            <SfLoader :class="{ loading }" :loading="loading">
              <div class="facets">
                <div
                  class="facets__block"
                  v-for="facet in searchFacets"
                  :key="facet.key"
                >
                  <SfHeading
                    :level="3"
                    :title="$t(facet.attribute)"
                    class="navbar__title"
                  />
                  <SfCheckbox
                    v-for="(item, index) in facet.values"
                    :key="index"
                    :name="facet.attribute + '-' + index"
                    :label="item.text"
                    :value="item.text"
                    v-model="handleFilter"
                    @change="selectFilter(facet, item)"
                    valid
                  />
                </div>
              </div>
            </SfLoader>
          </LazyHydrate>
          <div><hr class="sf-divider divider" /></div>
        </div>
        <SfLoader :class="{ loading }" :loading="loading">
          <div class="products" v-if="!loading">
            <transition-group
              v-if="!isCategoryGridView"
              appear
              name="products__slide"
              tag="div"
              class="products__grid"
            >
              <ProductCard
                data-cy="category-product-card"
                v-for="(product, i) in products"
                :key="product.key"
                :style="{ '--index': i }"
                :title="product.attributes.title[0]"
                :image="product.attributes.image_url[0]"
                :regular-price="$n(product.attributes.price[0], 'currency')"
                :max-rating="5"
                :score-rating="4"
                :show-add-to-cart-button="true"
                :isOnWishlist="false"
                :link="localePath(`/p/#`)"
                class="products__product-card"
              />
            </transition-group>
            <transition-group
              v-else
              appear
              name="products__slide"
              tag="div"
              class="products__list"
            >
              <ProductCardHorizontal
                data-cy="category-product-cart_wishlist"
                v-for="(product, i) in products"
                :key="product.key"
                :style="{ '--index': i }"
                :title="product.attributes.title[0]"
                :image="product.attributes.image_url[0]"
                :regular-price="$n(product.attributes.price[0], 'currency')"
                :max-rating="5"
                :score-rating="2"
                :show-add-to-cart-button="true"
                :isOnWishlist="true"
                :link="localePath(`/p/#`)"
                @click:add-to-cart="
                  addItemToCart1({ product, quantity: parseInt(qty) })
                "
                class="products__product-card-horizontal"
              >
                <template #configuration>
                  <SfProperty
                    class="desktop-only"
                    name="Size"
                    value="XS"
                    style="margin: 0 0 1rem 0"
                  />
                  <SfProperty class="desktop-only" name="Color" value="white" />
                </template>
                <template #actions>
                  <SfButton
                    class="sf-button--text desktop-only"
                    style="margin: 0 0 1rem auto; display: block"
                    @click="() => {}"
                  >
                    {{ $t("Save for later") }}
                  </SfButton>
                </template>
              </ProductCardHorizontal>
            </transition-group>

            <LazyHydrate on-interaction>
              <SfPagination
                v-if="!loading"
                data-cy="category-pagination"
                class="products__pagination desktop-only"
                v-show="pagination.totalPages > 1"
                :current="pagination.currentPages"
                :total="pagination.totalPages"
                :visible="5"
              />
            </LazyHydrate>

            <div
              v-show="pagination.totalPages > 1"
              class="products__show-on-page"
            >
              <span class="products__show-on-page__label">{{
                $t("Show on page")
              }}</span>
              <LazyHydrate on-interaction>
                <SfSelect
                  :value="pagination.itemsPerPage.toString()"
                  class="products__items-per-page"
                  @input="th.changeItemsPerPage"
                >
                  <SfSelectOption
                    v-for="option in pagination.pageOptions"
                    :key="option"
                    :value="option"
                    class="products__items-per-page__option"
                  >
                    {{ option }}
                  </SfSelectOption>
                </SfSelect>
              </LazyHydrate>
            </div>
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
        </SfLoader>
      </div>
      <!-- <div class="sidebar">
        <div class="sidebar__facets">
          <h3>Title</h3>
          <template>
            <SfCheckbox
              name="shipping"
              label="I want to create an account"
              hintMessage="Required."
              errorMessage="This field is not correct."
              valid
            />
          </template>
        </div>
      </div>
      <div class="result">
        <div class="avon-search__header">
        <h1>Search Result Page</h1>
        <p
          class="total-count"
          v-if="didYouMean && Object.keys(didYouMean).length != 0"
        >
          No Result for {{ query.term }}
          <br />
          Did you mean "{{ didYouMean[0] && didYouMean[0].text }}"?
        </p>
      </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import { useUiHelpers } from "~/composables";
import { ref, computed, onMounted } from "@vue/composition-api";
import LazyHydrate from "vue-lazy-hydration";
import ProductCard from "../components/ProductCard";
import ProductCardHorizontal from "../components/ProductCardHorizontal";
import { useCart } from "@vue-storefront/commercetools";
import Vue from "vue";
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
  SfProductCardHorizontal,
  SfPagination,
  SfAccordion,
  SfSelect,
  SfBreadcrumbs,
  SfLoader,
  SfColor,
  SfProperty,
  SfImage,
  SfCheckbox,
} from "@storefront-ui/vue";

export default {
  name: "Search",
  transition: "fade",
  setup(props, context) {
    const products = ref();
    const didYouMean = ref();
    const facets = ref([]);
    const productCount = ref(0);
    const handleFilter = ref([]);
    const selectedFacet = ref({});

    const { getSearchTermFromUrl, changeFilters } = useUiHelpers();
    const th = useUiHelpers();
    const query = getSearchTermFromUrl();
    query.sort = query.sort === "latest" ? "relevance" : query.sort;

    console.log("searchTerm", getSearchTermFromUrl());

    const { addItem: addItemToCart, isInCart } = useCart();
    const loading = false; // NEED TO MAKE DYANAMIC
    const pagination = ref({
      currentPage: 1,
      totalPages: 1,
      totalItems: 2,
      itemsPerPage: 20,
      pageOptions: [20, 40, 100],
    }); // NEED TO MAKE DYANAMIC
    const isCategoryGridView = ref(true); // NEED TO MAKE DYANAMIC
    const sortBy = ref({
      options: [
        {
          type: "sort",
          id: "blank",
          value: " ",
          count: null,
          selected: true,
        },
        {
          type: "sort",
          id: "price asc",
          value: "Price (Lowest - Highest)",
          count: null,
          selected: false,
        },
        {
          type: "sort",
          id: "price desc",
          value: "Price (Highest - Lowest)",
          count: null,
          selected: false,
        },
        {
          type: "sort",
          id: "title asc",
          value: "Alphabetically (A - Z)",
          count: null,
          selected: false,
        },
        {
          type: "sort",
          id: "title desc",
          value: "Alphabetically (Z - A)",
          count: null,
          selected: false,
        },
        {
          type: "sort",
          id: "relevance",
          value: "Relevance",
          count: null,
          selected: false,
        },
      ],
      selected: "",
    }); // NEED TO MAKE DYANAMIC
    const seachSortBy = computed(() => {
      return {
        options: {
          ...sortBy.value.options.map((item) => {
            item.selected = item.id == query.sort;
            return item;
          }),
        },
        selected: query.sort,
      };
    });

    const qty = ref(1);
    const addItemToCart1 = async (productdet, qty) => {
      await search({ id: "c0fad67f-d10c-494c-9b8f-ed7e1604ca05" }); //productdet.obj.id
      console.log("product addItemToCart1>>>>>>>>>>>>", product.value);
      addItemToCart({ product: product.value, quantity: parseInt(qty) });
    };

    onMounted(() => {
      var apiApptus = window.esalesAPI({
        market: "UK",
        clusterId: "wFE4AE5CF",
      });

      // Adding Sorting
      let sortByQuery =
        typeof query.sort !== "undefined" ? query.sort : "relevance";

      //Search query object
      let filterObj = {
        window_first: 1,
        window_last: 10,
        search_phrase: query.term,
        max_facets: 10,
        sort_by: sortByQuery,
      };

      // filter by facets
      let facetsByQuery =
        query.filters && Object.keys(query.filters).length === 0
          ? ""
          : query.filters.discount_band;
      var facet = new apiApptus.utils.Facet();

      // adding facets to search query object
      if (facetsByQuery) {
        facet.add("discount_band", facetsByQuery);
        filterObj = { ...filterObj, facets: facet.toString() };
      }

      // Querying Apptus Api
      apiApptus
        .panel("/search-page/search-result-zone", filterObj)
        .then(function (data) {
          productCount.value = data.response.productCount[0].count;
          products.value = [...data.response.hits[0].products];
          facets.value = [...data.response.hits[1].facetList];
          didYouMean.value = [...data.response.hits[2].corrections];
        })
        .catch(function (data) {
          console.log("Error: ", data);
        });

      if(!(query.filters && Object.keys(query.filters).length === 0)){
        console.log('asdfasdf');
        selectedFacet.value = {...query.filters};
      }

      //updating filter on reload
      // handleFilter.value = [
      //     '0 to 10%'
      //   ]
    });

    // Updating List of facets available
    const searchFacets = computed(() => {
      return {
        ...facets.value.filter((facet) => {
          return facet.values && facet.values[0].text != "";
        }),
      };
    });

    console.log({selectedFacet});
    //Filtering data with facets
    const selectFilter = (facet, item) => {
      console.log("1st", selectedFacet);
      if (!selectedFacet.value[facet.attribute]) {
        Vue.set(selectedFacet.value, facet.attribute, []);
      }
      if (selectedFacet.value[facet.attribute].find((f) => f === item.text)) {
        selectedFacet.value[facet.attribute] = selectedFacet.value[
          facet.attribute
        ].filter((f) => f !== item.text);
        return;
      }
      console.log("2nd", selectedFacet);
      selectedFacet.value[facet.attribute].push(item.text);
      console.log("3rd", selectedFacet);
      let filtObjtest = {
          "discount_band": [
              "0 to 10%",
              "20 to 30%"
          ],
          "brand": [
              "Anew"
          ]
      }
      changeFilters(selectedFacet.value);
    };

    return {
      th,
      query,
      products,
      didYouMean,
      productCount,
      searchFacets,
      seachSortBy,
      loading,
      pagination,
      isCategoryGridView,
      addItemToCart,
      qty,
      addItemToCart1,
      handleFilter,
      selectFilter,
    };
  },
  components: {
    SfSidebar,
    SfButton,
    SfList,
    SfLink,
    SfIcon,
    SfHeading,
    SfMenuItem,
    SfFilter,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfAccordion,
    SfSelect,
    SfBreadcrumbs,
    SfLoader,
    SfColor,
    SfProperty,
    SfImage,
    LazyHydrate,
    ProductCard,
    ProductCardHorizontal,
    SfCheckbox,
  },
};
</script>

<style lang="scss" scoped>
/**DESKTOP CSS */
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
.main {
  display: flex;
}
.sortBy {
  border: 1px solid black;
  padding: 5px;
  padding-left: 1rem;
  border-radius: 5px;
  margin-top: 0px !important;
  margin-left: 35px !important;
}
.navbar__label {
  font-family: var(--font-family);
  font-size: 16px;
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
      width: 222px;
      background: var(--c-background-one);
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
    flex: 1 1 50%;
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
.sort-by {
  flex: unset;
  width: 11.875rem;
}
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

/** MOBILE CSS */
.avon-search__header {
  margin-bottom: 30px;
  h1 {
    color: #546264 !important;
    font-family: var(--font-family);
    font-weight: 400;
    text-align: center;
    font-size: 40px;
  }
  p {
    color: #546264 !important;
    font-family: var(--font-family);
    font-weight: 300;
    text-align: center;
    font-size: 25px;
    margin: 5px 0;
  }
}
.product-card {
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 30px;
  &__image {
    img {
      width: 100%;
    }
    width: 40%;
  }
  &__detail {
    width: 58%;
    h2 {
      color: #000;
      font-family: var(--font-family);
      font-size: 23px;
      font-weight: 500;
    }
  }
  &__cta {
    margin: 0 auto;
    display: block;
    margin-top: 15px;
    border: none;
    background: var(--c-primary);
    color: #fff;
    padding: 14px 11px;
    width: 220px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
  }
}
</style>

