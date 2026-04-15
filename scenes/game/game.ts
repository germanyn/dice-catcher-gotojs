import { Callable, Node, Node2D, print, randf_range, ResourceLoader, SceneNodes, Timer, Vector2 } from "godot";
import { STOPPABLE } from "../../common/groups";
import Dice from "../../entities/dice/dice";

export default class Game extends Node2D<SceneNodes['scenes/game/game.tscn'] & { _: Node }> {
	readonly MARGIN = 80
	readonly DICE = ResourceLoader.load('res://entities/dice/dice.tscn')
	spawnTimer?: Timer

	// Called when the node enters the scene tree for the first time.
	_ready(): void {
		this.spawnTimer = this.get_node('SpawnTimer')
		this.spawnTimer.timeout.connect(
			Callable.create(this, this.spawnDice)
		)
	}

	private spawnDice() {
		const newDice = this.DICE.instantiate()

		const vpr = this.get_viewport_rect()
		const randomX = randf_range(
			vpr.position.x + this.MARGIN,
			vpr.end.x - this.MARGIN
		)
		newDice.position = new Vector2(randomX, -80)
		newDice.game_over.connect(
			Callable.create(this, this.gameOver)
		)
		this.add_child(newDice)
	}

	private gameOver(): void {
		const nodes = this.get_tree().get_nodes_in_group(STOPPABLE)

		for(let node of nodes) {
			node.set_physics_process(false)
			this.spawnTimer?.stop()
		}

		print("Game over!")
	}
}

function isDice(node: Node): node is Dice {
	return node instanceof Dice
}
