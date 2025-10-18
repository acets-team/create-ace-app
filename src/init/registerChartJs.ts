import {
  Chart,
  Legend,
  Tooltip,
  ArcElement, // doughnut
  BarElement, // bar
  LinearScale, // bar, line
  LineElement, // line
  PointElement, // line
  BarController, // bar
  CategoryScale, // bar, line
  LineController, // line
  DoughnutController, // doughnut
  Title as ChartJsTitle,
} from 'chart.js'

let registered = false

export function registerChartJs() {
  if (!registered) {
    Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartJsTitle, LineController, BarController, PointElement, LineElement, DoughnutController, ArcElement)
    Chart.defaults.font.size = 18
    registered = true
  }
}
