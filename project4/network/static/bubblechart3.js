document.addEventListener("DOMContentLoaded", () => {


    const data = {
        datasets: [
            {label: "Research", data: [{x: 5.5, y: 4.5, r: 54, gradCount: 6}], backgroundColor: "hsl(0, 70%, 60%)"},
            {label: "Finance", data: [{x: 8, y: 8, r: 36, gradCount: 4}], backgroundColor: "hsl(45,100%,49%)"},
            {label: "Hospitality", data: [{x: 8, y: 5, r: 36, gradCount: 4}], backgroundColor: "hsl(120, 70%, 60%)"},
            {label: "Education", data: [{x: 2, y: 2.5, r: 81, gradCount: 9}], backgroundColor: "hsl(180, 70%, 60%)"},
            {label: "Tech", data: [{x: 5, y: 2, r: 36, gradCount: 4}], backgroundColor: "hsl(240, 70%, 60%)"},
            {label: "Marketing", data: [{x: 8, y: 2, r: 63, gradCount: 7}], backgroundColor: "hsl(300, 70%, 60%)"},
            {label: "Health", data: [{x: 2.2, y: 6.5, r: 63, gradCount: 7}], backgroundColor: "hsl(348,55%,34%)"},
            {label: "NGO", data: [{x: 7, y: 6.2, r: 18, gradCount: 2}], backgroundColor: "hsl(150,76%,49%)"},
            {label: "Other", data: [{x: 5.25, y: 8, r: 99, gradCount: 11}], backgroundColor: "hsl(18,56%,55%)"},
        ],
    };

// Plugin to draw labels on bubbles
    const drawLabelsPlugin = {
        id: "drawLabels",
        afterDraw: chart => {
            const ctx = chart.ctx;
            const dynamical_font_size = isMobile ? '9.5' : '15';

            chart.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = chart.getDatasetMeta(datasetIndex);

                meta.data.forEach((element, index) => {
                    const {x, y} = element.getProps(['x', 'y'], true);
                    const point = dataset.data[index];

                    ctx.save();
                    ctx.fillStyle = "white";
                    ctx.font = `bold ${dynamical_font_size}px sans-serif`;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(`${dataset.label}`, x, y);
                    ctx.restore();
                });
            });
        }
    };

// Function to scale bubble radii based on container width
    function scaleBubbleRadii(chartWidth) {
        const scaleFactor = chartWidth / 580; // 400 = base width you designed for
        return data.datasets.map(ds => ({
            ...ds,
            data: ds.data.map(d => ({...d, r: d.r * scaleFactor}))
        }));
    }

// Get canvas and container
    const canvas = document.getElementById("industryBubbleChart");
    const container = document.querySelector(".chart-container");
    let industryChart;

    function renderChart() {
        const containerWidth = container.offsetWidth;
        const scaledData = {datasets: scaleBubbleRadii(containerWidth)};

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {display: false},
                tooltip: {
                    yAlign: "bottom",
                    xAlign: "center",
                    callbacks: {
                        label: ctx => ` ${ctx.raw.gradCount} grads`,
                    },
                },
            }, // no Chart.js legend
            scales: {
                x: {display: false, min: 0, max: 10},
                y: {display: false, min: 0, max: 10}
            }
        };

        // Dynamic canvas height based on container width
        canvas.height = containerWidth * 0.9; // 0.8 = aspect ratio for bubbles, adjust as needed

        if (industryChart) industryChart.destroy();
        industryChart = new Chart(canvas.getContext("2d"), {
            type: "bubble",
            data: scaledData,
            options,
            plugins: [drawLabelsPlugin]
        });
    }

// Initial render
    renderChart();

// Re-render on window resize
    window.addEventListener("resize", renderChart);

})