var config = {
    apiKey: "AIzaSyBpfmvRSrcbEdkxHPuIDbzmak3_zx0UG1g",
    authDomain: "trainscheduler-a48e0.firebaseapp.com",
    databaseURL: "https://trainscheduler-a48e0.firebaseio.com",
    projectId: "trainscheduler-a48e0",
    storageBucket: "trainscheduler-a48e0.appspot.com",
    messagingSenderId: "718612390532"
  };
  firebase.initializeApp(config);


 var database = firebase.database();


$("#add-train-btn").on("click", function(event) {
    event.preventDefault();


    var tName = $("#name").val().trim();
    var tDestination = $("#destination").val().trim();
    var tFirstTime = $("#time").val().trim();
    var tFrequency = $("#frequency").val().trim();
 
    var newTrain = {
       name: tName,
       destination: tDestination,
       time: tFirstTime,
       frequency: tFrequency,
    };
    
    database.ref().push(newTrain);
      
      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.time);
      console.log(newTrain.frequency);

      alert("Train successfully added");


     $("#name").val("");
     $("#destination").val("");
     $("#time").val("");
     $("#frequency").val("");
  });

 database.ref().on("child_added", function(childSnapshot, prevChildkey) {

       console.log(childSnapshot.val());

        var tName = childSnapshot.val().name;
        var tDestination = childSnapshot.val().destination;
        var tFirstTime = childSnapshot.val().time;
        var tFrequency = childSnapshot.val().frequency;

        console.log(tName);
        console.log(tDestination);
        console.log(tFirstTime);
        console.log(tFrequency);


        var firstTimeConverted = moment(tFirstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        var currentTime = moment();
        console.log("current time: " + moment(currentTime).format("HH:mm"));

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log ("Difference in time: " + diffTime);

        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder)

        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("Minutes til train: " + tMinutesTillTrain); 

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("Arrival time: " + moment(nextTrain).format("hh:mm")); 

        $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
  tFrequency + "</td><td>" + (moment(nextTrain).format("hh:mm")) + "</td><td>" + tMinutesTillTrain + "</td><td>");

 });
 