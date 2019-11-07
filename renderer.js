// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

let farg = [];
let fval = [];

let min;
let max;

$("#plot-btn").click(() => {
    min = $("#min-field").val();
    max = $("#max-field").val();
    let fequation = $("#function-field").val();

    fval = [];
    farg = [];

    for (let x = min; x < max; x++) {
        farg.push(x);
        fval.push(evaluateExpression(x, fequation));
    }

    console.log("x=" + farg + " y=" + fval + " func=" + fequation);
    plot(farg, fval);
});

function prepare(formula) {
    return formula
        .replace("log", "Math.log")
        .replace("abs", "Math.abs");
}

function evaluateExpression(x, formula) {
    let preparedFormula = prepare(formula);
    return (new Function( 'x', 'return (' + preparedFormula + ')' )(x));
}

function plot(x, y) {
    let data = {
        x: farg,
        y: fval,
        type: 'scatter',
    };

    Plotly.newPlot('graph-canvas', [data], {}, {showSendToCloud: true});
}