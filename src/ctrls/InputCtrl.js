import AirConsole from '../vendor/Air_Console';
import KeyboardController from './KeyboardController';

export default function inputController(input) {
  const gameUrl = document.location.href;

  if (gameUrl.includes('airconsole')) {
    return new AirConsole({ synchronize_time: true });
  }

  return new KeyboardController(input);
}
