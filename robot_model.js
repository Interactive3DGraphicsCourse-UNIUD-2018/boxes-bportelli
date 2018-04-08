function makeRobot(){
	
	var head_main_dim = [ 17,16,17 ];
	var head_right_dim = [ 2,10,13 ];
	var head_top_dim = [ 13,2,13 ];
	var head_ear_dim = [ 2,1,1 ];
	var head_antenna_dim = [ 1,2,1 ];
	var mouth_dim = [ 15,7,2 ];
	var neck_dim = [ 5,4,5 ];
	var low_neck_dim = [ 11,2,11 ];
	var chest_dim = [ 21,12,12 ];
	var jaw_dim = [Math.sqrt(2),5*Math.sqrt(2),Math.sqrt(2)];
	var screw_dim = [1,Math.sqrt(2),Math.sqrt(2)];
	var chest_screw_dim = [ Math.sqrt(2),1,Math.sqrt(2) ];
	var mouth_screw_dim = [Math.sqrt(2),Math.sqrt(2),.5];
	var eye_cube_dim = [ 1,1,1 ];
	var shoulder_dim = [ 8,10,8 ];
	var arm_dim = [ 3*Math.sqrt(2),9,3*Math.sqrt(2) ];
	var torso_dim = [ 18,5,8 ];

	 torso = makeBox(torso_dim, 0);
	//scene.add(torso);
	torso.position.y = torso_dim[1]/2;
	
	var chest = makeBox(chest_dim, DARK_IRON);
	torso.add(chest);
	onTopOfParent(chest);
	
	var low_neck = makeBox(low_neck_dim, DARK_IRON);
	chest.add(low_neck);
	onTopOfParent(low_neck);
	
	var neck = makeBox(neck_dim, IRON);
	low_neck.add(neck);
	onTopOfParent(neck);
	
		head_bot = makeBox(head_top_dim, DARK_IRON);
	neck.add(head_bot);
	onTopOfParent(head_bot);
	
	var head_main = makeBox(head_main_dim, DARK_IRON);
	head_bot.add(head_main);
	onTopOfParent(head_main);
	
	var head_top = makeBox(head_top_dim, DARK_IRON);
	head_main.add(head_top);
	onTopOfParent(head_top);
	
	var head_right = makeBox(head_right_dim, IRON);
	head_main.add(head_right);
	onRightOfParent(head_right);
	head_right.position.y = 1;
	
	var head_left = makeBox(head_right_dim, IRON);
	head_main.add(head_left);
	onLeftOfParent(head_left);
	head_left.position.y = 1;
	
	var right_ear = makeBox(head_ear_dim, IRON);
	head_right.add(right_ear);
	onRightOfParent(right_ear);
	
	var left_ear = makeBox(head_ear_dim, IRON);
	head_left.add(left_ear);
	onLeftOfParent(left_ear);
	
	var antenna = makeBox(head_antenna_dim, IRON);
	head_top.add(antenna);
	onTopOfParent(antenna);
	antenna.position.x = 2.5;
	
		mouth = new THREE.Object3D();
	head_main.add(mouth);
	mouth.position.y = -5;
	mouth.position.z = 8;
	
	var jaw_right = makeBox(jaw_dim, IRON);
	mouth.add(jaw_right);
	jaw_right.position.y -= 2*Math.sqrt(2);
	jaw_right.position.x = 8.5 + jaw_dim[0]/2;
	jaw_right.rotation.x = -Math.PI * 45 / 180;
	
		screw_right = makeBox(screw_dim, DARK_IRON);
	jaw_right.add(screw_right);
	onLeftOfParent(screw_right);
	screw_right.position.y -= 2 * Math.sqrt(2);
	screw_right.rotation.x = Math.PI * 45 / 180;
	
	var jaw_left = makeBox(jaw_dim, IRON);
	mouth.add(jaw_left);
	jaw_left.position.y -= 2*Math.sqrt(2);
	jaw_left.position.x = -8.5 - jaw_dim[0]/2;
	jaw_left.rotation.x = -Math.PI * 45 / 180;
	
		screw_left = makeBox(screw_dim,  DARK_IRON);
	jaw_left.add(screw_left);
	onRightOfParent(screw_left);
	screw_left.position.y -= 2 * Math.sqrt(2);
	screw_left.rotation.x = Math.PI * 45 / 180;
	
	var mouth_main = makeBox(mouth_dim, IRON);
	screw_right.add(mouth_main);
	onLeftOfParent(mouth_main);
	mouth_main.position.y = 1;
	
	var mouth_screw_right = makeBox(mouth_screw_dim, DARK_IRON);
	mouth_main.add(mouth_screw_right);
	inFrontOfParent(mouth_screw_right);
	mouth_screw_right.position.x = 5.5;
	mouth_screw_right.position.y = -1;
	mouth_screw_right.rotation.z = Math.PI * 45 / 180;
	
	var mouth_screw_left = makeBox(mouth_screw_dim, DARK_IRON);
	mouth_main.add(mouth_screw_left);
	inFrontOfParent(mouth_screw_left);
	mouth_screw_left.position.x = -5.5;
	mouth_screw_left.position.y = -1;
	mouth_screw_left.rotation.z = Math.PI * 45 / 180;
		
	var eye_right = new THREE.Object3D();
	eye_right.position.x = 4.5;
	eye_right.position.y = 1;
	eye_right.position.z = 9;
	
	for (x=-1.5; x<=1.5; x=x+1){
		for (y=-1.5; y<=1.5; y=y+1){
		
			if (!(x == -1.5 && y == -1.5) &&
				!(x == -1.5 && y == 1.5) &&
				!(x == 1.5 && y == -1.5) &&
				!(x == 1.5 && y == 1.5)) {
				var c = makeBox(eye_cube_dim, EYES);
				c.receiveShadow = false;
				c.position.x = x;
				c.position.y = y;
				eye_right.add(c);
			}
		}
	}
	
	var eye_left = eye_right.clone();
	eye_left.position.x = -eye_right.position.x;
	head_main.add(eye_right);
	head_main.add(eye_left);
	
	var shoulder_right = makeBox(shoulder_dim, IRON);
	chest.add(shoulder_right);
	onRightOfParent(shoulder_right);
	shoulder_right.position.y = 3;
	
	var arm_right = makeBox(arm_dim, DARK_IRON);
	shoulder_right.add(arm_right);
	onBotOfParent(arm_right);
	arm_right.rotation.y = Math.PI * 45 / 180;
	
	var shoulder_left = makeBox(shoulder_dim, IRON);
	chest.add(shoulder_left);
	onLeftOfParent(shoulder_left);
	shoulder_left.position.y = 3;
	
	var arm_left = makeBox(arm_dim, DARK_IRON);
	shoulder_left.add(arm_left);
	onBotOfParent(arm_left);
	arm_left.rotation.y = Math.PI * 45 / 180;
	
	var chest_screw_right = makeBox(chest_screw_dim, DARK_IRON);
	chest.add(chest_screw_right);
	onTopOfParent(chest_screw_right);
	chest_screw_right.position.x = 8.5;
	chest_screw_right.rotation.y = Math.PI * 45 / 180;
	
	var chest_screw_left = makeBox(chest_screw_dim, DARK_IRON);
	chest.add(chest_screw_left);
	onTopOfParent(chest_screw_left);
	chest_screw_left.position.x = -8.5;
	chest_screw_left.rotation.y = Math.PI * 45 / 180;
}

