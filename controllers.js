angular.module('app.controllers', [])

    .controller('entriesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
                                // You can include any angular dependencies as parameters for this function
                                // TIP: Access Route Parameters for your page via $stateParams.parameterName
                                function ($scope, $stateParams) {
                                    loadEntries();
                                    locate();
                                }])

    .controller('nearbyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
                               // You can include any angular dependencies as parameters for this function
                               // TIP: Access Route Parameters for your page via $stateParams.parameterName
                               function ($scope, $stateParams) {
                                   locate();

                               }])

    .controller('compareCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
                                // You can include any angular dependencies as parameters for this function
                                // TIP: Access Route Parameters for your page via $stateParams.parameterName
                                function ($scope, $stateParams) {


                                }])

    .controller('deleteAllConfirmCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
                                         // You can include any angular dependencies as parameters for this function
                                         // TIP: Access Route Parameters for your page via $stateParams.parameterName
                                         function ($scope, $stateParams) {


                                         }])

    .controller('deleteConfirmCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
                                      // You can include any angular dependencies as parameters for this function
                                      // TIP: Access Route Parameters for your page via $stateParams.parameterName
                                      function ($scope, $stateParams) {


                                      }])


    .controller('top5Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
                             // You can include any angular dependencies as parameters for this function
                             // TIP: Access Route Parameters for your page via $stateParams.parameterName
                             function ($scope, $stateParams) {
                                 
                                 updateEntries();


                             }])

    .controller('entryDetailsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
                                     // You can include any angular dependencies as parameters for this function
                                     // TIP: Access Route Parameters for your page via $stateParams.parameterName
                                     function ($scope, $stateParams) {

                                         getDetails();
                                     }])

    .controller('inputNewCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
                                 // You can include any angular dependencies as parameters for this function
                                 // TIP: Access Route Parameters for your page via $stateParams.parameterName
                                 function ($scope, $stateParams) {
                                     checkNewOrEdit();
                                 }])

    .controller('newCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
                            // You can include any angular dependencies as parameters for this function
                            // TIP: Access Route Parameters for your page via $stateParams.parameterName
                            function ($scope, $stateParams) {



                            }])


//Custom JS

var pictureUploaded = false;

var options = {
    quality: 100,
    destinationType: Camera.destinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.CAMERA
};

var photoFileHandle;

function takePicture()
{
    navigator.camera.getPicture(gotPhoto, onFail, options);
}

var fileURI;

function gotPhoto(tempFilename)
{
    var uploadedImg = document.getElementById("uploadedPic");
    uploadedImg.src = tempFilename;
    document.getElementById("inputNew-button6").innerHTML = "<br>Change";
    uploadedImg.style.display = "block";
    fileURI = tempFilename;
    pictureUploaded = true;

    window.resolveLocalFileSystemURI(fileURI, gotFileHandle, onFail);

    function gotFileHandle(fileHandle)
    { 
        photoFileHandle = fileHandle;
        // destination hardwired to work for your app on android (maybe just Fires also)
        var destination = "file:///data/data/com.phonegap.helloworld/files/files/";
        window.resolveLocalFileSystemURI(destination, gotDestination, onFail);
    }

    function gotDestination(destinationDirectory)
    {
        photoFileHandle.moveTo(destinationDirectory, photoFileHandle.name, moveSuccessful, onFail);
    }

    function moveSuccessful(fileHandle)
    {
        //alert("File moved to " + fileHandle.toURL());
        var uploadedImg = document.getElementById("uploadedPic");
        uploadedImg.src = fileHandle.toURL();
        document.getElementById("inputNew-button6").innerHTML = "<br>Change";
        uploadedImg.style.display = "block";
        pictureURL = fileHandle.toURL();
    }

}

//Search Bar

function search() {
    setInterval(function() {
    var parent = document.getElementById("entries-list1");
    while (parent.firstChild) {+

        parent.removeChild(parent.firstChild);
                              }
        var searchvalue = document.getElementById('searchinput').value;
        
       for(var i = 0; i<localStorage.length; i++) {
           var id = localStorage.key(i);
           var doc = localStorage.getItem(id);
           var includes = doc.toUpperCase().match(searchvalue.toUpperCase());
           
           if(includes) {
               writeNew(id);
           } else {
               //alert(includes);
           }
           
       }
    }, 100);
}


