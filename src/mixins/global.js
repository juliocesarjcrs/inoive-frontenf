import miniToastr from 'mini-toastr'
import Helper from '../services/helper'
import moment from 'moment'
import 'moment/locale/es';
moment.locale('es');


miniToastr.init()
export default {
    methods: {
        HandlingErrors(error){
            // console.log('HandlingErrors', error);
            Helper.HandlingErrors(error)
            
            // if (error.response){
            //     // console.log('(1)');
                
            //     // The request was made and the server responded with a status code
            //     // that falls out of the range of 2xx
            //     // console.log(error.response.data);
            //     // console.log(error.response.status);
            //     // console.log(error.response.headers);
            //     if(error.response.status ===422){
            //         this.notification(`Error ${error.response.status}`,error.response.data.errors, 'warning')

            //     }
            //     if(error.response.status ===404){
            //         this.notification(`Error ${error.response.status}`,error.response.data.message, 'warning')

            //     }
            // } else if (error.request){
            //     console.log('(2)');

            //     // The request was made but no response was received
            //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            //     // http.ClientRequest in node.js
            //     console.log(error.request);
            // } else {
            //     console.log('(3)');
            //     // Something happened in setting up the request that triggered an Error
            //     console.log('Error', error.message);
            // }
            // // console.error('handlend',error);
            // throw error
            
        },
        error_catch(e){
            // console.log('helper error_catch', e);
            Helper.error_catch(e)
            // console.warn(e);
        },
        // https://github.com/se-panfilov/mini-toastr
        notification(title= 'Mensaje', message='', type='success'){
            // const defaultConfig = {
            //     types: TYPES,
            //     animation: fadeOut,
            //     timeout: 3000,
            //     appendTarget: document.body,
            //     node: document.createElement('div'),
            //     style: {
            //         //Styles
            //     }
            // }
            if(type==='success'){
                miniToastr.success(message, title)
            }
            else if(type==='warning'){
                miniToastr.warn(message, title)
            }else if(type==='error'){
                miniToastr.error(message, title)
            }
        },
        format_date(date){
            return moment(date).utc().format('LLL');
        },
        format_number(number){         
            return  `$ ${new Intl.NumberFormat("de-DE").format(number)}`
        }

    }
}