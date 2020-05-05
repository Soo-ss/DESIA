
const clickBtn = document.querySelector(".reviewBlock > a");

// db변경x -> get , db변경o -> post
const registerView = () => {
    const reviewID = window.location.href.split("/reviews/")[1];
    fetch(`/api/${reviewID}/view`, {
        method: "POST"
    });
};

if(clickBtn){
    registerView();
}