import { AudioStream, AudioStreamPlayer, Callable, InputEvent, Label, Node, Node2D, print, randf_range, ResourceLoader, SceneNodes, Timer, Vector2 } from "godot";
import { STOPPABLE } from "../../common/groups";
import { OnReady } from "godot.annotations";
import Fox from "../../entities/fox/fox";

export default class Game extends Node2D<SceneNodes['scenes/game/game.tscn'] & { _: Node }> {
	readonly MARGIN = 80
	readonly DICE = ResourceLoader.load('res://entities/dice/dice.tscn')
	readonly GAME_OVER = ResourceLoader.load("res://assets/game_over.wav")

	@OnReady('Pausable')
	pausable!: Node

	@OnReady('Pausable/SpawnTimer')
	spawnTimer!: Timer

	@OnReady('Pausable/Fox')
	fox!: Fox

	@OnReady('ScoreLabel')
	scoreLabel!: Label

	@OnReady('Music')
	music!: AudioStreamPlayer

	score = 0

	// Called when the node enters the scene tree for the first time.
	_ready(): void {
		this.spawnTimer.timeout.connect(
			Callable.create(this, this.spawnDice)
		)
		this.fox.scored.connect(
			Callable.create(this, this.onScore)
		)
	}

	onScore() {
		++this.score
		this.scoreLabel.text = this.score.toString().padStart(4, '0')
	}

	_unhandled_input(event: InputEvent): void {
		if (event.is_action_pressed('reset')) {
			this.reloadGame()
		}
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
		this.pausable.add_child(newDice)
	}

	private gameOver(): void {
		this.music.stop()
		this.music.stream = this.GAME_OVER
		this.music.play()
		this.get_tree().paused = true
	}

	private reloadGame() {
		this.get_tree().reload_current_scene()
	}

	private pauseAll() {
		this.spawnTimer?.stop()

		const nodes = this.get_tree().get_nodes_in_group(STOPPABLE)

		for(let node of nodes) {
			node.set_physics_process(false)
		}
	}
}
