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
        },
        {
            id: 3,
            label: "Steering",
            columnName: "steering",
            unit: "-"
        },
        {
            id: 4,
            label: "Throttle",
            columnName: "throttle",
            unit: "-"
        },
        {
            id: 5,
            label: "Brake",
            columnName: "brake",
            unit: "-"
        },
        {
            id: 6,
            label: "Clutch",
            columnName: "clutch",
            unit: "-"
        },
        {
            id: 7,
            label: "Brake pressure",
            columnName: "footbrakePressure",
            unit: "TBD"
        },
        {
            id: 8,
            label: "Handbrake pressure",
            columnName: "handbrakePressure",
            unit: "TBD"
        },
        {
            id: 9,
            label: "Radiator Coolant Temperature",
            columnName: "radiatorCoolantHeatState.temperature",
            unit: "K"
        },
        {
            id: 10,
            label: "Engine Coolant Temperature",
            columnName: "engineCoolantHeatState.temperature",
            unit: "K"
        },
        {
            id: 11,
            label: "Engine Temperature",
            columnName: "engineTemperature",
            unit: "K"
        },
        {
            id: 12,
            label: "LF Tire Temperature",
            columnName: "LF.temperature",
            unit: "K"
        },
        {
            id: 13,
            label: "LF Tire Pressure",
            columnName: "LF.pressure",
            unit: "-"
        },
        {
            id: 14,
            label: "RF Tire Temperature",
            columnName: "RF.temperature",
            unit: "K"
        },
        {
            id: 15,
            label: "RF Tire Pressure",
            columnName: "RF.pressure",
            unit: "-"
        },
        {
            id: 16,
            label: "LB Tire Temperature",
            columnName: "LB.temperature",
            unit: "K"
        },
        {
            id: 17,
            label: "LB Tire Pressure",
            columnName: "LB.pressure",
            unit: "-"
        },
        {
            id: 18,
            label: "RB Tire Temperature",
            columnName: "RB.temperature",
            unit: "K"
        },
        {
            id: 19,
            label: "RB Tire Pressure",
            columnName: "RB.pressure",
            unit: "-"
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