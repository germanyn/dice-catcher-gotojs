import Fox from "../../../../entities/fox/fox";
declare module "godot" {
    interface SceneNodes {
        "scenes/game/game.tscn": {
            GemBg: Sprite2D<{}>;
            SpawnTimer: Timer<{}>;
            Fox: Fox;
        };
    }
}
