const request=require('request')
const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiYW5pa2V0YWtnZWMiLCJhIjoiY2szYWRtdWdoMGJlZDNwczExaHI2bG1wMiJ9.7kWcSYiLGjHgG0k7zmpbig"
    request({url:url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to the Service!',undefined)
        }
        else if(body.features.length===0 || body.message)
         {
             callback('Unable to find location ! please try again another location',undefined)
         }
         else
         {
             callback(undefined,{
                 longitude:body.features[0].center[0],
                 latitude:body.features[0].center[1],
                 location:body.features[0].place_name
             })
         }

    })

}
module.exports=geocode