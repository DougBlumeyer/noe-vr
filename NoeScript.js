#pragma strict

var positionVector = new Vector3();
var rotationVector = new Vector3();
for (var i = 0; i < 3; i++) {
	positionVector[i] = randomValuePosOrNeg(1.0);
	rotationVector[i] = randomValuePosOrNeg(10.0);
}

function Start () {
	InvokeRepeating("nudgeRotationRates", 0.0, 3.0);
}

function nudgeRotationRates() {
	for (var i = 0; i < 3; i++) {
		positionVector[i] = Mathf.Clamp(positionVector[i] + randomValuePosOrNeg(1.0), -1.0, 1.0);
		rotationVector[i] = Mathf.Clamp(rotationVector[i] + randomValuePosOrNeg(5.0), -10.0, 10.0);
	}
}

function randomValuePosOrNeg(scalar : float) {
	return (Random.value * 2.0 - 1.0) * scalar;
}

function Update()
{
	transform.Rotate(rotationVector*Time.deltaTime);
	transform.Translate(positionVector*Time.deltaTime);
}