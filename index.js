const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")
const cors = require("cors")
 const app = express();
 app.use(express.json())
 app.use(cors())
 const ind=[];
 const indnews=[{
    link:"https://www.independent.co.uk/asia"
 },{
    link:"https://www.independent.co.uk/travel/news-and-advice"
 },{
    link:"https://www.independent.co.uk/travel"
 },{
    link:"https://www.independent.co.uk/sport/cricket"
 },{
    link:"https://www.independent.co.uk/sport"
 },{
    link:"https://www.independent.co.uk/tech"
 },{
    link:"https://www.independent.co.uk/life-style/motoring/electric-vehicles"
 },{
    link:"https://www.independent.co.uk/arts-entertainment/photography"
 },{
    link:"https://www.independent.co.uk/life-style"
 }]
 const shownews=[];
 const news =[{
    link :"https://www.nbcnews.com/us-news"
 },
{
    link:"https://www.nbcnews.com/world"
},
{
    link:"https://www.nbcnews.com/culture-matters"
},
{
    link:"https://www.nbcnews.com/health"
},
{
    link:"https://www.nbcnews.com/business"
}]

news.forEach(newspaper=>{
    axios.get(newspaper.link)

    .then(response=>{
        const html=response.data
        const $=cheerio.load(html)
        $('.wide-tease-item__wrapper',html).each(function(){
           
            const imgurl = $(this).find('img').attr('src')
            const hed=$(this).find('.wide-tease-item__headline').text()
            const p =$(this).find('.wide-tease-item__description').text()
            
            shownews.push({
                imgurl,  
                hed,
                p
           })
           
        })
    })
})

indnews.forEach(mmanew=>{
    axios.get(mmanew.link)

    .then(response=>{
        const html=response.data
        const $=cheerio.load(html)
        $('.section-body',html).each(function(){
       
            const imgurl = $(this).find('amp-img').attr('src')            
            
            const p =$(this).find('.title').text()
            const tim = $(this).find('.sc-1p30kpk-0').attr('name')
            ind.push({
                imgurl,  
                p,
                tim
           })
           
        })
    })
})


app.get("/",(req,res)=>{
    res.json(shownews)
 })
 app.get("/ind",(req,res)=>{
    res.json(ind)
 })
 
  app.listen(3000,()=>{
    console.log("hello there")
  })