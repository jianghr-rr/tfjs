
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
export function getData(numSamples) {
    let points = [];
  
    function genGauss(cx, cy, label) {
      for (let i = 0; i < numSamples / 2; i++) {
        let x = normalRandom(cx);
        let y = normalRandom(cy);
        points.push({ x, y, label });
      }
    }
  
    genGauss(2, 2, 0);
    genGauss(-2, -2, 0);
    genGauss(-2, 2, 1);
    genGauss(2, -2, 1);
    return points;
  }
  
  /**
   * Samples from a normal distribution. Uses the seedrandom library as the
   * random generator.
   *
   * @param mean The mean. Default is 0.
   * @param variance The variance. Default is 1.
   */
  function normalRandom(mean = 0, variance = 1) {
    let v1, v2, s;
    do {
      v1 = 2 * Math.random() - 1;
      v2 = 2 * Math.random() - 1;
      s = v1 * v1 + v2 * v2;
    } while (s > 1);
  
    let result = Math.sqrt(-2 * Math.log(s) / s) * v1;
    return mean + Math.sqrt(variance) * result;
  }