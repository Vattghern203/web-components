import { EdoButton } from './components/Button/button';

// Self-registering for the consumer
if (!customElements.get('edo-button')) {
  customElements.define('edo-button', EdoButton);
}

export { EdoButton };