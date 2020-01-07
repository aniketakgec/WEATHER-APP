
function FetchWeatherData(addr){
    if(addr)
    { 
        fetch('/weather?address='+addr).then((response)=>{
            response.json().then((data) => {
                if(data.error)
                { 
                     message.textContent="Error!!"
                     message.style.color="red"
                     messageOne.style.visibility="hidden"
                     message.style.fontSize=30

                     messageTwo.style.fontSize=30
                    messageTwo.textContent=(data.error)
                }
                else
                {   message.textContent="Success!!"
                    message.style.color="green"
                    message.style.fontSize=30
                    messageOne.textContent=  data.location
                    messageTwo.textContent= data.forecast
                }
                
                  
                    
              

            }
        
        )})
    }
   

}

const x=document.getElementById('WeatherInput')
const weatherData=document.querySelector('form')
const searchValue=document.querySelector('#WeatherInput')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherData.addEventListener('submit',(e)=>{
    e.preventDefault()
    message.textContent=''
    messageOne.textContent="Loading ..."
    messageTwo.textContent=''
    console.log(FetchWeatherData(searchValue.value) )

})


