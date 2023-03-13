import DeploymentPhase from './modules/deploymentPhase';
import PlayPhase from './modules/playPhase';
import Ship from './modules/ship';

Ship.setPlayerShips();
Ship.setComputerShips();
Ship.switchShipRotation();

DeploymentPhase.createPlayerGameBoard();
DeploymentPhase.deployPlayerShipsRandomly();
DeploymentPhase.gridHoverEffects();
DeploymentPhase.deployShip();
DeploymentPhase.endDeploymentPhase();

PlayPhase.createComputerGameBoard();
PlayPhase.deployComputerShips();
PlayPhase.bombardGameFieldOnClick();
