const path=require('path')
const express=require('express')

// setting up Paths for express configuration
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

const app=express()
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const port=process.env.PORT ||3000


//setting up handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setting up static directory path

app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',
    {
        title:'Weather Page',
        name:'Aniket pandey'
    })

})

app.get('/about',(req,res)=>{
    res.render('about',
    {
        title:'ABOUT PAGE',
        name:'Aniket pandey'
    })

})

app.get('/help',(req,res)=>{
    res.render('help',
    {
        title:'HELP PAGE',
        name:'Aniket pandey'
    })

})


app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Address field is reqired'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({error})

            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })

    })


})

///==================REVERSE GEOCODING ==========================//






app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage:'Help article not found',
        name:'Aniket pandey',
        title:'404'
    })
})


app.get('/*',(req,res)=>{
    res.render('404',{
        errorMessage:'Page not found ',
        name:'Aniket pandey',
        title:'404'
    })
})

app.listen(port,()=>{
    console.log('server is running at port no '+port)
 })
 


