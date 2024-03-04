module.exports = {
  // Import scss variables
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/_colors.scss";
          @import "@/scss/_grid.scss";
        `
      }
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`
      }
    }
  },
  chainWebpack: config => {
    // Disable prefetch scripts
    config.plugins.delete('prefetch')
  }
}
