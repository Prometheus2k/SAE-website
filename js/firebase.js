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

// Announcement
var announcementdata;
var announcementhtml = "";
firebase
  .database()
  .ref("/announcement/")
  .on("value", (snapshot) => {
    let data = snapshot.val();
    if (data) {
      announcementdata = Object.values(data);

      announcementhtml = "";
      announcementdata.map((data) => {
        let html = `<marquee width="100%" direction="left">
          <p class="notif-p">${data.message}</p>
        </marquee>
        <a href="${data.link}" target="_blank" rel="noreferrer">
          <button class="notif-btn button2">Register</button>
        </a>`;

        announcementhtml += html;

        return null;
      });

      document.getElementById("announcement").innerHTML = announcementhtml;
    }
  });

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
        let html = `<li>
          <div class="portfolio-item">
            <img src="${data.imageUrl}" class="img-responsive2" alt="" style="height:320px; width:400px;" />
          </div>
        </li>`;
        galleryhtml += html;

        return null;
      });

      document.getElementById("portfolio-list").innerHTML = galleryhtml;
    }
  });

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
        let html = `<li class="achieve-li">
          <div class="portfolio-item col-md-4">
            <img src="${data.imageUrl}" class="achieve-img" alt="" style="height:250px; width:313px;" />
            <div class="desc">
              <h4 class="achieve-desc">${data.title}</h4>
              <p class="achieve-p">${data.content}</p>
            </div>
          </div>
        </li>`;
        achievementshtml += html;

        return null;
      });

      var x = document.getElementsByClassName("portfolio-list-ach");
      x[0].innerHTML = achievementshtml;
    }
  });

// News
var newsdata;
var newshtml = "";
firebase
  .database()
  .ref("/news/")
  .on("value", (snapshot) => {
    let data = snapshot.val();
    if (data) {
      let sortedData = Object.fromEntries(
        Object.entries(data).sort(
          (a, b) => new Date(b[1].date) - new Date(a[1].date)
        )
      );
      newsdata = Object.values(sortedData);

      newshtml = "";
      newsdata.map((data) => {
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

        let html = `<div class="col-md-12">
          <div class="latest-post">
            <img src="${data.imageUrl}" class="img-responsive" alt="" style="height:320px; width:345px;" />
            <h4><a href="#">${data.title}</a></h4>
            <div class="post-details">
              <span class="date"><strong>${date}</strong> <br>${mon} , ${year}</span>
            </div>
            <p>${data.content}</p>

          </div>
        </div>`;
        newshtml += html;

        return null;
      });

      $(".latest-news").data("owlCarousel").destroy();

      document.getElementById("news-div").innerHTML = newshtml;

      $(".latest-news").owlCarousel({
        pagination: true,
        navigation: false,
        slideSpeed: 2500,
        stopOnHover: true,
        autoPlay: 4000,
        singleItem: false,
        itemsMobile: [550, 1],
        itemsDesktopSmall: [991, 2],
        items: 3,
        transitionStyle: "fade",
        navigationText: [
          '<i class="fa fa-chevron-left"></i>',
          '<i class="fa fa-chevron-right"></i>',
        ],
      });
    }
  });

// Contact info
var contactdata;
var contacthtml = "";
firebase
  .database()
  .ref("/contact/")
  .on("value", (snapshot) => {
    let data = snapshot.val();
    if (data) {
      contactdata = Object.values(data);

      contacthtml = "";
      contactdata.map((data) => {
        let html = `<tr>
          <td><strong>${data.name}</strong></td>
          <td>&nbsp;:&nbsp;${data.phno}</td>
        </tr>`;
        contacthtml += html;

        return null;
      });

      document.getElementById("contacts-table").innerHTML = contacthtml;
    }
  });
