var getData;
var $search = $("#search");
var defaultLoc = "abuja";



// LOCATION EVENT-LISTENER
$("form").submit(function(e){
  e.preventDefault();
  var location = $search.val().toLowerCase();
  request(location);
});


//CONVERT TIME
function tConvert (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}


// API REQUEST AND DELIVERY
function request(location){
  var url = "http://api.apixu.com/v1/current.json?key=759ece0bc69f4d9c946191832162704&q="+location;
  
  
  $.ajax({
    url : url,
  
    success: function(weather){
     
      
      
      var weatherData = {
        city : weather.location.name,
        country : weather.location.country,
        time : weather.location.localtime.slice(11),
        condition : weather.current.condition.text,
        temperature : weather.current.temp_c,
        pressure : weather.current.pressure_in,
        latitude : weather.location.lat,
        longitude : weather.location.lon
    };
      $("#city").text(weatherData.city);
      $("#mainTemp span").text(weatherData.temperature);
      $("#time").text(tConvert (weatherData.time));
      $("#country").text(weatherData.country);
      $("#weatherDesc").text(weatherData.condition);
      $("#pressure div span").text(weatherData.pressure);
      $("#lat div span").text(weatherData.latitude);
      $("#lon div span").text(weatherData.longitude);
      
      
     console.log(weatherData.city);
      
      // WEATHER BACKGROUND CHANGES
      
      if (weatherData.condition.match(/cloudy?/i)){
        $("#app").css("background", "url(img/cloudy.jpg)");
        console.log("ok")
      }else if(weatherData.condition.match(/sun?/i)){
        $("#app").css("background", "url(img/sunny.jpg)");
      }else if(weatherData.condition.match(/mist?/i)){
        $("#app").css("background", "url(img/mist.jpg)");
      }else if(weatherData.condition.match(/clear?/i)){
        $("#app").css("background", "url(img/clear.jpg)");
      }else if(weatherData.condition.match(/rain?/i)){
        $("#app").css("background", "url(img/rainy.jpg)");
      }else if(weatherData.condition.match(/thunder?/i)  ||  weatherData.condition.match(/lightning?/i)){
        $("#app").css("background", "url(img/thunder.jpg)");
      }else{
        $("#app").css("background", "url(img//bg-df.bmp)");
      }
      
  }});

};



request(defaultLoc);
