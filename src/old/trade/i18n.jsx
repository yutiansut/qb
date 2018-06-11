import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import {reactI18nextModule} from 'react-i18next';


i18n
    .use(XHR)
    .use(reactI18nextModule)
    .init({
        fallbackLng: 'en',
        backend:{
            loadPath: '/static/locales/{{lng}}/{{ns}}.json'
        },
        // have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        react: {
            wait: true
        }
    });


export default i18n;
