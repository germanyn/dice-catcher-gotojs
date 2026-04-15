import Fox from "../../../../entities/fox/fox";
declare module "godot" {
    interface ResourceTypes {
        "res://entities/fox/fox.tscn": PackedScene<Fox>;
    }
}
