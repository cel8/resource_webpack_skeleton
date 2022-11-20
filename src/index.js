import 'Style/style.css';
import UiController from 'View/ui-controller';

const uiController = new UiController();

window.onload = () => {
  uiController.doLoadUI();
};
