declare module "godot" {
    interface SceneNodes {
        "entities/fox/fox.tscn": {
            Sprite2D: Sprite2D<{}>;
            CollisionShape2D: CollisionShape2D<{}>;
            Sounds: AudioStreamPlayer2D<{}>;
        };
    }
}
