import Dice from "../../../../entities/dice/dice";
declare module "godot" {
    interface ResourceTypes {
        "res://entities/dice/dice.tscn": PackedScene<Dice>;
    }
}
