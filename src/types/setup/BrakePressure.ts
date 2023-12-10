export class BrakePressure {
    constructor(
        public maxPressureFront: number,
        public maxPressureRear: number,
        public unit: string = "Pa",
    ) {}

    public static pressureInKpa(pressure: number): number {
        return pressure / 1000;
    }

}