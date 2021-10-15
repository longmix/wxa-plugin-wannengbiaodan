




var selfform_data = require('./common/selfform_data.js');
var welcome_page_data = require('./common/welcome_page_data.js');


module.exports = {
  get_selfform_data: selfform_data.get_selfform_data,
  get_welcome_page_data: welcome_page_data.get_welcome_page_data,
  
  sayHello() {
    console.log('Hello plugin!')
  },
  answer: 42
}
