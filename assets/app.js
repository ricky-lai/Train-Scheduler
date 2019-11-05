

var config = {
  apiKey: "AIzaSyD-vD_JUEtv0Ib8OO-L-RJw44cO-kXQpOA",
  authDomain: "train-scheduler21.firebaseapp.com",
  databaseURL: "https://train-scheduler21.firebaseio.com",
  projectId: "train-scheduler21",
  storageBucket: "train-scheduler21.appspot.com",
  messagingSenderId: "381716072687",
  appId: "1:381716072687:web:3ddba21e2ca3fd17bb331a",
  measurementId: "G-M9RXR6ZN3Q"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// click function to add to list
$("#addBtn").on("click", function (event) {
  event.preventDefault();

  // var user input
  var trnName = $("#train-input").val().trim();
  var trnDest = $("#destination-input").val().trim();
  var firstTrnTime = $("#time-input").val().trim();
  var trnFreq = $("#frequency-input").val().trim();

  // object to hold data
  var newTrn = {
    name: trnName,
    destination: trnDest,
    firstTime: firstTrnTime,
    frequency: trnFreq
  };

  // add to database
  database.ref().push(newTrn);

  // log everthing that was just pushed
  console.log(newTrn.name);
  console.log(newTrn.destination);
  console.log(newTrn.firstTime);
  console.log(newTrn.frequency);

  // clear form after pushing data
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// create a firebase event for adding the data from the new trains and then populating them in the DOM.
database.ref().on("child_added", function (childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  // store snapshot changes in variables
  var trnName = childSnapshot.val().name;
  var trnDest = childSnapshot.val().destination;
  var firstTrnTime = childSnapshot.val().firstTime;
  var trnFreq = childSnapshot.val().frequency;

  // log the values
  console.log(trnName);
  console.log(trnDest);
  console.log(firstTrnTime);
  console.log(trnFreq);


  var firstTrnTimeConv = moment(firstTrnTime, "hh:mm a").subtract(1, "years");

  var currentTime = moment().format("HH:mm a");
  console.log("Current Time:" + currentTime);

  var trnTimeCurrentTimeDiff = moment().diff(moment(firstTrnTimeConv), "minutes");

  var timeLeft = trnTimeCurrentTimeDiff % trnFreq;

  var minutesAway = trnFreq - timeLeft;

  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");


  $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDest + "</td><td>" + trnFreq + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});