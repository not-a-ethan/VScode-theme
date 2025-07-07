const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const real = vscode.commands.registerCommand('timer.start', function() {
		let panel = vscode.window.createWebviewPanel(
			'timer',
			'Timer',
			vscode.ViewColumn.One,
			{
				enableScripts: true
			}
		);
		panel.webview.html = getWebViewContent()
	});

	function getWebViewContent() {
		return `
			<!DOCTYPE html>
		<html lang="en">
			<head>
				<style>
					* {
						text-align: center;
					}

					.grid {
						display: grid;
					}

					.left {
						grid-column: 1;
					}

					.right {
						grid-column: 2;
					}
				</style>
			</head>
			<body>
				<h1>Timer</h1>

				<div class="grid">
					<div class="left">
						<h2>Stopwatch</h2>

						<h3>
							<span id="hr">0</span>
							<span>:</span>
							<span id="min">00</span>
							<span>:</span>
							<span id="sec">00</span>
						</h3>

						<div id="buttons">
							<button class="btn" id="start">Start</button>
							<button class="btn" id="stop">Stop</button>
							<button class="btn" id="reset">Reset</button>
						</div>
					</div>

					<div class="right">
						<iframe src="https://pomofocus.io/"></iframe>
					</div>
				</div>

				<script>
					const stopStart = document.getElementById("start");
					const stopStop = document.getElementById("stop");
					const stopReset = document.getElementById("reset");
					const stopTime = {
						hour: 0,
						min: 0,
						sec: 0,
					}
                    timer = false;

					function stopWatch() {
						if (timer) {
							stopTime.sec = stopTime.sec + 1;

							if (stopTime.sec === 60) {
								stopTime.sec = 0;
								stopTime.min = stopTime.min + 1;
							}

							if (stopTime.min === 60) {
								stopTime.min = 0;
								stopTime.hour = stopTime.hour + 1;
							}

							document.getElementById('hr').innerHTML = stopTime.hour;

							if (stopTime.min < 10) {
								document.getElementById('min').innerHTML = "0" + stopTime.min.toString();
							} else {
							  document.getElementById('min').innerHTML = stopTime.min;
							}

							if (stopTime.sec < 10) {
								document.getElementById('sec').innerHTML = "0" + stopTime.sec.toString();
							} else {
							  document.getElementById('sec').innerHTML = stopTime.sec;
							}

                            setTimeout(stopWatch, 1000);
						}
					}

					stopStart.addEventListener("click", function () {
						timer = true;
                        stopWatch();
					})

					stopStop.addEventListener("click", function () {
						timer = false;
					})

					stopReset.addEventListener("click", function () {
						stopTime.hour = 0;
						stopTime.min = 0;
						stopTime.sec = 0;
                        
                        document.getElementById('hr').innerHTML = "0";
                        document.getElementById('min').innerHTML = "00";
                        document.getElementById('sec').innerHTML = "00";    

                        timer = false;
					})
				</script>
			</body>
		</html>
		`
	}

	context.subscriptions.push(real);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
