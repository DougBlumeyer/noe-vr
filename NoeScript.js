#pragma strict

var translationAccelerationTarget = new Vector3();
var rotationAccelerationTarget = new Vector3();

var translationAccelerationActual = new Vector3();
var rotationAccelerationActual = new Vector3();

for (var i = 0; i < 3; i++) {
	translationAccelerationTarget[i] = randomValuePosOrNeg(1.0);
	rotationAccelerationTarget[i] = randomValuePosOrNeg(7.0);

	translationAccelerationActual[i] = translationAccelerationTarget[i];
	rotationAccelerationActual[i] = rotationAccelerationTarget[i];
}

function Start () {
	InvokeRepeating("nudgeAccelerations", 0.0, 3.0);
}

function nudgeAccelerationTargets() {
	for (var i = 0; i < 3; i++) {
		nudge(translationAccelerationTarget[i], 1.0, 3.0);
		nudge(rotationAccelerationTarget[i], 3.0, 7.0);
	}
}

function nudge(el : float, scalar : float, clamp : float) {
	el = Mathf.Clamp(el + randomValuePosOrNeg(scalar), -clamp, clamp);
}

function randomValuePosOrNeg(scalar : float) {
	return (Random.value * 2.0 - 1.0) * scalar;
}

function approachTargets(scalar : float) {
	for (var i = 0; i < 3; i++) {
		translationAccelerationActual[i] = translationAccelerationActual[i] + (translationAccelerationTarget[i] - translationAccelerationActual[i]) * scalar;
		rotationAccelerationActual[i] = rotationAccelerationActual[i] + (rotationAccelerationTarget[i] - rotationAccelerationActual[i]) * scalar;
	}
}

function Update()
{
	approachTargets(0.2);
	transform.Translate(translationAccelerationActual*Time.deltaTime);
	transform.Rotate(rotationAccelerationActual*Time.deltaTime);
}