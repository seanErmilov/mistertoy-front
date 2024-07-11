import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

import { toyService } from '../services/toy.service';
import { useDispatch, useSelector } from 'react-redux';
import { loadToys } from '../store/actions/toy.actions';
import { showErrorMsg } from '../services/event-bus.service';

ChartJS.register(ArcElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title, Tooltip, Legend);

export function DashChart() {
    const toys = useSelector(storeState => storeState.toyModule.toys);
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading);
    const [localToys, setLocalToys] = useState([]);


    useEffect(() => {
        if (!isLoading && toys.length) {
            setLocalToys(toys);
        }
    }, [isLoading, toys]);

    function getPriceLabel(label, toys) {
        return toys.reduce((acc, toy) => {
            if (toy.labels.includes(label)) {
                acc += toy.price;
            }
            return acc;
        }, 0);
    }

    function getPricePerLabel(labels, localToys) {
        return labels.map((label) => getPriceLabel(label, localToys));
    }

    const labels = toyService.getLabels();

    const dataForPricesPerLabel = {
        labels,
        datasets: [
            {
                label: '# of toys',
                data: labels.map(label => getPriceLabel(label, localToys)),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const lineLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };
    const data2 = {
        labels: lineLabels,
        datasets: [
            {
                label: 'Dataset 1',
                data: lineLabels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: lineLabels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return !isLoading && (
        <>
            <Line options={options} data={data2} />;
            <Doughnut data={dataForPricesPerLabel} />;
        </>
    );
}