//New entry save

var detailsArray;
var totalEntries;
var pictureURL;
var activeEntry;
var newEntry;

function newEntry() {
    newEntry = true;
    document.getElementById('uploadedPic').style.display = "none";
    document.getElementById('uploadedPic').src = "img/defaulticon.png";
    //alert("New");
    resetForm();
}

function saveEntry() {
    if (detailsArray == null) {
        detailsArray = [];
    } 

    if(totalEntries == null) {
        totalEntries = 0;
    }

    if(pictureUploaded == false && newEntry == true) {
        pictureURL = "img/defaulticon2.png";
    } else if (newEntry == false && pictureUploaded == false) {
        var doc = localStorage.getItem(activeEntry);
        var parsed = JSON.parse(doc);
        pictureURL = parsed.pictureURL;
    } 


    var timeID;

    if(newEntry == true) {
        var date = new Date();
        timeID = Math.round(+new Date()/1000);
        detailsArray[totalEntries] = timeID;
        //alert(timeID);
    } else {
        var entryDoc = localStorage.getItem(activeEntry);
        var parsed = JSON.parse(entryDoc);
        timeID = parsed.ID;
    }


    /*var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear().toString().substr(2,2);*/
    var dateString = document.getElementById('inputDate').value;
    var type = document.getElementById('drinkType').value;
    if(type == "Other") {
        type = document.getElementById('otherInput').value;
    }
    var size = document.getElementById('drinkSize').value;
    var taste = document.getElementById('drinkTaste').value;
    var service = document.getElementById('drinkService').value;
    var price = document.getElementById('drinkPrice').value;
    var dontRem = document.getElementById('drbox');
    var overall = document.getElementById('drinkOverall').value;
    var notes = document.getElementById('notesInput').value;
    var loc = document.getElementById('inputLoc').value;
    /*if(pictureURL != null) {
        var URL = pictureURL;
    } else {
        var URL = "img/defaulticon.png";
    }*/

    //alert("URL is " + pictureURL);
    var structure = {
        picUploaded: pictureUploaded,
        pictureURL: pictureURL,
        GMcoords: GMcoords,
        location: loc,
        ID: timeID,
        date: dateString,
        type: type,
        size: size,
        taste: taste,
        service: service,
        price: price,
        overall: overall,
        notes: notes
    }


    var infostructure = JSON.stringify(structure);

    localStorage.setItem(timeID, infostructure);
    pictureUploaded = false;


    if(newEntry == false) {
        document.getElementById(timeID + "-loc").innerHTML = loc;
        document.getElementById(timeID + "-type").innerHTML = type;
        document.getElementById(timeID + "-ovr").innerHTML = "Overall: " + overall + "★";
        document.getElementById(timeID + "-img").src = pictureURL;

    } 

    loadEntries();
    javascript:history.back();
    resetForm();
    getDetails();
    updateEntries();


}

function loadEntries() {

    document.getElementById('totalNo').innerHTML = localStorage.length;
    if(localStorage.length == 0 ) {
        document.getElementById('last').innerHTML = "n/a";
    }

    for(var i = 0; i<localStorage.length; i++) {
        var elementID = localStorage.key(i);
        var element = document.getElementById(elementID);
        if(element == null) {
            writeNew(elementID);
        } 
    }
    if(localStorage.length > 0) {
        document.getElementById('noEntriesBox').style.display = "none";
    } else { 
        document.getElementById('noEntriesBox').style.display = "block";
    }


}

