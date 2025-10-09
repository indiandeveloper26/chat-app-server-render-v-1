
import express from 'express';
import { createGroup, usergrouplist } from '../controlers/groupcon.js';



const grouproute = express.Router();

grouproute.post('/', createGroup)
// grouproute.post('/addgroup', addusergrup)
grouproute.post('/usergrouplist', usergrouplist)
// grouproute.post('/addusergroup', addusergroup)






export default grouproute;
