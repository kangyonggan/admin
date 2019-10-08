module.exports = {
    productionSourceMap: false,
    configureWebpack: () => {
        if (process.env.NODE_ENV === 'development') {
            return {
                resolve: {
                    alias: {
                        vue$: 'vue/dist/vue.js'
                    }
                }
            };
        }
    }
};