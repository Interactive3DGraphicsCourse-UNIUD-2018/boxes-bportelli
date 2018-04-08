function makeTerrain(path){
		
	var scale = 4;
	var height_scale = 16;

	var geometry = new THREE.BoxGeometry(scale*1,scale*1,scale*1);
	var cube = new THREE.Mesh( geometry, material_array[TERRAIN] );
	var grass_cube = new THREE.Mesh(geometry, material_array[GRASS]);
	cube.castShadow = true;
	cube.receiveShadow = true;
	grass_cube.castShadow = true;
	grass_cube.receiveShadow = true;
	
	var terrain = new THREE.Object3D();
	scene.add(terrain);

	var img = new Image();
	
	cubes = true
	
	if (cubes){
	
		img.onload = function () {
	
			var data = getHeightData(img,1);
			
			k = Math.sqrt(data.length);
			
			terrain.position.x = -scale*k/2;
			terrain.position.z = -120;
			terrain.position.y = scale/2;
			
			for (i=0; i<k; i++){
				for (j=0; j<k; j++){
					
					var h = data[i+j*k];
					var close_h = 255;
					
					var close = matrixUp(k, i+j*k);
					if (close != null) close_h = Math.min(close_h, data[close]);
					else close_h = 0;
					
					close = matrixDown(k, i+j*k);
					if (close != null) close_h = Math.min(close_h, data[close]);
					else close_h = 0;
					
					close = matrixLeft(k, i+j*k);
					if (close != null) close_h = Math.min(close_h, data[close]);
					else close_h = 0;
					
					close = matrixRight(k, i+j*k);
					if (close != null) close_h = Math.min(close_h, data[close]);
					else close_h = 0;
					
					if (h <= .75*256/height_scale){
					
						var new_scale = 1/(256/height_scale);
						
						var c = cube.clone();
						var grass = grass_cube.clone();
						
						terrain.add(grass);
						grass.position.x = scale*i;
						grass.position.z = scale*j;
						grass.scale.y = .1;

						terrain.add(c);
						c.position.x = scale*i;
						c.position.z = scale*j;
						
						switch(h){
							case 0:
								c.position.y = 2*scale*new_scale*(h+1) - 2;
								c.scale.y = scale*new_scale*(h+1);
								grass.position.y = 4*scale*new_scale*(h+1) - 2 + .15;
								break;
							default:
								c.position.y = 2*scale*new_scale*(h) - 2;
								c.scale.y = scale*new_scale*(h);
								grass.position.y = 4*scale*new_scale*(h) - 2 + .15;
								break;
						}
					
					} else {
					
						if (close_h < h) {
						
							for (var y=Math.floor(close_h/height_scale); y*height_scale<=h; y++){
								var c = cube.clone();
								
								terrain.add(c);
								c.position.x = scale*i;
								c.position.z = scale*j;
								c.position.y = scale*y;
							}
						
						} else {
						
							y = Math.floor(h/height_scale);
							var c = cube.clone();
							terrain.add(c);
							c.position.x = scale*i;
							c.position.z = scale*j;
							c.position.y = scale*y;
						}
					}
				}
			}
			
			scene.add(torso);
			start = Date.now();
			
		} // end function
	
	} else {
	
		img.onload = function () {
			var data = getHeightData(img,.1);
			k = Math.sqrt(data.length);					
			terrain.position.x = -scale*k/2;
			terrain.position.z = -scale*k/3*2;
			for (i=0; i<k; i++){
				for (j=0; j<k; j++){
					var c = cube.clone();
					terrain.add(c);
					c.position.x = scale*i;
					c.position.z = scale*j;
					
					val = data[i+j*k];
					
					if (val != 0){
						c.scale.y = scale*val/4;
						c.position.y = scale*val/2/4;
					} else {
						c.scale.y = 0.1;
						c.position.y = .1/2;
					}
				}
			}
			
			scene.add(torso);
			start = Date.now();
			
		} // end function
	
	} // end else
	
	// load img source
	img.src =path;
}

//return array with height data from img, taken from: http://danni-three.blogspot.it/2013/09/threejs-heightmaps.html
function getHeightData(img,scale) {
	if (scale == undefined) scale=1;
	var canvas = document.createElement( 'canvas' );
	canvas.width = img.width;
	canvas.height = img.height;
	var context = canvas.getContext( '2d' );
	var size = img.width * img.height;
	var data = new Float32Array( size );
	context.drawImage(img,0,0);
	for ( var i = 0; i < size; i ++ ) {
		data[i] = 0
	}
	var imgd = context.getImageData(0, 0, img.width, img.height);
	var pix = imgd.data;
	var j=0;
	for (var i = 0; i<pix.length; i +=4) {
		var all = pix[i]+pix[i+1]+pix[i+2];  // all is in range 0 - 255*3
		data[j++] = scale*all/3;   
	}
	return data;
}

function matrixUp(dim, k) {
	if (k < dim) return null;
	else return k-dim;
}
function matrixDown(dim, k) {
	if (k < dim*dim-dim) return k+dim;
	else return null;
}
function matrixLeft(dim, k) {
	if (k % dim == 0) return null;
	else return k-1;
}
function matrixRight(dim, k) {
	if (k % dim == dim-1) return null;
	else return  k+1;
}

