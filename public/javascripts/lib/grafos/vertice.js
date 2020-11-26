class Vertice {

    constructor(px,py) {
        this.status = null;
        this.color = null;
        this.x = px;
        this.y = py;
        this.adjacentes = [];
    }

    get getColor() {
        return this.color;
    }

    set setColor(color) {
        this.color = color;
    }

    get getStatus() {
        return this.status;
    }

    set setStatus(status) {
        this.status = status;
    }

    get getX() {
        return this.x;
    }

    set setX(px) {
        this.x = px;
    }

    get getY() {
        return this.y;
    }

    set setY(py) {
        this.y = py;
    }

    addAdjacente(v) {
        this.adjacentes.push(v);
    }

    getAdjacentes() {
        return this.adjacentes;
    }

    resetAdjacentes() {
        this.adjacentes = [];
    }

    toString() {
        return "X: "+this.x+", Y:"+this.y;
    }

    getDistancia(x,y) {
        return Math.sqrt(((x - this.x) * (x - this.x)) + ((y - this.y) * (y - this.y)));
    }

}