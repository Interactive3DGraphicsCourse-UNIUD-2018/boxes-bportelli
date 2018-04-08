function animate(start, now){

	delta = (now-start)/1000; // time in seconds
	
	if (delta < 2){
		
		openMouth(delta,2);
		lookX(0,-45, delta, 2);
		lookY(0,-5, delta, 2);
		
	} else if ( delta < 3){
	
		closeMouth(delta, 1);
		lookY(-5,20, delta-2, 1);
		
	} else if (delta < 4){
	
		pullLeft(delta);
		if (delta > 3+.5 ){
			lookY(20,-10, delta-(3+.5), .2);
			openMouth(delta-.5, .5);
		}

	} else if (delta < 5){
	
		closeMouth(delta, 1);
		lookY(-10,20, delta-4, 1);
		
	} else if (delta < 6){
		
		pullLeft(delta);
		if (delta > 5+.5){
			lookY(20,-10, delta-(5+.5), .2);
			openMouth(delta-.5, .5);
		}
		
	} else if (delta < 6.5){
	
		closeMouth(delta, .5);
		lookY(-10,0, delta-6, .5);
		
	} else if (delta < 7){
	} else if (delta < 9){
	
		lookX(-45,0, delta-7, 2);
		lookY(0,10, delta-7, 2);
	
	} else if (delta < 10){
		pullLeft(delta);
		tiltAndBack(delta, 10);
	} else if (delta < 11) {
		pullRight(delta);
		tiltAndBack(delta, -10);
	} else if (delta < 12) {
		pullLeft((delta)*2);
		tiltAndBack((delta)*2, 10);
	} else if (delta < 13) {
		pullRight(delta);
		tiltAndBack(delta, -10);
	} else if (delta < 15) {
	
		lookX(0,45, delta-13.5, 1.5);
		lookY(10,-10, delta-13.5, 1.5);
	
	} else if (delta < 16) {
	
		openMouth(delta,1);
	
	} else if (delta < 17) {
	
		closeMouth(delta,1);
		
	} else if (delta < 18.5) {
	
		lookX(45,0, delta-17, 1.5);
		lookY(-10,0, delta-17, 1.5);
	
	}
}

function clamp(num, min, max) {
	return num <= min ? min : num >= max ? max : num;
}

function rad(ang){
	return (ang * Math.PI / 180);
}

function lookX(start, stop, delta, t){
	v = (stop-start)/t;
	if (v>0) rotation = clamp(delta * v, 0, stop-start);
	else rotation = clamp(delta * v, stop-start,0);
	rotation = rad(rotation);
	head_bot.rotation.y = (start*Math.PI/180)+rotation;
}

function lookY(start, stop, delta, t){
	v = (stop-start)/t;
	if (v>0) rotation = clamp(delta * v, 0, stop-start);
	else rotation = clamp(delta * v, stop-start,0);
	rotation = rad(rotation);
	head_bot.rotation.x = (start*Math.PI/180)+rotation;
}

function shuffle(delta){
	if (Math.floor(delta) % 2 == 0) delta = delta - Math.floor(delta);
	else delta = delta - Math.floor(delta) + 1;
	v = 2;
	if (delta < .5){
		rotation = Math.floor(delta) * Math.PI * v / 180;
	} else if (delta < 1){
		rotation = (.5 * Math.PI * v / 180) - (delta-.5) * Math.PI * v / 180;
	} else if (delta < 1.5){
		rotation = (.5 * Math.PI * v / 180) - (Math.floor(delta)-.5) * Math.PI * v / 180;
	} else {
		rotation = (.5 * Math.PI * v / 180) -
				   (1 * Math.PI * v / 180) + (delta-1.5) * Math.PI * v / 180;
	}
	torso.rotation.z = rotation;
}

function pullRight(delta){
	while (delta>=1) delta--;
	v = 4;
	if (delta < .5){
		rotation = Math.floor(delta) * Math.PI * v / 180;
	} else if (delta < 1){
		rotation = (.5 * Math.PI * v / 180) - (delta-.5) * Math.PI * v / 180;
	}
	torso.rotation.z = rotation;
}

function pullLeft(delta){
	while (delta>=1) delta--;
	v = 4;
	if (delta < .5){
		rotation = Math.floor(delta) * Math.PI * v / 180;
	} else if (delta < 1){
		rotation = (.5 * Math.PI * v / 180) - (delta-.5) * Math.PI * v / 180;
	}
	torso.rotation.z = -rotation;
}

function openMouth(delta, t){
	while (delta>=t) delta=delta-t;
	v1 = 10/t;
	v2 = 20/t;

	rotation1 = delta * Math.PI * v1 / 180;
	rotation2 = delta * Math.PI * v2 / 180;

	mouth.rotation.x = rotation1;
	screw_right.rotation.x = Math.PI * 45 / 180 +rotation2;
	screw_left.rotation.x = Math.PI * 45 / 180 +rotation2;
}

function closeMouth(delta, t){
	while (delta>=t) delta=delta-t;
	v1 = 10/t;
	v2 = 20/t;

	rotation1 = delta * Math.PI * v1 / 180;
	rotation2 = delta * Math.PI * v2 / 180;

	mouth.rotation.x = rad(10) - rotation1;
	screw_right.rotation.x = Math.PI * 45 / 180 + rad(20) - rotation2;
	screw_left.rotation.x = Math.PI * 45 / 180 + rad(20) - rotation2;
}

function tiltAndBack(delta, max_ang){
	while (delta >= 1) delta--;
	v = max_ang;
	if (delta < .5){
		rotation = Math.floor(delta) * Math.PI * v / 180;
	} else if (delta < 1){
		rotation = (.5 * Math.PI * v / 180) - (delta-.5) * Math.PI * v / 180;
	}
	head_bot.rotation.z = rotation;
}