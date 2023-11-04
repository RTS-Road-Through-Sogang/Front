const PieChart = () => (
  <div style={{ margin: "0", width: "100%" }}>
    <div style={{ width: "9em", height: "em", margin: "0 auto" }}>
      <svg viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="#FFAFAF"
          strokeWidth="40"
        />
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="#F5F5F5"
          strokeWidth="40"
          strokeDasharray={`${2 * Math.PI * 70 * (104 / 130)} ${
            2 * Math.PI * 70 * (130 - 104 / 130)
          }`}
          strokeDashoffset={2 * Math.PI * 70 * (130 - 104 / 130)}
        />
      </svg>
    </div>
  </div>
);

export default PieChart;
