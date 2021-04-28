const newQuery = require('./queries/customQueries.ts');
module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: {
        api: {
          uri: 'https://api.us-central1.gcp.commercetools.com/poc-avon-uk-dev/graphql',
          authHost: 'https://auth.us-central1.gcp.commercetools.com',
          projectKey: 'poc-avon-uk-dev',
          clientId: 'wM0SahIsfYwn8gsqCyFnqBfN',
          clientSecret: '62B71c_2ljyXSQ5CmkL28vZm421p-Dfq',
          // clientId: 'maUQ_dmFhPQaogZ83NXM9ls8',
          // clientSecret: 'X4FbvOLtywW0XjcNkcgBlndvr1fjY81v',
          scopes: [
            // 'manage_project:poc-avon-uk-dev'
            'manage_customer_groups:poc-avon-uk-dev',
            'manage_categories:poc-avon-uk-dev',
            'manage_discount_codes:poc-avon-uk-dev',
            'manage_payments:poc-avon-uk-dev',
            'manage_orders:poc-avon-uk-dev',
            'manage_customers:poc-avon-uk-dev',
            'manage_extensions:poc-avon-uk-dev',
            'manage_cart_discounts:poc-avon-uk-dev',
            'manage_products:poc-avon-uk-dev',
            'manage_order_edits:poc-avon-uk-dev',
            'manage_project:poc-avon-uk-dev'
          ]
        },
        currency: 'GBP',
        country: 'GB'
      },
      customQueries: {
        'my-products-query': ({ query, variables }) => {
          return { query:newQuery, variables }
        }
      }
    }
  }
};
