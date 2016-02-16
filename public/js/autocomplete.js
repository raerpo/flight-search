$('input[type="text"]').autocomplete({
  source: '/search_city/'
})

/*
$('input[type="text"]').keyup(function(){
  var $activeInput = $(this);
  var searchValue = $(this).val();
  if(searchValue.length === 4){
    $.ajax({
      url: '/search_city/' + searchValue,
      type: 'POST',
      success: function(data){
        var currentAirports = []

        var airports = data.airports;
        for(var i = 0; i < airports.length; i++){
          var airportInfo = airports[i].code + ' - ' + airports[i].city + ' - ' + airports[i].country;
          currentAirports.push(airportInfo);
        }
        console.log(currentAirports);
        $activeInput.autocomplete({
          source: currentAirports
        });

      }
    });
  }
});
*/