function makeBox(dimensions, m) {
	if (textures) {
		material = material_array[m];
	} else {
		switch(m) {
			case 0:
				col = 0x666666;
				break;
			case 1:
				col = 0x333333;
				break;
		}
		material = new THREE.MeshPhongMaterial({color:col});
	}
	var mesh = new THREE.Mesh(
		new THREE.BoxGeometry(dimensions[0], dimensions[1], dimensions[2]),
		material
	);
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	return mesh;
}

function onTopOfParent(mesh){
	mesh.position.y = (mesh.parent.geometry.parameters.height + mesh.geometry.parameters.height)/2;
}
function onRightOfParent(mesh){
	mesh.position.x = (mesh.parent.geometry.parameters.width + mesh.geometry.parameters.width)/2;
}
function onLeftOfParent(mesh){
	mesh.position.x = -(mesh.parent.geometry.parameters.width + mesh.geometry.parameters.width)/2;
}
function onBotOfParent(mesh){
	mesh.position.y = -(mesh.parent.geometry.parameters.height + mesh.geometry.parameters.height)/2;
}
function inFrontOfParent(mesh){
	mesh.position.z = (mesh.parent.geometry.parameters.depth + mesh.geometry.parameters.depth)/2;
}
function behindParent(mesh){
	mesh.position.z = -(mesh.parent.geometry.parameters.depth + mesh.geometry.parameters.depth)/2;
}