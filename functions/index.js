const functions = require("firebase-functions");
const admin = require("firebase-admin");
const request = require("request");
admin.initializeApp(functions.config().firebase);

//Query API for articles, compare the title of the newest article on API with newest title in db
//if new post title is found, send push notification to app and update the stored article title to the new one.
exports.helloWorld = functions.https.onRequest((req, res) => {
  //request the JSON object from skotdeild api, and then parse it as json
  request(
    "http://www.keflavik.is/resources/json/skotdeild.aspx",
    (error, response, body) => {
      let data = JSON.parse(body);
      console.log(data);

      //check the database for the most recent article headline stored in the db
      //compare that snapshot with the newest article title from the API response
      admin
        .database()
        .ref("/test")
        .once("value")
        .then(snap => {
          if (snap.val().title !== data.articles[0].title) {
            //if the article titles do not match, a new article has been published
            //construct a notification payload with the post details
            let payload = {
              notification: {
                title: data.articles[0].title,
                body:
                  data.articles[0].description.length <= 100
                    ? data.articles[0].description
                    : data.articles[0].description.substring(0, 97) + "...",
                sound: "default",
                badge: "1"
              }
            };
            console.log("push notification constructed: ", payload);
            //update the database with the new article title for future comparisons
            admin
              .database()
              .ref("test")
              .set({
                title: data.articles[0].title
              });

            //res must be resolved or it will timeout the function when Cloud Scheduler calls the url to run the function
            res.send(`New article title found: " ${data.articles[0].title}"`);
            //admin.messaging will not run unless it is explicitly run because it is a promise object
            return admin.messaging().sendToTopic("test", payload);
          } else {
            res.send("No New Articles");
            console.log("No new articles");
          }
          return snap;
        })
        //This catch will display problems with the push notification json object
        .catch(error => console.log("db error caught: " + error));
    }
  );
});
