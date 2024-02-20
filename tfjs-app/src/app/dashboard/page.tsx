'use client'
import { useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from '@tensorflow/tfjs-vis';

export default function Page() {

  const runDemo = async () => {
    // 训练集
    const xs = [1, 2, 3, 4];
    const ys = [1, 3, 5, 7];

    tfvis.render.scatterplot(
      { name: '线性回归训练集' },
      { values: xs.map((x, i) => ({ x, y: ys[i] })) },
      { xAxisDomain: [0, 5], yAxisDomain: [0, 8] }
    );

    // 连续的模型，这一层的输入是上一层的输出
    const model = tf.sequential();

    // 给模型添加层
    // dense： 全联接层
    // units: 神经元的个数
    // inputShape：输入训练集的形状 1维的
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // 对模型设置损失函数
    // meanSquaredError （MSE）均方误差
    // optimizer优化器： sgd， 0.1为学习率
    model.compile({ loss: tf.losses.meanSquaredError, optimizer: tf.train.sgd(0.1) });

    // 训练模型
    const inputs = tf.tensor(xs);
    const labels = tf.tensor(ys);

    await model.fit(inputs, labels, {
      // 每次模型要去学习的样本数量
      batchSize: 4,
      // 迭代的次数
      epochs: 100,
      // 可视化训练过程
      callbacks: tfvis.show.fitCallbacks(
        { name: '训练过程' },
        ['loss']
      )
    });

    // predict输入一个tensor（和训练结构数据一样），返回一个预测信息（输出也是tensor）
    const output = model.predict(tf.tensor([5]));
    console.log(`如果 x 为 5，那么预测 y 为 ${output.dataSync()[0]}`);
  };

  useEffect(() => {
    runDemo();
  }, []);

  return <h1>Hello, tfjs!</h1>
}