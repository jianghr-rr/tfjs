'use client'
import { useEffect, useCallback, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import { IMAGENET_CLASSES } from './class';
import { file2img } from './util';

export default function Page() {

    const predictRef = useRef<Function | null>(null);

    const runDemo = useCallback(async () => {
        const model = await tf.loadLayersModel('/static/mobilenet/web_model/model.json');

        predictRef.current = async (file: File) => {
            const img = await file2img(file);
            document.body.appendChild(img);
            const pred = tf.tidy(() => {
                const input = tf.browser.fromPixels(img)
                    .toFloat()
                    .sub(255 / 2)
                    .div(255 / 2)
                    .reshape([1, 224, 224, 3]);
                return model.predict(input);
            });

            const index = pred.argMax(1).dataSync()[0];
            alert(`预测结果：${IMAGENET_CLASSES[index]}`);
        };
    }, []);

    useEffect(() => {
        runDemo();
    }, []);

    return <h1>
        modilenet

        <input type="file" onChange={(e) => { if (e.target.files && e.target.files[0]) predictRef.current?.(e.target.files[0]); }} />
    </h1>
}