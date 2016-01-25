#pragma strict

var translationVelocityTarget = new Vector3();
var rotationVelocityTarget = new Vector3();

var translationVelocityActual = new Vector3();
var rotationVelocityActual = new Vector3();

for (var i = 0; i < 3; i++) {
	translationVelocityTarget[i] = randomValuePosOrNeg(1.0);
	rotationVelocityTarget[i] = randomValuePosOrNeg(3.0);

	translationVelocityActual[i] = translationVelocityTarget[i];
	rotationVelocityActual[i] = rotationVelocityTarget[i];
}

var translationHome = new Vector3(0.0, 0.0, 0.0);
var rotationHome = new Vector3(0.0, 0.0, 0.0);

function Start () {
	InvokeRepeating("nudgeVelocityTargets", 0.0, 0.5);
}

function nudgeVelocityTargets() {
	for (var i = 0; i < 3; i++) {
		translationVelocityTarget[i] = nudgeRandomly(translationVelocityTarget[i], 0.1, 0.2);
		rotationVelocityTarget[i] = nudgeRandomly(rotationVelocityTarget[i], 3.0, 4.0);

		translationVelocityTarget[i] = nudgeTowardHome(translationVelocityTarget[i], translationHome[i], this.transform.position[i], 0.1);
		rotationVelocityTarget[i] = nudgeTowardHome(rotationVelocityTarget[i], rotationHome[i], this.transform.rotation[i], 0.1);
	}
}

function nudgeRandomly(number : float, scalar : float, clamp : float) {
	return Mathf.Clamp(number + randomValuePosOrNeg(scalar), -clamp, clamp);
}

function nudgeTowardHome(velocity : float, homeValue : float, currentValue : float, scalar : float) {
	return velocity + (homeValue - currentValue) * scalar;
}

function randomValuePosOrNeg(scalar : float) {
	return (Random.value * 2.0 - 1.0) * scalar;
}

function nudgeActualTowardTarget(actual : float, target : float, scalar : float) {
	return actual + (target - actual) * scalar;
}

function Update() {
	for (var i = 0; i < 3; i++) {
		rotationVelocityActual[i] = nudgeActualTowardTarget(rotationVelocityActual[i], rotationVelocityTarget[i], 0.02);
		translationVelocityActual[i] = nudgeActualTowardTarget(translationVelocityActual[i], translationVelocityTarget[i], 0.05);
	}
	transform.Translate(translationVelocityActual*Time.deltaTime);
	transform.Rotate(rotationVelocityActual*Time.deltaTime);
}