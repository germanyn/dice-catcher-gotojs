import _Dice from "../../../../entities/dice/dice";
declare module "godot" {
    interface ResourceTypes {
        "res://entities/dice/dice.tscn": PackedScene<_Dice>;
    }
}
