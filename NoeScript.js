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

//var translationHome = new Vector3(0.0, 0.0, 0.0);
//var rotationHome = new Vector3(0.0, 0.0, 0.0);

function Start () {
	InvokeRepeating("nudgeVelocityTargets", 0.0, 0.5);
}

function nudgeVelocityTargets() {
	for (var i = 0; i < 3; i++) {
		translationVelocityTarget[i] = nudgeTarget(translationVelocityTarget[i], 0.5, 1.0);
		rotationVelocityTarget[i] = nudgeTarget(rotationVelocityTarget[i], 3.0, 4.0);
		//nudge(translationVelocityTarget[i], 1.0, 3.0, translationHome[i], 0.6, this.transform.position[i]);
		//nudge(rotationVelocityTarget[i], 3.0, 7.0, rotationHome[i], 0.1, this.transform.rotation[i]);
	}
}

//function nudge(number : float, scalar : float, clamp : float, home : float, adjustmentScalar : float, absolute : float) {
	//number = Mathf.Clamp(number + randomValuePosOrNeg(scalar) + adjustmentTowardHome(absolute, home, adjustmentScalar), -clamp, clamp);
function nudgeTarget(number : float, scalar : float, clamp : float) {
	return Mathf.Clamp(number + randomValuePosOrNeg(scalar), -clamp, clamp);
}

//function adjustmentTowardHome(number : float, home : float, scalar : float) {
//	return (home - number) * scalar;
//}

function randomValuePosOrNeg(scalar : float) {
	return (Random.value * 2.0 - 1.0) * scalar;
}

function nudgeActual(actual : float, target : float, scalar : float) {
	return actual + (target - actual) * scalar;
}

function Update()
{
	for (var i = 0; i < 3; i++) {
		rotationVelocityActual[i] = nudgeActual(rotationVelocityActual[i], rotationVelocityTarget[i], 0.02);
		translationVelocityActual[i] = nudgeActual(translationVelocityActual[i], translationVelocityTarget[i], 0.05);
	}
	transform.Translate(translationVelocityActual*Time.deltaTime);
	transform.Rotate(rotationVelocityActual*Time.deltaTime);
}