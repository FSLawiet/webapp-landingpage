const client = axios.create({
  baseURL: "https://godev-webapp-backend.herokuapp.com/api/results",
  timeout: 1000,
});

function listar() {
  client.get().then((res) => {
    alert(res.data);
  });
}

$(document).ready(function () {
  listar();
  $("#name").change(function () {
    if ($("#name option:nth(0)").is(":selected")) {
      $("#new_name").show();
    } else {
      $("#new_name").hide();
    }
  });
});

// Smooth Scrolling
$("#navbar a, .btn").on("click", function (event) {
  if (this.hash !== "") {
    event.preventDefault();

    const hash = this.hash;

    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top - 100,
      },
      800
    );
  }
});

// Sticky menu background
window.addEventListener("scroll", function () {
  if (window.scrollY > 150) {
    document.querySelector("#navbar").style.opacity = 0.9;
  } else {
    document.querySelector("#navbar").style.opacity = 1;
  }
});
