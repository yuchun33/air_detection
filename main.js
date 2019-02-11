var req = new XMLHttpRequest()
var orderedData = ''
req.open("GET", "http://localhost:3000/")
req.onload = function(e){
    if(this.status==200){
        var response = JSON.parse(this.response)
        orderedData = createObj(response.data.records)
        document.querySelector('select[name="select-country"]').onchange = changeEventHandler
        INIT()
    }
}
req.send()

function changeEventHandler(e){
    var cty = e.target.value
    displayCountry(cty)
}

function createObj(rawData){
    var data = {}
    var country = ''
    for(var key in rawData){
        if(!(rawData[key].County in data)){
            country = rawData[key].County
            data[country]= new Object()
            data[country][rawData[key]['SiteName']] = rawData[key]
        } else {
            country = rawData[key].County
            data[country][rawData[key]['SiteName']] = rawData[key]
        }
    }
    console.log(data)
    return data
}

function INIT(){
    displayCountry('基隆市')
}

function displayCountry(selectCountry, data = orderedData){  
    var sitesInfo = document.querySelectorAll(".sitesInfo")
    var country = document.querySelector(".country")
    country.innerText = selectCountry
    

    sitesInfo[0].innerHTML=""
    sitesInfo[1].innerHTML=""
    DETAIL(data, selectCountry, Object.keys(data[selectCountry])[0])
    let n = 0, m = 0

    for(var i in data[selectCountry]){
        /*
        <div class="site bd-3 h-97 mb-32 flex">
           <div class="name w-2">前金</div>
           <div class="value w-25">43</div>
        </div>
        */            
        var publishTime = document.querySelector(".publishTime")
        publishTime.innerText = data[selectCountry][i]['PublishTime'] + " 更新"
        
        var site = document.createElement("div")
        site.classList.add("site", "bd-3", "h-97", "mb-32", "flex")
        var name = document.createElement("div")
        name.classList.add("name", "w-2")
        if(i.length>2){
            name.classList.add("ft-26")
            name.addEventListener('mouseenter', function(event){
                event.target.classList.add("ft-28", "scale");
            })
            name.addEventListener('mouseleave', function(event){
                event.target.classList.remove("ft-28", "scale");
            })
        }else{
            name.addEventListener('mouseenter', function(event){
                event.target.classList.add("ft-40", "scale");
            })
            name.addEventListener('mouseleave', function(event){
                event.target.classList.remove("ft-40", "scale");
            })
        }
        name.innerText = i
        var value = document.createElement("div")
        value.classList.add("value", "w-25")
        if(data[selectCountry][i]['AQI'] === ""){
            value.innerText = data[selectCountry][i]['Status']   
            value.classList.add("ft-26", "bg-blue")
        }else{
            value.innerText = data[selectCountry][i]['AQI'] 
            value.style.backgroundColor = COLOR(data[selectCountry][i]['AQI'])
        }
        
        site.appendChild(name)
        site.appendChild(value)
        
        
        name.onclick = function(e){            
            var tg = e.target.innerText
            DETAIL(data, selectCountry, tg)
        }    
        sitesInfo[n].appendChild(site)
        m += 1
        n = m % 2
    }
}

function DETAIL(data, selectCountry, tg){
    var infoName = document.querySelector(".infoName")
    if(tg.length>2){
        infoName.classList.add("ft-26")
    }else{
        infoName.classList.remove("ft-26")
    }
    infoName.innerText = tg
    var infoValue = document.querySelector(".infoValue")
    if(data[selectCountry][tg]['AQI'] === ""){
        infoValue.innerText = data[selectCountry][tg]['Status']   
        infoValue.classList.add("ft-26")
        infoValue.style.backgroundColor = "#7BDFF2"
    }else{
        infoValue.classList.remove("ft-26")
        infoValue.innerText = data[selectCountry][tg]['AQI']
        infoValue.style.backgroundColor = COLOR(data[selectCountry][tg]['AQI'])
    }
    var O3 = document.querySelector(".O3")
    O3.innerText = data[selectCountry][tg]['O3']
    var PM10 = document.querySelector(".PM10")
    PM10.innerText = data[selectCountry][tg]['PM10']
    var PM25 = document.querySelector(".PM25")
    PM25.innerText = data[selectCountry][tg]['PM2.5']
    var CO = document.querySelector(".CO")
    CO.innerText = data[selectCountry][tg]['CO']
    var SO2 = document.querySelector(".SO2")
    SO2.innerText = data[selectCountry][tg]['SO2']
    var NO2 = document.querySelector(".NO2")
    NO2.innerText = data[selectCountry][tg]['NO2']    
}

function COLOR(AQI){
    switch(true){
        case (51 <= AQI && AQI < 101):
            return "#FFE695"
        case (101 <= AQI && AQI < 151):
            return "#FFAF6A"
        case (151 <= AQI && AQI < 201):
            return "#FF5757"
        case (201 <= AQI && AQI < 301):
            return "#9777FF"
        case (301 <= AQI && AQI < 401):
            return "#AD1774"    
        default:            
            return "#95F084"
    }
}