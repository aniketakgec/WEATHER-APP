const request=require('request')
const c=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url="https://api.darksky.net/forecast/42c1405b1408489647654f818a0eb662/"+ latitude +","+longitude
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to the Service!',undefined)
        }
        else if(body.error)
         {
             callback('Unable to find location ! please try again another location',undefined)
         }
         else
         {
             const temp=(body.currently.temperature-32)*0.5555
             callback(undefined, body.daily.data[0].summary+"It is currently " + Math.round(temp) +" °C  out . There is "+body.daily.data[0].precipProbability+" chances of rain" )
         }

    })

}
module.exports=forecast