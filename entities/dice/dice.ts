import { Area2D, randf, SceneNodes, Signal, Sprite2D, Variant, Vector2 } from "godot"
import { Export, ExportSignal } from "godot.annotations"
import { STOPPABLE } from "../../common/groups"

export default class Dice extends Area2D<SceneNodes['entities/dice/dice.tscn']> {
	
	@Export(Variant.Type.TYPE_FLOAT)
	speed: number = 120
	
	@Export(Variant.Type.TYPE_FLOAT)
	rotation_speed: number = 5
	
	@ExportSignal()
	declare game_over: Signal<() => void>

	sprite2d?: Sprite2D
	direction = 1

	_ready(): void {
		this.add_to_group(STOPPABLE)
		this.sprite2d = this.get_node('Sprite2D')
		this.direction = randf() < 0.5 ? -1 : 1
	}

	// Called every frame. 'delta' is the elapsed time since the previous frame.
	_physics_process(delta: number): void {
		this.sprite2d?.rotate(delta * this.rotation_speed * this.direction)
		this.translate(new Vector2(0, delta * this.speed))
		this.checkGameOver()
	}

	teste() {}

	private checkGameOver() {
		if (this.get_viewport_rect().end.y < this.position.y) {
			this.game_over.emit()
			this.destroy()
		}
	}

	public destroy() {
		this.queue_free()
	}
}
