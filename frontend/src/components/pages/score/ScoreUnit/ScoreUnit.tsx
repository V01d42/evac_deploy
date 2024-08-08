import { useEffect, useRef } from 'react';
import styles from './ScoreUnit.module.scss';
import Chart, { ChartConfiguration, ChartItem } from 'chart.js/auto';

// ボタンのコンポーネント
interface ScoreProps {
  scoreNum: number;
}

const ScoreUnit: React.FC<ScoreProps> = ({ scoreNum }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart<'doughnut'> | null>(null);

  const getBackgroundColor = (percentage: number) => {
    if (percentage < 30) {
      return 'rgba(255, 0, 0, 1)';
    } else if (percentage >= 30 && percentage <= 70) {
      return 'rgba(255, 255, 0, 1)';
    } else if (percentage > 70) {
      return 'rgba(0, 255, 255, 1)';
    }
  };

  const score = scoreNum;

  useEffect(() => {
    const ctx = canvasRef.current as ChartItem;
    if (ctx) {
      const percentage = (score / 5) * 100;

      const data = {
        datasets: [
          {
            data: [percentage, 100 - percentage],
            backgroundColor: [
              getBackgroundColor(percentage),
              'rgba(0, 0, 0, 0)',
            ],
            borderWidth: 0,
          },
        ],
      };

      const config: ChartConfiguration<'doughnut'> = {
        type: 'doughnut',
        data: data,
        options: {
          cutout: '80%',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              enabled: false,
            },
          },
        },
      };

      chartRef.current = new Chart(ctx, config);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [score]);

  return (
    <div className={styles.score_frame}>
      <h2 className={styles.color_rakuten}>あなたの自治体の避難所の評価は</h2>
      <div className={styles.chart}>
        <div className={styles.chartwrapper}>
          <canvas ref={canvasRef} id='doughnutChart'></canvas>
        </div>
        <p>
          <span>{score}</span>/5
        </p>
      </div>
      <div className={styles.chart_hanrei}>
        <div>
          <div></div>
          <p>：十分にある</p>
        </div>
        <div>
          <div></div>
          <p>：不足している</p>
        </div>
        <div>
          <div></div>
          <p>：とても不足している</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreUnit;
