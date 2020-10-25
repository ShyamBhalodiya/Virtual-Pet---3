class Game {
    constructor() {
        this.state = null;
    }
    getstate() {
        database.ref("gamestate").on("value", (data) => {
            this.state = data.val();
        })
    }
    updatestate(state) {
        database.ref("/").update({
            gamestate: state
        })
    }
    bedroom() {
        background(bedroom);
        addfood.hide();
        Deductfood.hide();
        dog.visible = false;
    }
    garden() {
        background(garden);
        addfood.hide();
        Deductfood.hide();
        dog.visible = false;
    }
    washroom() {
        background(washroom);
        addfood.hide();
        Deductfood.hide();
        dog.visible = false;
    }
}