
 const newQuery = `fragment DefaultProductPrice on ProductPrice {
  discounted {
    value {
      type
      currencyCode
      centAmount
      fractionDigits
    }
    discount {
      validFrom
      validUntil
      isActive
      name(acceptLanguage: $acceptLanguage)
    }
  }
  value {
    type
    currencyCode
    centAmount
    fractionDigits
  }
}
fragment Images on ProductVariant {
  images {
    url
    label
  }
}

fragment Price on ProductVariant {
  price(currency: $currency, country: $country) {
    ...DefaultProductPrice
  }
}

fragment Attributes on ProductVariant {
  attributesRaw {
    name
    value
    attributeDefinition {
      type {
        name
      }
      label(locale: $locale)
    }
  }
}

fragment DefaultVariant on ProductVariant {
  id
  sku
  ...Images
  ...Price
  ...Attributes
}

query products(
  $where: String
  $sort: [String!]
  $limit: Int
  $offset: Int
  $skus: [String!]
  $locale: Locale!
  $acceptLanguage: [Locale!]
  $currency: Currency!
  $country: Country!
) {
  products(
    where: $where
    sort: $sort
    limit: $limit
    offset: $offset
    skus: $skus
  ) {
    offset
    count
    total
    results {
      id
      key
      reviewRatingStatistics {	
        averageRating,
        ratingsDistribution,
        count
      }
      masterData {
        current {
          slug(acceptLanguage: $acceptLanguage)
          name(acceptLanguage: $acceptLanguage)
          metaTitle(acceptLanguage: $acceptLanguage)
          metaKeywords(acceptLanguage: $acceptLanguage)
          metaDescription(acceptLanguage: $acceptLanguage)
          description(acceptLanguage: $acceptLanguage)
          categoriesRef {
            id
          }
          allVariants {
            ...DefaultVariant
          }
          masterVariant {
            ...DefaultVariant
          }
        }
      }
    }
  }
}`;

  module.exports = newQuery;