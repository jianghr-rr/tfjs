'use client'
import { useEffect, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from '@tensorflow/tfjs-vis';

export default function Page() {

  const runDemo = useCallback(async () => {
    // 训练集
    const heights = [150, 160, 170];
    const weights = [40, 50, 60];

    // 归一化
    // 身高和体重都设置为0到1之间
    const inputs = tf.tensor(heights).sub(150).div(20);
    const labels = tf.tensor(weights).sub(40).div(20);

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ loss: tf.losses.meanSquaredError, optimizer: tf.train.sgd(0.1) });
    await model.fit(inputs, labels, {
      batchSize: 3,
      epochs: 200,
      callbacks: tfvis.show.fitCallbacks(
          { name: '训练过程' },
          ['loss']
      )
    });
    
      const output = model.predict(tf.tensor([180]).sub(150).div(20));
      alert(`如果身高为 180cm，那么预测体重为 ${output.mul(20).add(40).dataSync()[0]}kg`);
  }, []);

  useEffect(() => {
    runDemo();
  }, []);

  return <h1>Hello, tfjs!</h1>
}