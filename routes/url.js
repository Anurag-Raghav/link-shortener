const express = require('express');
const router= express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
require('dotenv').config();

const Url = require('../models/Url');

router.use(express.json({extended: false}))
// @route POST /api/url/shorten
// @desc Create short URL
router.post('/shorten', async (req,res)=>{
    const longUrl= req.body.longUrl;
    const baseUrl = process.env.baseUrl;
    // Create url code

    const urlCode = shortid.generate();

    // check long url 

    if(validUrl.isUri(longUrl)){
        try{
            let url = await Url.findOne({longUrl});
            if(url){
                res.render('index',{
                    output:url.shortUrl
                })
            }else{
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                res.render('index',{
                    output:url.shortUrl
                })
            }
        }catch(err){
            res.render('index',{
                output: 'server error'
            })
            res.status(501);
        }
    }else{
        res.render('index', {
            output: 'invalid url'
        })
        res.status(401);
    }
});



module.exports= router;