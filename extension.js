// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "timer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('timer.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Timer!');
	});

	const real = vscode.commands.registerCommand('timer.start', function() {
		let panel = vscode.window.createWebviewPanel(
			'timer',
			'Timer',
			vscode.ViewColumn.One,
			{}
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
							<span class="digit" id="hr">00</span>
							<span>:</span>
							<span class="digit" id="min">00</span>
							<span>:</span>
							<span class="digit" id="sec">00</span>
						</h3>

						<div id="buttons">
							<button class="btn" id="start">Start</button>
							<button class="btn" id="stop">Stop</button>
							<button class="btn" id="reset">Reset</button>
						</div>
					</div>

					<div class="right">
					
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
					let timer = false;

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
								document.getElementById('min').innerHTML = "0" + str(stopTime.min);
							} else {
							  document.getElementById('min').innerHTML = stopTime.min;
							}

							if (stopTime.sec < 10) {
								document.getElementById('sec').innerHTML = "0" + str(stopTime.sec);
							} else {
							  document.getElementById('sec').innerHTML = stopTime.sec;
							}
						}
					}

					setTimeout(stopWatch, 1000);

					stopStart.addEventListener("click", function () {
						timer = true;
					})

					stopStart.addEventListener("click", function () {
						stopStop = false;
					})

					stopReset.addEventListener("click", function () {
						stopTime.hour = 0;
						stopTime.min = 0;
						stopTime.sec = 0;
					})
				</script>
			</body>
		</html>
		`
	}

	context.subscriptions.push(disposable);
	context.subscriptions.push(real);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
