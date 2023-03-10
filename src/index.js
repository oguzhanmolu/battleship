import DeploymentPhase from './modules/deploymentPhase';
import PlayPhase from './modules/playPhase';

DeploymentPhase.createPlayerGameBoard();
DeploymentPhase.switchShipRotation();
DeploymentPhase.gridHoverEffects();
DeploymentPhase.deployShip();
DeploymentPhase.endDeploymentPhase();

PlayPhase.createComputerGameBoard();
PlayPhase.deployComputerShips();
