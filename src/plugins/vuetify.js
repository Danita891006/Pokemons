import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);


export default new Vuetify({
    icons: {
        iconfont: 'mdiSvg',
    },
    theme: {
        themes: {
            light: {
                primary: '#3f51b5',
                secondary: '#673ab7',
                accent: '#9c27b0',
                error: '#e91e63',
                warning: '#f44336',
                info: '#00bcd4',
                success: '#009688'
            }
        },
        options: {
            customProperties: true,
            variations: false,
        },
    },
})