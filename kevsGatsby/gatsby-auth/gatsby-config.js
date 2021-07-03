/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
 require("dotenv").config({
  path: `/env/${process.env.NODE_ENV}.js`,
 })


module.exports = {
  /* Your site config here */
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-env-variables`,
      options: {
        envFolderPath: `env/`
      }
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: 'kevinspics' ,
      },
    },
    {
      resolve: 'util',
      options: {
        fallback: {
          util: require.resolve("util/")
        },
      },
    },
  ],

}

