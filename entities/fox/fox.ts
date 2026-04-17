import { Area2D, AudioStreamPlayer2D, Callable, FloatType, Input, InputEvent, is_zero_approx, Node, ResourceLoader, SceneNodes, Signal, Sprite2D, Variant, Vector2,  } from "godot";
import { Export, ExportSignal } from "godot.annotations";
import { STOPPABLE } from "../../common/groups";
import Dice from "../dice/dice";

export default class Fox extends Area2D<SceneNodes['entities/fox/fox.tscn']> {
    readonly DICE = ResourceLoader.load('res://entities/dice/dice.tscn')

    @Export(Variant.Type.TYPE_FLOAT)
    private speed: number = 250
        
    @ExportSignal()
    declare scored: Signal<() => void>

    sounds?: AudioStreamPlayer2D
    sprite2d?: Sprite2D

    _ready(): void {
        this.add_to_group(STOPPABLE)
        this.area_entered.connect(
            Callable.create(this, this.onAreaEntered)
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
        if (area instanceof Dice) {
            area.queue_free()
            this.sounds?.play()
            this.scored.emit()
        }
    }
}


