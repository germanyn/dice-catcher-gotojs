import Fox from "../../../../entities/fox/fox";
declare module "godot" {
    interface SceneNodes {
        "scenes/game/game.tscn": {
            GemBg: Sprite2D<{}>;
            ScoreLabel: Label<{}>;
            Music: AudioStreamPlayer<{}>;
            Pausable: Node<
                {
                    SpawnTimer: Timer<{}>;
                    Fox: Fox;
                }
            >;
        };
    }
}
