import DeploymentPhase from './modules/deploymentPhase';
import GameBoard from './modules/gameboard';
import PlayPhase from './modules/playPhase';
import Ship from './modules/ship';
Ship.setPlayerShips();
Ship.setComputerShips();

DeploymentPhase.createPlayerGameBoard();
DeploymentPhase.deployPlayerShipsRandomly();
DeploymentPhase.switchShipRotation();
DeploymentPhase.gridHoverEffects();
DeploymentPhase.deployShip();
DeploymentPhase.endDeploymentPhase();
PlayPhase.createComputerGameBoard();
