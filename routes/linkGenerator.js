const express= require('express');

const router= express.Router();

const linkGeneratorController= require('../controller/linkGenerator')

router.get('/generateLink/:id',linkGeneratorController.linkGenerator)



module.exports=router;          