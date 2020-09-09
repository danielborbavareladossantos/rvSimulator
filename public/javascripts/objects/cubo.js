class Cubo {

    constructor() {
        this.geometry = new THREE.BoxGeometry(1,1,1);
        // this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.material = new THREE.MeshBasicMaterial({ 
          map: new THREE.TextureLoader().load('images/wood.jpg')
        });
        this.object = new Physijs.BoxMesh( this.geometry, this.material );
        this.object.position.y = 3;
        // this.object.rotation.x = 0.8;
        // this.object.rotation.y = 0.8;
    };

};