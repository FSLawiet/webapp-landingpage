const client = axios.create({
  baseURL: "https://godev-webapp-backend.herokuapp.com/api/results",
  timeout: 1000,
});

function tabela_resultados() {
  client.get().then((res) => {
    let table_body = document.querySelector("#table_body");

    let caption = document.querySelector("#results-table-caption");
    let currentDate = new Date();
    console.log(currentDate.getUTCMonth());
    caption.textContent = `Dados coletados em ${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}, às ${currentDate.getHours()}:${currentDate.getMinutes()}.`;

    for (student of res.data) {
      let row = document.createElement("tr");
      let name = document.createElement("td");
      name.textContent = student.name;
      name.setAttribute("rowspan", student.results.length.toString());
      row.appendChild(name);
      for (let i = 0; i < student.results.length; i++) {
        let quarter = document.createElement("td");
        quarter.textContent = `${student.results[i].quarter}º Bimestre`;

        let grade1 = document.createElement("td");
        grade1.textContent = student.results[i].grades[0];

        let grade2 = document.createElement("td");
        grade2.textContent = student.results[i].grades[1];

        let grade3 = document.createElement("td");
        grade3.textContent = student.results[i].grades[2];

        let average = document.createElement("td");
        average.textContent = student.results[i].average;

        let date1 = document.createElement("td");
        date1.textContent = new Date(student.results[i].time[0]).toLocaleString(
          "pt-BR"
        );

        let date2 = document.createElement("td");
        date2.textContent = new Date(student.results[i].time[1]).toLocaleString(
          "pt-BR"
        );

        let time_delta = document.createElement("td");
        time_delta.textContent = `${student.results[i].time_delta} minutos`;

        if (i === 0) {
          row.appendChild(quarter);
          row.appendChild(grade1);
          row.appendChild(grade2);
          row.appendChild(grade3);
          row.appendChild(average);
          row.appendChild(date1);
          row.appendChild(date2);
          row.appendChild(time_delta);

          table_body.appendChild(row);
        } else {
          let new_row = document.createElement("tr");
          new_row.appendChild(quarter);
          new_row.appendChild(grade1);
          new_row.appendChild(grade2);
          new_row.appendChild(grade3);
          new_row.appendChild(average);
          new_row.appendChild(date1);
          new_row.appendChild(date2);
          new_row.appendChild(time_delta);

          table_body.appendChild(new_row);
        }
      }
    }
  });
}

function scatterplot() {
  //TODO
}

$(document).ready(function () {
  tabela_resultados();
  scatterplot();
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
