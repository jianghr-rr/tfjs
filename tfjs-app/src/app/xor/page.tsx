'use client'
import { useEffect, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from '@tensorflow/tfjs-vis';
import { getData } from './data.js';

export default function Page() {

  const runDemo = useCallback(async () => {
    const data = getData(400);
        tfvis.render.scatterplot(
            { name: 'XOR 训练数据' },
            {
                values: [
                    data.filter(p => p.label === 1),
                    data.filter(p => p.label === 0),
                ]
            }
        );
        
        // 多层神经网络并用激活函数
        // 初始化模型
        const model = tf.sequential();
        // 添加两个层，一个隐藏层，一个输出层
        // 隐藏层
        model.add(tf.layers.dense({
            units: 4,
            inputShape: [2], // 长度为2的一纬数组
            activation: 'relu'
        }));
        // 输出层
        model.add(tf.layers.dense({
            units: 1,
            activation: 'sigmoid'
        }));
        // 训练模型
        model.compile({
            loss: tf.losses.logLoss,
            optimizer: tf.train.adam(0.1)
        });
      
        const inputs = tf.tensor(data.map(p => [p.x, p.y]));
        const labels = tf.tensor(data.map(p => p.label));
    
        await model.fit(inputs, labels, {
            epochs: 10,
            callbacks: tfvis.show.fitCallbacks(
                { name: '训练效果' },
                ['loss']
            )
        });

        const pred = model.predict(tf.tensor([[-2, 2]]));
        alert(`预测结果：${pred.dataSync()[0]}`);
  }, []);

  useEffect(() => {
    runDemo();
  }, []);

  return <h1>XOR</h1>
}