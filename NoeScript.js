#pragma strict

var translationAccelerationTarget = new Vector3();
var rotationAccelerationTarget = new Vector3();

var translationAccelerationActual = new Vector3();
var rotationAccelerationActual = new Vector3();

for (var i = 0; i < 3; i++) {
	translationAccelerationTarget[i] = randomValuePosOrNeg(1.0);
	rotationAccelerationTarget[i] = randomValuePosOrNeg(3.0);

	translationAccelerationActual[i] = translationAccelerationTarget[i];
	rotationAccelerationActual[i] = rotationAccelerationTarget[i];
}

//var translationHome = new Vector3(0.0, 0.0, 0.0);
//var rotationHome = new Vector3(0.0, 0.0, 0.0);

function Start () {
	InvokeRepeating("nudgeAccelerationTargets", 0.0, 0.5);
}

function nudgeAccelerationTargets() {
	for (var i = 0; i < 3; i++) {
		translationAccelerationTarget[i] = nudgeTarget(translationAccelerationTarget[i], 0.5, 1.0);
		rotationAccelerationTarget[i] = nudgeTarget(rotationAccelerationTarget[i], 3.0, 4.0);
		//nudge(translationAccelerationTarget[i], 1.0, 3.0, translationHome[i], 0.6, this.transform.position[i]);
		//nudge(rotationAccelerationTarget[i], 3.0, 7.0, rotationHome[i], 0.1, this.transform.rotation[i]);
	}
}

//function nudge(number : float, scalar : float, clamp : float, home : float, adjustmentScalar : float, absolute : float) {
	//number = Mathf.Clamp(number + randomValuePosOrNeg(scalar) + adjustmentTowardHome(absolute, home, adjustmentScalar), -clamp, clamp);
function nudgeTarget(number : float, scalar : float, clamp : float) {
	return Mathf.Clamp(number + randomValuePosOrNeg(scalar), -clamp, clamp);
}

function adjustmentTowardHome(number : float, home : float, scalar : float) {
	return (home - number) * scalar;
}

function randomValuePosOrNeg(scalar : float) {
	return (Random.value * 2.0 - 1.0) * scalar;
}

function nudgeActual(actual : float, target : float, scalar : float) {
	return actual + (target - actual) * scalar;
}

function Update()
{
	for (var i = 0; i < 3; i++) {
		rotationAccelerationActual[i] = nudgeActual(rotationAccelerationActual[i], rotationAccelerationTarget[i], 0.02);
		translationAccelerationActual[i] = nudgeActual(translationAccelerationActual[i], translationAccelerationTarget[i], 0.05);
	}
	transform.Translate(translationAccelerationActual*Time.deltaTime);
	transform.Rotate(rotationAccelerationActual*Time.deltaTime);
}