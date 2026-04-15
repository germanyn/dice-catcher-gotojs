import Game from "../../../../scenes/game/game";
declare module "godot" {
    interface ResourceTypes {
        "res://scenes/game/game.tscn": PackedScene<Game>;
    }
}
