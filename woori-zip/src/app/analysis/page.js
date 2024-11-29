'use server';

import Analysis from '../../components/domains/analysis/analysis/Analysis';
import { getConsumptionData } from '../api/analysis/analysisAPI';

export default async function AnalysisPage() {
    try {
        const response = await getConsumptionData();
        
        const processChartData = (data, type) => {
            if (!data || !type || !data.otherConsumption || !data.memberConsumption) {
                return { labels: [], data: [], colors: [] };
            }

            const chartData = type === 'similar' ? data.otherConsumption : data.memberConsumption;

            const items = [
                { key: 'book', label: '서적/문구', value: chartData.book || 0, color: '#5778A3' },
                { key: 'car', label: '자동차정비/유지', value: chartData.car || 0, color: '#A8C9E5' },
                { key: 'cloth', label: '의류', value: chartData.cloth || 0, color: '#E49343' },
                { key: 'culture', label: '문화/취미', value: chartData.culture || 0, color: '#F5C086' },
                { key: 'food', label: '식당/카페', value: chartData.food || 0, color: '#6B9F59' },
                { key: 'grocery', label: '음식료품', value: chartData.grocery || 0, color: '#9CCF85' }
            ];

            const sortedItems = items.sort((a, b) => b.value - a.value);

            return {
                labels: sortedItems.map(item => item.label),
                data: sortedItems.map(item => item.value),
                colors: sortedItems.map(item => item.color),
                items: sortedItems
            };
        };

        const similarChartData = processChartData(response, 'similar');
        const memberChartData = processChartData(response, 'member');
        const bestCategory = response.bestCategory.category;

        return (
            <Analysis
                similarChartData={similarChartData}
                memberChartData={memberChartData}
                bestCategory={bestCategory}
            />
        );
    } catch (error) {
        console.error('Error:', error.message);
        return <div>데이터를 가져오는 중 에러가 발생했습니다.</div>;
    }
}
