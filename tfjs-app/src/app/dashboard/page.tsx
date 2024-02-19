'use client'
import { useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from '@tensorflow/tfjs-vis';

export default function Page() {
  useEffect(() => {
    const xs = [1, 2, 3, 4];
    const ys = [1, 3, 5, 7];

    tfvis.render.scatterplot(
      { name: '线性回归训练集' },
      { values: xs.map((x, i) => ({ x, y: ys[i] })) },
      { xAxisDomain: [0, 5], yAxisDomain: [0, 8] }
    );
  }, []);

  return <h1>Hello, Dashboard Page!</h1>
}