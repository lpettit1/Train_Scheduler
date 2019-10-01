

    // Your web app's Firebase configuration
    var firebaseConfig = {
    apiKey: "AIzaSyCHPfDC9Y2MlEvpBF1G94IANkk7hCWG5l8",
    authDomain: "train-time-7c34d.firebaseapp.com",
    databaseURL: "https://train-time-7c34d.firebaseio.com",
    projectId: "train-time-7c34d",
    storageBucket: "train-time-7c34d.appspot.com",
    messagingSenderId: "974364918425",
    appId: "1:974364918425:web:b099c92436da354b49ae08",
    measurementId: "G-3E6VNXYFMW"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();


    // 2. Buttons for adding train
    $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = moment($("#first-train-time-input").val().trim(), "HH:MM-military time").format("x");
    var frequency = $("#frequency-input").val().trim();

    //temporary object holding train data
    var newTime = {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    };

    //push train data to database
    database.ref().push(newTime);

    
    console.log(newTime.trainName);
    console.log(newTime.destination);
    console.log(newTime.firstTrainTime);
    console.log(newTime.frequency);

    
    alert("Train added")

    //clears text-box's
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");

    });

    //add to firebase event/ row in html/ database.
    database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    //store # into variable
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;

    
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    //start of the time math
    var frequency = 30;

    var firstTrainTime = "06:00";


    // calculate train time w/math
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    //current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    //difference between times
    var diffTime = moment().diff(moment(firstTrainTimePretty), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    //time apart
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    //next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format('HH:mm'));
    //add train data into table
    $("#train-table > tbody").append("<tr><td." + trainName + "</td><td>" + destination + "</td><td>" + frequency + 
    "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" +tMinutesTillTrain + "</td></tr>");


    });

