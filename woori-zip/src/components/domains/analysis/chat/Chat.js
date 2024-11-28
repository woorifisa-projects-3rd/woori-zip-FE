'use client';

import styles from './Chat.module.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart({ type = 'similar', data, activeCategory, onCategoryChange }) {
    if (!data?.items) return null;

    const chartData = {
        labels: data.labels,
        datasets: [{
            data: data.data,
            backgroundColor: data.colors,
            borderWidth: data.items.map(item => 
                item.key === activeCategory ? 2 : 0
            ),
            borderColor: '#000',
            hoverBorderWidth: 2,
            hoverBorderColor: '#000',
        }]
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        onClick: (_, elements) => {
            if (elements[0]) {
                const clickedItem = data.items[elements[0].index];
                onCategoryChange?.(clickedItem.key);
            }
        },
    };

    return (
        <div className={styles.chartWrapper}>
            <div className={styles.chartContainer}>
                <Pie data={chartData} options={chartOptions} />
            </div>
            <div className={styles.customLegend}>
                {data.items.map((item, index) => (
                    <div 
                        key={index} 
                        className={styles.legendItem}
                        onClick={() => onCategoryChange?.(item.key)}
                    >
                        <span
                            className={styles.legendBox}
                            style={{ backgroundColor: item.color }}
                        />
                        <span className={styles.legendText}>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}