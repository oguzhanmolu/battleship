import DeploymentPhase from './modules/deploymentPhase';
import GameBoard from './modules/gameboard';
import PlayPhase from './modules/playPhase';

DeploymentPhase.createPlayerGameBoard();
DeploymentPhase.switchShipRotation();
DeploymentPhase.gridHoverEffects();
DeploymentPhase.deployShip();
DeploymentPhase.endDeploymentPhase();

PlayPhase.createComputerGameBoard();
GameBoard.deployComputerShips();
