export class TyrePressure {
    constructor(
        public frontLeft: number,
        public frontRight: number,
        public rearLeft: number,
        public rearRight: number,
        public unit: string = "Pa",
    ) {}

    public static pressureInKpa(pressure: number): number {
        return pressure / 1000;
    }

}