class Name {
    constructor() {
        this.name = null;
    }
    getname() {
        database.ref("Petname").on("value", (data) => {
            this.name = data.val();
        })
    }
    display() {
        fill(0);
        textSize(18);
        text("Petname : " + this.name, 690, 50);
    }
}