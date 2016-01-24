#pragma strict

var translationAcceleration = new Vector3();
var rotationAcceleration = new Vector3();
for (var i = 0; i < 3; i++) {
	translationAcceleration[i] = randomValuePosOrNeg(1.0);
	rotationAcceleration[i] = randomValuePosOrNeg(10.0);
}

function Start () {
	InvokeRepeating("nudgeAccelerations", 0.0, 3.0);
}

function nudgeAccelerations() {
	for (var i = 0; i < 3; i++) {
		translationAcceleration[i] = Mathf.Clamp(translationAcceleration[i] + randomValuePosOrNeg(1.0), -1.0, 1.0);
		rotationAcceleration[i] = Mathf.Clamp(rotationAcceleration[i] + randomValuePosOrNeg(5.0), -10.0, 10.0);
	}
}

function randomValuePosOrNeg(scalar : float) {
	return (Random.value * 2.0 - 1.0) * scalar;
}

function Update()
{
	transform.Rotate(rotationAcceleration*Time.deltaTime);
	transform.Translate(translationAcceleration*Time.deltaTime);
}