class Chao {

    constructor() {
        this.geometry = new THREE.BoxGeometry(10,1,5);
        // this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.material = new THREE.MeshBasicMaterial({ 
          map: new THREE.TextureLoader().load('images/wood.jpg') 
        });
        this.object = new Physijs.BoxMesh( this.geometry, this.material, 0 );
    };

};