import PlayerActions ...

class PlayerStore {

  constructor() {
    this.state = {};
    PlayerActions.playerConnected.listen(this.onPlayer);
  }

  onPlayer() {

  }
}

export new PlayerStore();
