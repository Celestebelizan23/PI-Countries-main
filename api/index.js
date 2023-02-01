//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require('dotenv').config();
const{PORT} = process.env;
const axios= require ('axios');

async function getCountries(){
  const countries= await axios.get('http://restcountries.com/v3/all')
  await countries.data.map(e=>{
    var data={
    name: e.name.official,
    flags: e.flags.length === 0? "No has flags" : e.flags[1],
    continents: e.continents[0],
    capital: e.capital,
    subregion: e.subregion,
    area:e.area,
    population:e.population,
    }
    console.log(data)
  })
}

//Syncing all the models at once.
conn.sync({ force: true }).then(() => {//porque va true y no false?
  server.listen(process.env.PORT, () => {
    getCountries()
    console.log('%s listening at', process.env.PORT); // eslint-disable-line no-console
  });
});


