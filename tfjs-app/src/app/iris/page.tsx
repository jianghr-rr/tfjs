'use client'
import { useEffect, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from '@tensorflow/tfjs-vis';
import { getIrisData, IRIS_CLASSES } from './data';

export default function Page() {

    const runDemo = useCallback(async () => {
        const [xTrain, yTrain, xTest, yTest] = getIrisData(0.15);

        // 多分类问题
        // 定义神经网络带有softmax的多层神经网络
        /**
         * 1. 初始化一个神经网络
         * 2. 为神经网络添加两个层
         * 3. 设置神经元和激活函数， 设置inputShapes
         */
        const model = tf.sequential();
        model.add(tf.layers.dense({
            inputShape: [xTrain.shape[1] || null],
            units: 10,
            activation: 'sigmoid'
        }));

        model.add(tf.layers.dense({
            units: 3,
            activation: 'softmax'
        }));

        // 交叉熵损失函数 及 准确度度量
        model.compile({
            loss: 'categoricalCrossentropy',
            optimizer: tf.train.adam(0.1),
            metrics: ['accuracy']
        });
        // 训练模型
        await model.fit(xTrain, yTrain, {
            epochs: 100,
            validationData: [xTest, yTest], // 验证数据
            callbacks: tfvis.show.fitCallbacks(
                { name: '训练效果' },
                ['loss', 'val_loss', 'acc', 'val_acc'],
                { callbacks: ['onEpochEnd'] }
            )
        });
        const input = tf.tensor([[
            4.8, 3.4, 1.6, 0.2
        ]]);
        const pred = model.predict(input);
        alert(`预测结果：${IRIS_CLASSES[pred.argMax(1).dataSync(0)]}`);

    }, []);

    useEffect(() => {
        runDemo();
    }, []);

    return <h1>iris</h1>
}