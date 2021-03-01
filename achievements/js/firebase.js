var firebaseConfig = {
  apiKey: "AIzaSyAWIkkA1IKWCDnqKO9BdG9hnU2dg9LaX-U",
  authDomain: "sae-admin-gect.firebaseapp.com",
  databaseURL: "https://sae-admin-gect-default-rtdb.firebaseio.com",
  projectId: "sae-admin-gect",
  storageBucket: "sae-admin-gect.appspot.com",
  messagingSenderId: "1089982719218",
  appId: "1:1089982719218:web:55c39a467194fff057dc6b",
  measurementId: "G-P4CMJQZ0Q2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Achievements
var achievementsdata;
var achievementshtml = "";
firebase
  .database()
  .ref("/achievements/")
  .on("value", (snapshot) => {
    let data = snapshot.val();
    if (data) {
      let sortedData = Object.fromEntries(
        Object.entries(data).sort((a, b) => a[1].priority - b[1].priority)
      );
      achievementsdata = Object.values(sortedData);

      achievementshtml = "";
      achievementsdata.map((data) => {
        let html = `<div class="grid-item">
          <figure class="effect-sadie">
            <img src="${data.imageUrl}" alt="Image" class="img-fluid tm-img" />
            <figcaption>
              <h2 class="tm-figure-title">
                <span>
                  <strong>${data.title}</strong>
                </span>
              </h2>
              <p class="tm-figure-description">${data.content}</p>
              <a href="${data.imageUrl}">View more</a>
            </figcaption>
          </figure>
        </div>`;

        achievementshtml += html;

        return null;
      });

      document.getElementById("achievements-div").innerHTML = achievementshtml;
    }
  });
