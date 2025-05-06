
function lerp( a : number, b : number, alpha : number ) {
    return a + alpha * (b - a)
}

//work in progress code, don't currently know new curve or fomula
function interpolateCurve(curve: string | any[], accuracy: number) {
  // Clamp accuracy between 0 and 1
  accuracy = Math.max(0.0, Math.min(1.0, accuracy));

  for (let i = 0; i < curve.length - 1; i++) {
    const [x1, y1] = curve[i];
    const [x2, y2] = curve[i + 1];

    if (x2 <= accuracy && accuracy <= x1) {
      // Linear interpolation
      const alpha = (accuracy - x2) / (x1 - x2)
      let value = lerp(y2, y1, alpha)
      //console.log(`ranges : ${x2} ${accuracy} ${x1}`)
      //console.log(`converted values : ${y2} ? ${y1}`)
      //console.log(`alpha : ${alpha}`)
      //console.log(`final : ${value}`)
      return value
    }
  }

  return 0.0; // fallback, should not be hit due to clamping
}

export function calculatePP(star_rating : number, accuracy : number) {
    const curve = [
        [1, 5.367394282890631],
        [0.9995, 5.019543595874787],
        [0.999, 4.715470646416203],
        [0.99825, 4.325027383589547],
        [0.9975, 3.996793606763322],
        [0.99625, 3.5526145337555373],
        [0.995, 3.2022017597337955],
        [0.99375, 2.9190155639254955],
        [0.9925, 2.685667856592722],
        [0.99125, 2.4902905794106913],
        [0.99, 2.324506282149922],
        [0.9875, 2.058947159052738],
        [0.985, 1.8563887693647105],
        [0.9825, 1.697536248647543],
        [0.98, 1.5702410055532239],
        [0.9775, 1.4664726399289512],
        [0.975, 1.3807102743105126],
        [0.9725, 1.3090333065057616],
        [0.97, 1.2485807759957321],
        [0.965, 1.1552120359501035],
        [0.96, 1.0871883573850478],
        [0.955, 1.0388633331418984],
        [0.95, 1],
        [0.94, 0.9417362980580238],
        [0.93, 0.9039994071865736],
        [0.92, 0.8728710341448851],
        [0.91, 0.8488375988124467],
        [0.9, 0.825756123560842],
        [0.875, 0.7816934560296046],
        [0.85, 0.7462290664143185],
        [0.825, 0.7150465663454271],
        [0.8, 0.6872268862950283],
        [0.75, 0.6451808210101443],
        [0.7, 0.6125565959114954],
        [0.65, 0.5866010012767576],
        [0.6, 0.18223233667439062],
        [0, 0]
    ];
  
    const acc_multiplier = interpolateCurve(curve, accuracy / 100.0);
    return star_rating * acc_multiplier * 42.11;
}


console.log(await calculatePP(10.35,93.674))
//console.log(await calculatePP(8.95,98.64))