'use client'
import { useEffect, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from '@tensorflow/tfjs-vis';
import { getData } from './data.js';

export default function Page() {

  const runDemo = useCallback(async () => {
    const data = getData(400);

    tfvis.render.scatterplot(
        { name: '逻辑回归训练数据' },
        {
            values: [
                data.filter(p => p.label === 1),
                data.filter(p => p.label === 0),
            ]
        }
    );

    const model = tf.sequential();
    model.add(tf.layers.dense({
        units: 1,
        inputShape: [2],
        activation: 'sigmoid'
    }));
    // 损失函数 logLoss，会有无穷大和无穷小
    model.compile({
        loss: tf.losses.logLoss,
        optimizer: tf.train.adam(0.1)
    });

    const inputs = tf.tensor(data.map(p => [p.x, p.y]));
    const labels = tf.tensor(data.map(p => p.label));

    await model.fit(inputs, labels, {
        batchSize: 40,
        epochs: 20,
        callbacks: tfvis.show.fitCallbacks(
            { name: '训练效果' },
            ['loss']
        )
    });

    const pred = model.predict(tf.tensor([[2, 3]]));
    alert(`预测结果：${pred.dataSync()[0]}`);
  }, []);

  useEffect(() => {
    runDemo();
  }, []);

  return <h1>逻辑回归</h1>
}