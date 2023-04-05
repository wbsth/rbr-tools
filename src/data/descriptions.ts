interface IText {
  title: string;
  description: string;
}

export const TelemetryTips: IText[] = [
  {
    title: "How can I generate telemetry files?",
    description:
      'First, turn on telemetry recording using RSF Launcher app (turn on Advanced options, then check "Record racing telemetry data in a file"). Generated files will be saved in Plugins/NGP/telemetry folder',
  },
  {
    title: "How to zoom in graph?",
    description:
      "Hold down left mouse button, then select area you want to zoom in",
  },
];
