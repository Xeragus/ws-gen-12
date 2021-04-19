const axios = require('axios');

axios.get('http://localhost:3000/hehe')
  .then(response => {
    console.log(response.data.message);
  })
  .catch(error => {
    console.log(error);
  })

// client --------------------request------------------->
