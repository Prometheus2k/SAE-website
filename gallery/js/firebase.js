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

// Gallery
var gallerydata;
var galleryhtml = "";
firebase
  .database()
  .ref("/gallery/")
  .on("value", (snapshot) => {
    let data = snapshot.val();
    if (data) {
      let sortedData = Object.fromEntries(
        Object.entries(data).sort((a, b) => a[1].priority - b[1].priority)
      );
      gallerydata = Object.values(sortedData);

      galleryhtml = "";
      gallerydata.map((data) => {
        let html = `<div class="grid-item">
          <figure class="img-hover-zoom">
            <img
              src="${data.imageUrl}"
              alt="Image"
              class="img-fluid tm-img"
            />
            <figcaption>
              <a href="${data.imageUrl}">View more</a>
            </figcaption>
          </figure>
        </div>`;

        galleryhtml += html;

        return null;
      });

      document.getElementById("gallery-div").innerHTML = galleryhtml;
    }
  });
