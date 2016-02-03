var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span>%data%</span><hr/>';

var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLlinkedin = '<li class="flex-item"><span class="orange-text">linkedin:</span>';
var HTMLlinkedinURL = '<span class="white-text"><a href="#" target="_blank">%data%</a></span></li>';
var HTMLemail = '<li class="flex-item"><span class="orange-text">email:</span><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="orange-text">twitter:</span>';
var HTMLtwitterURL = '<span class="white-text"><a href="https://twitter.com/juli_brady" target="_blank">%data%</a></span></li>';
var HTMLgithub = '<li class="flex-item"><span class="orange-text">github:</span>';
var HTMLgithubURL = '<span class="white-text"><a href="#" target="_blank">%data%</a></span></li>';
var HTMLlocation = '<li class="flex-item"><span class="orange-text">location:</span>';
var HTMLlocationURL = '<span class="white-text"><a href="#" target="_blank">%data%</a></span></li>';

var HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLWelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<h3 id="skillsH3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';


var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="#" target="_blank">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';
var HTMLworkPublicationStart = '<div class="workPublication"><em>Publication:  </em>';
var HTMLworkPublication = '<a class ="workPublication" href=" #" target="_blank">%data%</a></div>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#" target="_blank">%data%';
var HTMLprojectTitleNoLink = '<div>%data%</div>';
var HTMLprojectURL = ' — %data%</a>';
var HTMLstackStart = '<div class="stack">Stack:  </div>';
var HTMLstack = '<div class="stack">%data% </div>';
var HTMLprojectDates = '<br><div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<a href="#" class="project-img"><img class="project-img" src="%data%" alt="%data%"></a>';
var HTMLprojectFocus = '<p class="project-focus"></p>'
var HTMLprojectLightboxURL = '<a href="#" target="_blank">Go To Site!</a>'

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="#" target="_blank">%data%';
var HTMLschoolDegree = ' — %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';
var HTMLschoolPublicationStart = '<br><div class="workPublication"><em>Publication:  </em>';
var HTMLschoolPublication = '<a class ="workPublication" href=" #" target="_blank">%data%</a></div>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="#" target="_blank">%data%';
var HTMLonlineSchool = ' — %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="#" target="_blank" class="onlineclassUrl">%data%</a>';

var googleMap = '<div id="map"></div>';



/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/

clickLocations = [];


/*
 Whenthe navbar's position is fixed, then jumping to a in-page anchor link places
 the initial content for that anchor under the navbar, hidden from the user.
 This code fixes it:
*/
var shiftWindow = function() {
    scrollBy(0, -80)
};
if (location.hash) shiftWindow();
window.addEventListener("hashchange", shiftWindow);

// /*
//  * Logs x,y coordinates in console
//  */
// function logClicks(x, y) {
//     clickLocations.push({
//         x: x,
//         y: y
//     });
//     console.log('x location: ' + x + '; y location: ' + y);
// }
//
// $(document).click(function(loc) {
//     var x = loc.pageX;
//     var y = loc.pageY;
//
//     logClicks(x, y);
// });


//-------------------------------
//Toggle Active class on NavBar
$(".nav a").on("click", function(){
  $(".nav").find(".active").removeClass("active");
  $(this).parent().addClass("active");
});
//-------------------------------


// Google Map
// documentation: //https://developers.google.com/maps/documentation/javascript/reference

var map; // declares a global map variable
/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {
        var locations;
        var mapOptions = {
            disableDefaultUI: false,
            mapTypeId: google.maps.MapTypeId.TERRAIN,

        };

        //***create InfoWindow in main initializeMap() function
        //then inside createMapMarker() create click event on marker
        //to open infoWindow -this allows for the infowindows to close when you
        //click on another one.***
        var infoWindow = new google.maps.InfoWindow({
            content: 'initial info window content' // final content is in createMapMarker()
        });

        map = new google.maps.Map(document.querySelector('#map'), mapOptions);

        /*
        locationFinder() returns an array of every location string from the JSONs written for bio, education, and work.
        */
        function locationFinder() {
            var locations = [];
            locations.push(bio.location);
            for (var school in education.schools) {
                locations.push(education.schools[school].location);
            }
            for (var job in work.jobs) {
                locations.push(work.jobs[job].location);
            }
            return locations;

        }

        /*
        createMapMarker(placeData) reads Google Places search results to create map pins.
        placeData is the object returned from search results containing information
        about a single location.
        */
        function createMapMarker(placeData) {
            var placeId = placeData.place_id;
            var lat = placeData.geometry.location.lat(); // latitude from the place service
            var lon = placeData.geometry.location.lng(); // longitude from the place service
            var city = placeData.formatted_address; // name of the place from the place service
            var bounds = window.mapBounds; // current boundaries of the map window
            var place;
            var date;

            if (placeId === bio.place_id) {
                place = "Current Home";
                date = bio.dates;
            }
            for (school in education.schools) {
                if (placeId === education.schools[school].place_id) {
                    place = education.schools[school].name;
                    date = education.schools[school].dates;
                }
            }
            for (job in work.jobs) {
                if (placeId === work.jobs[job].place_id) {
                    place = work.jobs[job].employer;
                    date = work.jobs[job].dates;
                }
            }
            // marker is an object with additional data about the pin for a single location
            var marker = new google.maps.Marker({
                map: map, //specifies on which map to place marker
                position: placeData.geometry.location, //placedata is an object with additional data about the place
                title: place + " " + city, //title = what appears when hover over marker
                animation: google.maps.Animation.DROP
            });

            google.maps.event.addListener(marker, 'click', function() {
                var content = $('<div id="iw_container"></div>');
                var header = $('<div class="iw_title"><div>');
                header.text(place + " — " + date);
                var city_div = $('<div class="iw_city"><div>');
                city_div.text(city)

                content.append(header);
                content.append(city_div);
                infoWindow.setContent(content.html());
                infoWindow.open(map, this); //'this' or 'marker' places pin at proper anchor
            });

            // this is where the pin actually gets added to the map.
            // bounds.extend() takes in a map location object
            bounds.extend(new google.maps.LatLng(lat, lon));
            // fit the map to the new marker
            map.fitBounds(bounds);
            // center the map
            map.setCenter(bounds.getCenter());
        }

        /*
        callback(results, status) makes sure the search returned results for a location.
        If so, it creates a new map marker for that location.
        */
        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                createMapMarker(results[0]);
            }
        }

        /*
        pinPoster(locations) takes in the array of locations created by locationFinder()
        and fires off Google place searches for each location
        */
        function pinPoster(locations) {

            // creates a Google place search service object. PlacesService does the work of
            // actually searching for location data.
            var service = new google.maps.places.PlacesService(map);
            for (var place in locations) {
                // the search request object
                var request = {
                    query: locations[place]
                };
                // Actually searches the Google Maps API for location data and runs the callback
                // function with the search results after each search.
                service.textSearch(request, callback);
            }
        }

        // Sets the boundaries of the map based on pin locations
        //LatLngBounds() is a maps method
        window.mapBounds = new google.maps.LatLngBounds();

        // locations is an array of location strings returned from locationFinder()
        locations = locationFinder();

        // pinPoster(locations) creates pins on the map for each location in
        // the locations array
        pinPoster(locations);

    } //this is the end of the initializeMap() function

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

//Vanilla JS way to listen for resizing of the window
//and adjust map bounds
window.addEventListener('resize', function(e) {
    //Make sure the map bounds get updated on page resize
    map.fitBounds(mapBounds);
});