function writeNew(id){
        var structure = localStorage.getItem(id);
        var parsed = JSON.parse(structure);

        var inputList = document.getElementById("entries-list1");
        var newEntry = document.createElement("a");
        newEntry.className = "item item-thumbnail-left";
        newEntry.id = parsed.ID;
        var thumbnail = document.createElement("img");
        thumbnail.id = parsed.ID + "-img";
        thumbnail.src = parsed.pictureURL;
        //alert("source is " + pictureURL);
        var loc = document.createElement("h2");
        loc.id = parsed.ID+ "-loc";
        var type = document.createElement("p");
        type.id = parsed.ID + "-type";
        var ovr = document.createElement("p");
        ovr.id = parsed.ID + "-ovr";
        ovr.innerHTML = "Overall: " + parsed.overall + "★";
        document.getElementById('last').innerHTML = parsed.date;
        type.innerHTML = parsed.type;
        loc.innerHTML = parsed.location;



        newEntry.appendChild(thumbnail);
        newEntry.appendChild(loc);
        newEntry.appendChild(type);
        newEntry.appendChild(ovr);
        //newEntry.appendChild(dets);
        inputList.insertBefore(newEntry, inputList.childNodes[0]);

        newEntry.addEventListener("click", function() {
            /* var visib = document.getElementById('dets-' + parsed.ID).style.display;
            if(visib == "none") {
                document.getElementById('dets-' + parsed.ID).style.display = "block";
            } else document.getElementById('dets-' + parsed.ID).style.display = "none";*/

            activeEntry = parsed.ID;
            document.getElementById(parsed.ID).setAttribute("href", "#/page1/page7");
            getDetails();

        });
    }

function checkNewOrEdit() {
    if(newEntry == true) {
        resetForm();
    } else if (newEntry == false) {
        //alert("Editing");
        editEntry();
    }
}

function getDetails() {
    //alert(activeEntry);
    var doc = localStorage.getItem(activeEntry);
    var parsed = JSON.parse(doc);
    document.getElementById('enlrPic').src = parsed.pictureURL;
    document.getElementById('detailsLoc').innerHTML = parsed.location;
    document.getElementById('detailsID').innerHTML = parsed.ID;
    document.getElementById('detailsDate').innerHTML = parsed.date;
    document.getElementById('detailsType').innerHTML = parsed.type;
    document.getElementById('detailsSize').innerHTML = parsed.size;
    document.getElementById('detailsTaste').innerHTML = parsed.taste + "★";
    document.getElementById('detailsService').innerHTML = parsed.service + "★";
    document.getElementById('detailsPrice').innerHTML = parsed.price;
    document.getElementById('detailsOverall').innerHTML = parsed.overall + "★";
    document.getElementById('detailsNotes').innerHTML = parsed.notes;
}



function deleteAll() {
    localStorage.clear();
    document.getElementById('last').innerHTML = "n/a";
    document.getElementById('totalNo').innerHTML = "0";
    document.getElementById('noEntriesBox').style.display = "block";
    var parent = document.getElementById("entries-list1");
    while (parent.firstChild) {+

        parent.removeChild(parent.firstChild);
                              }
    checkSort();
    
    loadEntries();
}

function cancelForm() {
    resetForm();
    newEntry = true;
    document.getElementById('searchinput').value = null;
    javascript:history.back();

}

function resetForm() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear().toString().substr(2,2);
    var dateString = String(day) + "/" + String(month) + "/" + String(year);
    document.getElementById('inputDate').value = dateString;
    document.getElementById('uploadedPic').style.display = "none";
    document.getElementById('uploadedPic').src = "img/defaulticon.png";
    document.getElementById('inputNew-button6').innerHTML = "<br>+";
    document.getElementById('inputLoc').value = null;
    document.getElementById('drinkType').value = "Americano";
    document.getElementById('drinkSize').value = "Small";
    document.getElementById('otherInput').value = null;
    document.getElementById('inputNew-textarea2').style.display = "none";
    document.getElementById('drinkTaste').value = "5";
    document.getElementById('drinkService').value = "5";
    document.getElementById('drinkPrice').value = null;
    document.getElementById('drinkOverall').value = "5";
    document.getElementById('notesInput').value = null;
    lat = null;
    lon = null;
    GMcoords = null;
    pictureUploaded = false;
    document.getElementById('searchinput').value = null;
}


function deleteEntry() {
    localStorage.removeItem(activeEntry);
    var previewCard = document.getElementById(activeEntry);
    while (previewCard.firstChild) {
        previewCard.removeChild(previewCard.firstChild);
    }
    previewCard.parentNode.removeChild(previewCard);
    loadEntries();
}



