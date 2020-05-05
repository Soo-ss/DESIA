// when using ES6 import / npm
// import ScrollTrigger from "@terwanerik/scrolltrigger";
// Create a new ScrollTrigger instance with default options
// const trigger = new ScrollTrigger(); // When not using npm, create a new instance with 'new ScrollTrigger.default()'
// Add all html elements with attribute data-trigger
// trigger.add("[data-trigger]");

// header toggle
$(".toggle-menu").click(function () {
  $(this).toggleClass("active");
  $("#menu").toggleClass("open");
});

// summer note
$(document).ready(function () {
  $("#summernote").summernote({
    height: 500, // set editor height
    minHeight: null, // set minimum height of editor
    maxHeight: null, // set maximum height of editor
    focus: true, // set focus to editable area after initializing summernote
    toolbar: [
      // [groupName, [list of button]]
      ["style", ["bold", "italic", "underline", "clear"]],
      ["font", ["strikethrough", "superscript", "subscript"]],
      ["fontsize", ["fontsize"]],
      ["color", ["color"]],
      ["para", ["ul", "ol", "paragraph"]],
      ["height", ["height"]],
    ],
    styleTags: [
      "p",
      {
        title: "Blockquote",
        tag: "blockquote",
        className: "blockquote",
        value: "blockquote",
      },
      "pre",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
    ],
    placeholder: "최대 500자 작성 가능합니다.",
  });
});

let summer = document.querySelector(".reviewBlockDesc");

if (summer) {
  $("#summernote").summernote({
    toolbar: [],
    styleTags: [
      "p",
      {
        title: "Blockquote",
        tag: "blockquote",
        className: "blockquote",
        value: "blockquote",
      },
      "pre",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
    ],
  });
}

// 썸머노트 html로 변경
// reviewDetail부분
// let descDetail = document.querySelector(".reviewDesc").innerText;
// let temp = document.createElement("div");
// temp.innerHTML = descDetail;
// let htmlObject = temp;
// document.querySelector(".reviewDesc").innerText = "";
// document.querySelector(".reviewDesc").appendChild(htmlObject);

// review부분
// let desc = document.querySelector(".desc").innerText;
// let temp2 = document.createElement('p');
// temp2.innerHTML = desc;
// let htmlObject2 = temp2;
// document.querySelector(".desc").innerText = '';
// document.querySelector(".desc").appendChild(htmlObject2);

// fix scroll trigger error
// document.addEventListener("DOMContentLoaded", function () {
//   var trigger = new ScrollTrigger();
// });

// let section = $("#wrapper>div>div>div");

// $(function () {
//   // section.eq(1).addClass("show");
// });

// $(window).scroll(function () {
//   let windowScroll = $(this).scrollTop();
//   $("#headerforfix").removeClass("on");

//   if (windowScroll >= section.eq(2).offset().top - $(window).height()) {
//     // section.eq(2).addClass("show");
//     $("#headerforfix").addClass("on");
//   }
//   if (windowScroll >= section.eq(3).offset().top - $(window).height()) {
//     // section.eq(3).addClass("show");
//   }
//   if (windowScroll >= section.eq(4).offset().top - $(window).height()) {
//     // section.eq(4).addClass("show");
//   }
//   if (windowScroll >= section.eq(5).offset().top - $(window).height()) {
//     // section.eq(5).addClass("show");
//   }
// });
