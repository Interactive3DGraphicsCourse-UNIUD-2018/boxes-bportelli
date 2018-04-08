function makeMaterials(){

	var loader = new THREE.TextureLoader();
	
	var t0 = loader.load('textures/rusty_iron_.jpg');
	t0.wrapS = THREE.RepeatWrapping;
	t0.wrapT = THREE.RepeatWrapping;
	t0.repeat.set(3,3);
	var t1 = loader.load('textures/dark_iron.jpg');
	t1.wrapS = THREE.RepeatWrapping;
	t1.wrapT = THREE.RepeatWrapping;
	t1.repeat.set(4,4);
	var t2 = loader.load('textures/eye.jpg');
	var t3 = loader.load('textures/ground.png');
	var t4 = loader.load('textures/grass.png');
	var t5 = loader.load('textures/grass.png');
	t5.wrapS = THREE.RepeatWrapping;
	t5.wrapT = THREE.RepeatWrapping;
	t5.repeat.set(250,250);
	
	var m0 = new THREE.MeshPhongMaterial({
		map:t0,
		specular:0x111111,
		shininess:100
	});
	var m1 = new THREE.MeshPhongMaterial({
		map:t1,
		//color: 0x888888,
		specular:0x111111,
		shininess:100
	});
	var m2 = new THREE.MeshPhongMaterial({
		map:t2,
		color: 0xffffff,
		shininess:100
	});
	var m3 = new THREE.MeshPhongMaterial({
		map:t3,
		specular:0x111111,
		shininess:0
	});
	var m4 = new THREE.MeshPhongMaterial({
		map:t4,
		specular:0x111111,
		shininess:0
	});
	var m5 = new THREE.MeshPhongMaterial({
		//color: 0x81bc0f,
		specular: 0x050505,
		map:t5
	});
	
	material_array[IRON] = m0;
	material_array[DARK_IRON] = m1;
	material_array[EYES] = m2;
	material_array[TERRAIN] = m3;
	material_array[GRASS] = m4;
	material_array[GROUND] = m5;

}