function onFail(error)
{
    alert("Failed: " + error);
}


function editEntry() {
    newEntry = false;

    var doc = localStorage.getItem(activeEntry);
    var parsed = JSON.parse(doc);
    document.getElementById('uploadedPic').src = parsed.pictureURL;
    document.getElementById('uploadedPic').style.display = "block";
    document.getElementById('inputNew-button6').innerHTML = "<br>Change";
    document.getElementById('inputLoc').value = parsed.location;
    document.getElementById('inputDate').value = parsed.date;
    if(parsed.type == "Americano" || parsed.type == "Cappuccino" || parsed.type == "Espresso"
       || parsed.type == "Latte") {
        document.getElementById('drinkType').value = parsed.type;
    } else {
        document.getElementById('drinkType').value = "Other";
        document.getElementById('inputNew-textarea2').style.display = "flex";
        document.getElementById('otherInput').value = parsed.type;
    }
    document.getElementById('drinkSize').value = parsed.size;
    document.getElementById('drinkTaste').value = parsed.taste;
    document.getElementById('drinkService').value = parsed.service;
    document.getElementById('drinkPrice').value = parsed.price;
    document.getElementById('drinkOverall').value = parsed.overall;
    document.getElementById('notesInput').value = parsed.notes;

}

var newType;

function updateType() {
    var typeValue = document.getElementById('drinkType').value;
    newType = typeValue;
    if(typeValue == "Other") {
        document.getElementById('inputNew-textarea2').style.display = "flex";

    } else {
        document.getElementById('inputNew-textarea2').style.display = "none";
        document.getElementById('otherInput').value = null;
    }
}

//Top 5 sorter

function checkSort() {
    if(localStorage.length > 0) {
        document.getElementById('noEntriesBox2').style.display = "none";
    } else { 
        document.getElementById('noEntriesBox2').style.display = "block";
    }
    
     var parent = document.getElementById("top5list");
    while (parent.firstChild) {+

        parent.removeChild(parent.firstChild);
                              }
    
    var sortBy = document.getElementById('sort5By').value;
    var values = [];
    var entriesToLoad = document.getElementById('entriesToLoad').value;

    for(var i = 0; i<localStorage.length; i++) {
        var id = localStorage.key(i);
        var doc = localStorage.getItem(id);
        var parsed = JSON.parse(doc);
        var idandval;
        var val;

        if(sortBy == "Overall") {
            val = parsed.overall;
        } else if(sortBy == "Price (Highest)" || sortBy == "Price (Lowest)") {
            val = parsed.price;
        } else if(sortBy == "Taste") {
            val = parsed.taste;
        } else if(sortBy == "Service") {
            val = parsed.service;
        }

        idandval = [val, id];
        values.push(idandval);

    }

    values.sort(sortFunction);

    function sortFunction(a, b) {
        if (a[0] === b[0]) {
            return 0;
        } else if(sortBy == "Price (Lowest)") {
            return (a[0] < b[0]) ? -1 : 1;
        }
        else {
            return (a[0] > b[0]) ? -1 : 1;
        }
    }

    for(var i = 0; i<entriesToLoad; i++) {
        if(values[i] != undefined) {
            
            var currentID = values[i][1];
            var struct = localStorage.getItem(currentID);
            var parsed = JSON.parse(struct);
            
            var inputList = document.getElementById("top5list");
    var newEntry = document.createElement("a");
        newEntry.className = "item item-thumbnail-left";
        newEntry.id = "top5" + parsed.ID;
        var thumbnail = document.createElement("img");
        //thumbnail.id = currentID + "-img";
        thumbnail.src = parsed.pictureURL;
        //alert("source is " + pictureURL);
    var loc = document.createElement("h2");
        //loc.id = parsed.ID+ "-loc";
    var type = document.createElement("p");
        //type.id = parsed.ID + "-type";
    var ovr = document.createElement("p");
       // ovr.id = parsed.ID + "-ovr";
    ovr.innerHTML = sortBy + ": " + values[i][0] + "★";
            if(sortBy == "Price (Highest)" || sortBy == "Price (Lowest)") {
                ovr.innerHTML = "Price: £" + values[i][0];
            }
            
    type.innerHTML = parsed.type;
    loc.innerHTML = parsed.location;
            
        
            newEntry.setAttribute("onclick", "loadPage(" + currentID + ")");
        newEntry.appendChild(thumbnail);
    newEntry.appendChild(loc);
    newEntry.appendChild(type);
    newEntry.appendChild(ovr);
    inputList.appendChild(newEntry);

        

        }
    }
}

