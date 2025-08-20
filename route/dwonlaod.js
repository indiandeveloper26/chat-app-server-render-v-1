import express from 'express';
import Download from '../modal/dwonload.js';


const dwroute = express.Router();







// Route: POST /download
dwroute.post('/', async (req, res) => {
  let counter = await Download.findOne();

  if (!counter) {
    // पहला request है तो create करो
    counter = await Download.create({ count: 1 });
  } else {
    counter.count += 1;
    await counter.save();
  }

  console.log(`✅ New download logged. Total downloads: ${counter.count}`);

  res.json({
    success: true,
    count: counter.count,
  });
});


dwroute.post('/count', async (req, res) => {
  let counter = await Download.findOne();

      

 try {
        if (!counter) {
          res.json({"notfoun ":"notfoun"})
    }

    res.json({"data":counter})
 } catch (error) {
     res.json({"data":error.message})
 }

});


export default dwroute;