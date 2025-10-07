


























import express from 'express';
import Crateuser from '../modal/saveuser.js';

const errorroute = express.Router();

errorroute.post('/', async (req, res, next) => {
    try {
        // Direct error trigger

        let id = "67d991839b837ddd4eba10c8ab"
        let dta = await Crateuser.findById({ _id: id })

        res.json(dta)

    } catch (error) {
        next(error); // Error middleware call hoga
    }
});

export default errorroute;



