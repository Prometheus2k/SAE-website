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

// Events
var eventsdata;
var eventshtml = "";
firebase
  .database()
  .ref("/events/")
  .on("value", (snapshot) => {
    let data = snapshot.val();
    if (data) {
      let sortedData = Object.fromEntries(
        Object.entries(data).sort(
          (a, b) => new Date(b[1].date) - new Date(a[1].date)
        )
      );
      eventsdata = Object.values(sortedData);

      eventshtml = "";
      eventsdata.map((data, i) => {
        let date, mon, year;
        date = data.date.substr(8, 2);
        mon = data.date.substr(5, 2);
        year = data.date.substr(0, 4);
        let monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        mon = monthNames[Number(mon) - 1];

        if (i % 2 !== 0) {
          let html = `<div class="timeline-item">
          <div class="timeline-img"></div>

          <div class="timeline-content timeline-card js--fadeInRight">
            <div class="timeline-img-header">
              <div>
                <img src="${data.imageUrl}" class="img-responsive" alt=""/>
              </div>
              <h2>${data.title}</h2>
            </div>
            <div class="date">
              ${date} ${mon} ${year}
            </div>
            <p>${data.content}</p>
          </div>
        </div>`;

          eventshtml += html;
        } else {
          let html = `<div class="timeline-item">
          <div class="timeline-img"></div>

          <div class="timeline-content timeline-card js--fadeInLeft">
            <div class="timeline-img-header">
              <div>
                <img src="${data.imageUrl}" class="img-responsive" alt=""/>
              </div>
              <h2>${data.title}</h2>
            </div>
            <div class="date">
              ${date} ${mon} ${year}
            </div>
            <p>${data.content}</p>
          </div>
        </div>`;

          eventshtml += html;
        }

        return null;
      });

      document.getElementById("events-div").innerHTML = eventshtml;

      $(function () {
        window.sr = ScrollReveal();

        if ($(window).width() < 768) {
          if ($(".timeline-content").hasClass("js--fadeInLeft")) {
            $(".timeline-content")
              .removeClass("js--fadeInLeft")
              .addClass("js--fadeInRight");
          }

          sr.reveal(".js--fadeInRight", {
            origin: "right",
            distance: "300px",
            easing: "ease-in-out",
            duration: 800,
          });
        } else {
          sr.reveal(".js--fadeInLeft", {
            origin: "left",
            distance: "300px",
            easing: "ease-in-out",
            duration: 800,
          });

          sr.reveal(".js--fadeInRight", {
            origin: "right",
            distance: "300px",
            easing: "ease-in-out",
            duration: 800,
          });
        }

        sr.reveal(".js--fadeInLeft", {
          origin: "left",
          distance: "300px",
          easing: "ease-in-out",
          duration: 800,
        });

        sr.reveal(".js--fadeInRight", {
          origin: "right",
          distance: "300px",
          easing: "ease-in-out",
          duration: 800,
        });
      });
    }
  });
