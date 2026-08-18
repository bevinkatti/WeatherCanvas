import './styles/widget.css';
import { WeatherWidget } from './components/WeatherWidget.js';
import './components/TrayManager.js';

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

const widget = WeatherWidget();
app.appendChild(widget);
