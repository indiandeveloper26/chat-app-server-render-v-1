
import express from 'express';
import { createGroup, usergrouplist } from '../controlers/groupcon.js';
import { addusrgroup } from '../controlers/addusergrpup.js';




const grouproute = express.Router();

grouproute.post('/', createGroup)

grouproute.post('/usergrouplist', usergrouplist)
grouproute.post('/addusergroup', addusrgroup)






export default grouproute;
