import "chartist/dist/index.css";
import { BarChart } from "chartist";

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

    console.log(sixCourses, fivePrograms);

    const courses = sixCourses.map((item) => item.name).reverse();
    const series1 = sixCourses
      .map((item) => parseInt(item.applicantsTotal))
      .reverse();

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

    new BarChart(".ct-chart", courseData, courseOptions).on(
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
  } catch (error) {
    console.error(`Något gick fel: ${error}`);
  }
}

fetchAndProcessData();
