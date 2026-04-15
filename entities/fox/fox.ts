import { Area2D, AudioStreamPlayer2D, Callable, FloatType, Input, InputEvent, is_zero_approx, Node, SceneNodes, Sprite2D, Variant, Vector2 } from "godot";
import { Export } from "godot.annotations";
import { STOPPABLE } from "../../common/groups";
import Dice from "../dice/dice";

export default class Fox extends Area2D<SceneNodes['entities/fox/fox.tscn']> {
    @Export(Variant.Type.TYPE_FLOAT)
    private speed: number = 250

    sounds?: AudioStreamPlayer2D
    sprite2d?: Sprite2D

    _ready(): void {
        this.add_to_group(STOPPABLE)
        this.area_entered.connect(
            Callable.create(this, area => this.onAreaEntered(area))
        )
        this.sounds = this.get_node('Sounds')
        this.sprite2d = this.get_node('Sprite2D')
    }

    _physics_process(delta: number): void {
        const axis = Input.get_axis('ui_left', 'ui_right')
        this.translate(Vector2.MULTIPLY(Vector2.RIGHT, axis * this.speed * delta))
        if (!is_zero_approx(axis) && this.sprite2d) {
            this.sprite2d.flip_h = axis > 0;
        }

    }

    private onAreaEntered(area: Area2D) {
        if (isDice(area)) {
            const dice = area
            dice.destroy()
            this.sounds?.play()
        }
    }
}

function isDice(node: Node): node is Dice {
    return node.is_class('Dice')
}

