import "chartist/dist/index.css";
import { BarChart, PieChart } from "chartist";

async function fetchAndProcessData() {
  try {
    const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
    if (!response.ok) {
      throw new Error(`Något gick fel: ${response.status}`);
    }
    const data = await response.json();

    const fetchCourseData = data.filter((item) => item.type === "Kurs");
    const sortCourseData = fetchCourseData.sort(
      (a, b) => b.applicantsTotal - a.applicantsTotal
    );

    const fetchProgramData = data.filter((item) => item.type === "Program");
    const sortProgramData = fetchProgramData.sort(
      (a, b) => b.applicantsTotal - a.applicantsTotal
    );

    const sixCourses = sortCourseData.slice(0, 6);
    const fivePrograms = sortProgramData.slice(0, 5);

    const courses = sixCourses.map((item) => item.name).reverse();
    const series1 = sixCourses
      .map((item) => parseInt(item.applicantsTotal))
      .reverse();
    const series2 = fivePrograms.map((item) => parseInt(item.applicantsTotal));

    let courseData = {
      labels: courses,
      series: [series1],
    };

    let courseOptions = {
      seriesBarDistance: 10,
      reverseData: false,
      horizontalBars: true,
      chartPadding: {
        right: 28,
      },
      axisY: {
        offset: 100,
      },
      axisX: {
        high: 1600,
        low: 400,
        scaleMinSpace: 75,
        onlyInteger: true,
      },
    };

    new BarChart("#courses-chart", courseData, courseOptions).on(
      "draw",
      function (context) {
        if (context.type === "bar") {
          let yMid = (context.y2 - context.y1) / 2 + context.y1;
          context.group
            .elem(
              "text",
              {
                x: context.x1 + (context.x2 - context.x1) / 2,
                y: yMid,
                style: "text-anchor: middle; fill: hsl(218, 100%, 2%);",
              },
              "ct-label"
            )
            .text(context.series[context.index]);
        }
      }
    );

    const chartColors = [
      "hsl(359, 98%, 43%)",
      "hsl(4, 84%, 63%)",
      "hsl(45, 89%, 60%)",
      "hsl(34, 95%, 42%)",
      "hsl(345, 6%, 25%)",
    ];

    const container = document.getElementById("programs-container");

    let html = fivePrograms
      .map((program, index) => {
        return `
    <div class='program-item'>
      <div class='box' style="background-color: ${chartColors[index]};"></div>
      <div>${program.name}</div>
    </div>
  `;
      })
      .join("");

    container.innerHTML = html;

    const programData = {
      series: series2,
    };

    new PieChart("#program-chart", programData, {
      labelInterpolationFnc: (value) => value,
    });
  } catch (error) {
    console.error(`Något gick fel: ${error}`);
  }
}

fetchAndProcessData();
