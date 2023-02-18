export default {
    charts: [
        {
            id: 1,
            label: "Speed",
            columnName: "speed",
            unit: "km/h",
        },
        {
            id: 2,
            label: "Engine RPM",
            columnName: "engineRotation",
            unit: "rpm"
        }
    ],
    xAxis:[
        {
            id: 0,
            xAxis: "driveLineLocation",
            xUnit: "m",
            xLabel: "Driveline Distance",
        },
        {
            id: 1,
            xAxis: "raceTime",
            xUnit: "s",
            xLabel: "Time",
        }
    ]
  };