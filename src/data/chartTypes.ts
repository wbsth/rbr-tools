enum EUnit {
  KMH = "Km/h",
  RPM = "RPM",
  KELVIN = "°K",
  CELCIUS = "°C",
  NONE = "-",
  METERS = "m",
  SECONDS = "s",
}

// INTERFACES

export interface IAvailableChart {
  label: string;
  fileColumnName: keyof ITelemetryRawData;
  unit: EUnit;
}

export interface IAvailableAxisType {
  label: string;
  fileColumnName: keyof ITelemetryRawData;
  unit: EUnit;
}

export interface ITelemetryRawData {
  totalSteps?: string;
  progress?: string;
  raceTime?: string;
  speed?: string;
  engineRotation?: string;
  gear?: string;
  driveLineLocation?: string;
  travelDistance?: string;
  distanceToEnd?: string;
  stage?: string;
  car?: string;
  steering?: string;
  throttle?: string;
  brake?: string;
  handBrake?: string;
  clutch?: string;
  footbrakePressure?: string;
  handbrakePressure?: string;
  "radiatorCoolantHeatState.temperature"?: string;
  "engineCoolantHeatState.temperature"?: string;
  engineTemperature?: string;
  position?: string;
  vecRelativeLinearVelocity?: string;
  vecRelativeAngularVelocity?: string;
  vecRelativeLinearAcceleration?: string;
  vecRelativeAngularAcceleration?: string;
  vecLinearVelocityCar?: string;
  vecAngularVelocityCar?: string;
  vecLinearAccelerationCar?: string;
  vecAngularAccelerationCar?: string;
  roll?: string;
  pitch?: string;
  yaw?: string;
  vecAvgLinearAccelerationCar?: string;
  vecAvgAngularAccelerationCar?: string;
  "LF.brakeDiskLayerTemp"?: string;
  "LF.brakeDiskTemp"?: string;
  "LF.brakeWear"?: string;
  "LF.deflection"?: string;
  "LF.deflectionVelocity"?: string;
  "LF.temperature"?: string;
  "LF.pressure"?: string;
  "LF.segmentData[0].temperature"?: string;
  "LF.segmentData[1].temperature"?: string;
  "LF.segmentData[2].temperature"?: string;
  "LF.segmentData[3].temperature"?: string;
  "LF.segmentData[4].temperature"?: string;
  "LF.segmentData[5].temperature"?: string;
  "LF.segmentData[6].temperature"?: string;
  "LF.segmentData[7].temperature"?: string;
  "LF.treadTemperature"?: string;
  "LF.tyreTemperature"?: string;
  "LF.currentTyreSegment"?: string;
  "LF.rollbarForce"?: string;
  "LF.springForce"?: string;
  "LF.dampingForce"?: string;
  "LF.strutForce"?: string;
  "LF.helperSpringActive"?: string;
  "LF.wear[0]"?: string;
  "LF.wear[1]"?: string;
  "LF.wear[2]"?: string;
  "LF.wear[3]"?: string;
  "LF.wear[4]"?: string;
  "LF.wear[5]"?: string;
  "LF.wear[6]"?: string;
  "LF.wear[7]"?: string;
  "RF.brakeDiskLayerTemp"?: string;
  "RF.brakeDiskTemp"?: string;
  "RF.brakeWear"?: string;
  "RF.deflection"?: string;
  "RF.deflectionVelocity"?: string;
  "RF.temperature"?: string;
  "RF.pressure"?: string;
  "RF.segmentData[0].temperature"?: string;
  "RF.segmentData[1].temperature"?: string;
  "RF.segmentData[2].temperature"?: string;
  "RF.segmentData[3].temperature"?: string;
  "RF.segmentData[4].temperature"?: string;
  "RF.segmentData[5].temperature"?: string;
  "RF.segmentData[6].temperature"?: string;
  "RF.segmentData[7].temperature"?: string;
  "RF.treadTemperature"?: string;
  "RF.tyreTemperature"?: string;
  "RF.currentTyreSegment"?: string;
  "RF.rollbarForce"?: string;
  "RF.springForce"?: string;
  "RF.dampingForce"?: string;
  "RF.strutForce"?: string;
  "RF.helperSpringActive"?: string;
  "RF.wear[0]"?: string;
  "RF.wear[1]"?: string;
  "RF.wear[2]"?: string;
  "RF.wear[3]"?: string;
  "RF.wear[4]"?: string;
  "RF.wear[5]"?: string;
  "RF.wear[6]"?: string;
  "RF.wear[7]"?: string;
  "LB.brakeDiskLayerTemp"?: string;
  "LB.brakeDiskTemp"?: string;
  "LB.brakeWear"?: string;
  "LB.deflection"?: string;
  "LB.deflectionVelocity"?: string;
  "LB.temperature"?: string;
  "LB.pressure"?: string;
  "LB.segmentData[0].temperature"?: string;
  "LB.segmentData[1].temperature"?: string;
  "LB.segmentData[2].temperature"?: string;
  "LB.segmentData[3].temperature"?: string;
  "LB.segmentData[4].temperature"?: string;
  "LB.segmentData[5].temperature"?: string;
  "LB.segmentData[6].temperature"?: string;
  "LB.segmentData[7].temperature"?: string;
  "LB.treadTemperature"?: string;
  "LB.tyreTemperature"?: string;
  "LB.currentTyreSegment"?: string;
  "LB.rollbarForce"?: string;
  "LB.springForce"?: string;
  "LB.dampingForce"?: string;
  "LB.strutForce"?: string;
  "LB.helperSpringActive"?: string;
  "LB.wear[0]"?: string;
  "LB.wear[1]"?: string;
  "LB.wear[2]"?: string;
  "LB.wear[3]"?: string;
  "LB.wear[4]"?: string;
  "LB.wear[5]"?: string;
  "LB.wear[6]"?: string;
  "LB.wear[7]"?: string;
  "RB.brakeDiskLayerTemp"?: string;
  "RB.brakeDiskTemp"?: string;
  "RB.brakeWear"?: string;
  "RB.deflection"?: string;
  "RB.deflectionVelocity"?: string;
  "RB.temperature"?: string;
  "RB.pressure"?: string;
  "RB.segmentData[0].temperature"?: string;
  "RB.segmentData[1].temperature"?: string;
  "RB.segmentData[2].temperature"?: string;
  "RB.segmentData[3].temperature"?: string;
  "RB.segmentData[4].temperature"?: string;
  "RB.segmentData[5].temperature"?: string;
  "RB.segmentData[6].temperature"?: string;
  "RB.segmentData[7].temperature"?: string;
  "RB.treadTemperature"?: string;
  "RB.tyreTemperature"?: string;
  "RB.currentTyreSegment"?: string;
  "RB.rollbarForce"?: string;
  "RB.springForce"?: string;
  "RB.dampingForce"?: string;
  "RB.strutForce"?: string;
  "RB.helperSpringActive"?: string;
  "RB.wear[0]"?: string;
  "RB.wear[1]"?: string;
  "RB.wear[2]"?: string;
  "RB.wear[3]"?: string;
  "RB.wear[4]"?: string;
  "RB.wear[5]"?: string;
  "RB.wear[6]"?: string;
  "RB.wear[7]"?: string;
}

export const availableCharts: IAvailableChart[] = [
  {
    label: "Speed",
    fileColumnName: "speed",
    unit: EUnit.KMH,
  },
  // {
  //   label: "Speed",
  //   fileColumnName: "speed",
  //   unit: EUnit.KMH,
  // },
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
