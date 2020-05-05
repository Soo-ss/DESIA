// let instaImage = document.querySelector(".KL4Bh>img").src;

// // new fullpage('#fullpage', {
// //   //options here
// //   autoScrolling: true,
// //   scrollHorizontally: true
// // });

// let dot = $("#dot ul li");
// let isHome = document.querySelector(".isHome");
// let header = document.querySelector("#headerforfix > header > nav > a > img");
// let hamburger = document.querySelector(
//   "#headerforfix > header > nav > .toggle-menu > span"
// );

// let hero = document.querySelector(".hero");
// let slider = document.querySelector(".tweenMax");
// let logo = document.querySelector(".logo");
// let heading = document.querySelector(".heading");

// let tl = new TimelineMax();

// dot.on("click", function () {
//   $("#fullpage").fullpage.moveTo($(this).index() + 1);
// });

// $("#fullpage").fullpage({
//   afterLoad: function (anchorLink, index) {
//     if (index == 1) {
//       dot.removeClass("active");
//       dot.eq(0).addClass("active");

//       $(".area1 .textWrap").addClass("show");
//       // cont.eq(0).addClass("show");
//       // $("#headerforfix").removeClass("on");
//     }
//     if (index == 2) {
//       dot.removeClass("active");
//       dot.eq(1).addClass("active");

//       $(".area2 .textWrap").addClass("show");
//       // $("#headerforfix").addClass("on");
//     }
//     if (index == 3) {
//       dot.removeClass("active");
//       dot.eq(2).addClass("active");

//       $(".area3 .textWrap").addClass("show");
//       // cont.eq(2).addClass("show");
//       // $("#headerforfix").addClass("on");
//     }
//     if (index == 4) {
//       dot.removeClass("active");
//       dot.eq(3).addClass("active");

//       $(".area4 .textWrap").addClass("show");
//       // cont.eq(3).addClass("show");
//       // $("#headerforfix").addClass("on");
//     }
//     if (index == 5) {
//       dot.removeClass("active");
//       dot.eq(4).addClass("active");

//       $(".area5 .textWrap").addClass("show");
//       // cont.eq(4).addClass("show");
//       // $("#headerforfix").addClass("on");
//     }
//     if (index == 6) {
//       dot.removeClass("active");
//       dot.eq(5).addClass("active");

//       $(".area6 .textWrap").addClass("show");
//       // cont.eq(5).addClass("show");
//       // $("#headerforfix").addClass("on");
//     }
//   },
// });

// function timelineMax() {
//   tl.fromTo(
//     hero,
//     1,
//     {
//       height: "0%",
//     },
//     {
//       height: "80%",
//       ease: Power2.easeInOut,
//     }
//   )
//     .fromTo(
//       hero,
//       1.2,
//       {
//         width: "100%",
//       },
//       {
//         width: "80%",
//         ease: Power2.easeInOut,
//       }
//     )
//     .fromTo(
//       slider,
//       1.2,
//       {
//         y: "-100%",
//       },
//       {
//         y: "0%",
//         ease: Power2.easeInOut,
//       },
//       "-=1.2"
//     );
//   // .fromTo(
//   //   logo,
//   //   0.5, {
//   //     opacity: 0,
//   //     x: 30
//   //   }, {
//   //     opacity: 1,
//   //     x: 0
//   //   },
//   //   "-=0.5"
//   // );
// }

// timelineMax();

// if (isHome) {
//   header.setAttribute("src", "/resources/images/logoWhite.png");
//   hamburger.setAttribute("class", "on");
// }