function loadPage(entryid) {
    activeEntry = entryid;
    //alert(activeEntry);
    document.getElementById('top5' + entryid).setAttribute("href", "#/page1/page7");
    getDetails();
    
}

function updateEntries() {
    document.getElementById('displayNo').innerHTML = document.getElementById('entriesToLoad').value;
    checkSort();

}



//Geolocation

var pos;

var lat;
var lon;
var GMcoords;

function locateLog() {
    navigator.geolocation.getCurrentPosition(getCoords, locError, { enableHighAccuracy : true });
    function getCoords(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        var latlng = new google.maps.LatLng(lat, lon);
        GMcoords = {lat:lat, lng:lon};

        // This is making the Geocode request
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            // This is checking to see if the Geoeode Status is OK before proceeding
            if (status == google.maps.GeocoderStatus.OK) {
                gotLoc = (results[0].formatted_address);
                document.getElementById('inputLoc').value = gotLoc;
            }
        });
    }
}



function locate() {
    navigator.geolocation.getCurrentPosition(locSuccess, locError, { enableHighAccuracy : true });
}

function locSuccess(position) {
    pos = {lat: position.coords.latitude, lng: position.coords.longitude};
    initMap();
}

function locError() {
    alert('Could not get geolocation');
}


//Map

var map;
var infowindow;
var nearbyOn;


function initMap() {
    if(pos == undefined) {
        locate();
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 18
    });

    infowindow = new google.maps.InfoWindow();
    var currentM = new google.maps.Marker({
        map: map,
        position: pos,
        title: 'Current Location'
    });
    google.maps.event.addListener(currentM, 'click', function() {
        infowindow.setContent("Current Location");
        infowindow.open(map, this);
    });

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: pos,
        radius: 200,
        types: ['cafe']
    }, callback);

    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);
            for (var i = 0; i < results.length; i++) {

                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            title: place.name
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }
} 



function findNearby() {
    document.getElementById('nearbyTab').style.backgroundColor = "#d2a56d";
    document.getElementById('nearbyTab').style.color = "white";
    document.getElementById('visitedTab').style.backgroundColor = "transparent";
    document.getElementById('visitedTab').style.color = "#d2a56d";
    initMap();
}

function findVisited() {
    document.getElementById('nearbyTab').style.backgroundColor = "transparent";
    document.getElementById('nearbyTab').style.color = "#d2a56d";
    document.getElementById('visitedTab').style.backgroundColor = "#d2a56d";
    document.getElementById('visitedTab').style.color = "white";
    initVisitedMap();


}

function initVisitedMap() {
    if(pos == undefined) {
        locate();
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 18
    });

    infowindow = new google.maps.InfoWindow();
    var currentM = new google.maps.Marker({
        map: map,
        position: pos,
        title: 'Current Location'
    });
    google.maps.event.addListener(currentM, 'click', function() {
        infowindow.setContent("Current Location");
        infowindow.open(map, this);
    });


    for(var i = 0; i<localStorage.length; i++) {
        var elementID = localStorage.key(i);
        var element = localStorage.getItem(elementID);
        //alert(element);
        var parsed = JSON.parse(element);
        var latln = parsed.GMcoords;
        var title = parsed.location;
        var preV = new google.maps.Marker({
            map: map,
            position: latln,
            title: title
        });
        google.maps.event.addListener(preV, 'click', function() {
            infowindow.setContent(title);
            infowindow.open(map, this);
        });
    }

}


function pickDate() {

    var DPoptions = {
        date: new Date(),
        mode: 'date'
    };

    datePicker.show(DPoptions, function(date){
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear().toString().substr(2,2);
        var dateString = String(day) + "/" + String(month + 1) + "/" + String(year);
        document.getElementById('inputDate').value = dateString;
    });

}



