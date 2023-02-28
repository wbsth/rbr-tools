enum EUnit {
  KMH = "Km/h",
  RPM = "RPM",
  KELVIN = "°K",
  CELCIUS = "°C",
  NONE = "-",
  METERS = "m",
  SECONDS = "s",
}

interface IAvailableChart {
  label: string;
  fileColumnName: string;
  unit: EUnit;
}

interface IAvailableAxisType {
  label: string;
  unit: EUnit;
  fileColumnName: string;
}

export const availableCharts: IAvailableChart[] = [
  {
    label: "Speed",
    fileColumnName: "speed",
    unit: EUnit.KMH,
  },
  {
    label: "Speed",
    fileColumnName: "speed",
    unit: EUnit.KMH,
  },
  {
    label: "Engine RPM",
    fileColumnName: "engineRotation",
    unit: EUnit.RPM,
  },
  {
    label: "Steering",
    fileColumnName: "steering",
    unit: EUnit.NONE,
  },
  {
    label: "Throttle",
    fileColumnName: "throttle",
    unit: EUnit.NONE,
  },
  {
    label: "Brake",
    fileColumnName: "brake",
    unit: EUnit.NONE,
  },
  {
    label: "Clutch",
    fileColumnName: "clutch",
    unit: EUnit.NONE,
  },
  {
    label: "Brake pressure",
    fileColumnName: "footbrakePressure",
    unit: EUnit.NONE,
  },
  {
    label: "Handbrake pressure",
    fileColumnName: "handbrakePressure",
    unit: EUnit.NONE,
  },
  {
    label: "Radiator Coolant Temperature",
    fileColumnName: "radiatorCoolantHeatState.temperature",
    unit: EUnit.KELVIN,
  },
  {
    label: "Engine Coolant Temperature",
    fileColumnName: "engineCoolantHeatState.temperature",
    unit: EUnit.KELVIN,
  },
  {
    label: "Engine Temperature",
    fileColumnName: "engineTemperature",
    unit: EUnit.KELVIN,
  },
  {
    label: "LF Tire Temperature",
    fileColumnName: "LF.temperature",
    unit: EUnit.KELVIN,
  },
  {
    label: "LF Tire Pressure",
    fileColumnName: "LF.pressure",
    unit: EUnit.NONE,
  },
  {
    label: "RF Tire Temperature",
    fileColumnName: "RF.temperature",
    unit: EUnit.KELVIN,
  },
  {
    label: "RF Tire Pressure",
    fileColumnName: "RF.pressure",
    unit: EUnit.NONE,
  },
  {
    label: "LB Tire Temperature",
    fileColumnName: "LB.temperature",
    unit: EUnit.KELVIN,
  },
  {
    label: "LB Tire Pressure",
    fileColumnName: "LB.pressure",
    unit: EUnit.NONE,
  },
  {
    label: "RB Tire Temperature",
    fileColumnName: "RB.temperature",
    unit: EUnit.KELVIN,
  },
  {
    label: "RB Tire Pressure",
    fileColumnName: "RB.pressure",
    unit: EUnit.NONE,
  },
];

export const availableXAxisTypes: IAvailableAxisType[] = [
  {
    fileColumnName: "driveLineLocation",
    unit: EUnit.METERS,
    label: "Driveline Distance",
  },
  {
    fileColumnName: "raceTime",
    unit: EUnit.SECONDS,
    label: "Time",
  },
];
