import React from "react";
import { PolarArea } from "react-chartjs-2";

const data = {
  datasets: [
    {
      data: [11, 16, 7, 3, 14],
      backgroundColor: ["#8dace7", "#4BC0C0", "#ef869e", "#E7E9ED", "#71deb9"],
      label: "My dataset", // for legend
    },
  ],
  labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
};

class PolarExample extends React.Component {
  render() {
    return (
      <div>
        <PolarArea data={data} width={667} height={270} options={{ maintainAspectRatio: false }}/>
      </div>
    );
  }
}

export default PolarExample;
