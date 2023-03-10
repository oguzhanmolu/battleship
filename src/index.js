import DeploymentPhase from './modules/deploymentPhase';
import PlayPhase from './modules/playPhase';

DeploymentPhase.createPlayerGameBoard();
DeploymentPhase.deployShip();
DeploymentPhase.switchShipRotation();
DeploymentPhase.endDeploymentPhase();
PlayPhase.createComputerGameBoard();
