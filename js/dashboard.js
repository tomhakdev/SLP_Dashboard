// Enhanced mock data for student performance metrics
const studentMetrics = {
    Tom: {
        totalAccuracy: {
            labels: ['Correct', 'Incorrect', 'Unsure'],
            data: [75, 15, 10]
        },
        soundAccuracy: {
            labels: ['S', 'Z', 'R'],
            data: [75, 90, 55]
        },
        locationAccuracy: {
            labels: ['Beginning', 'Middle', 'End'],
            data: [45, 80, 99]
        },
        syllableCountAccuracy: {
            labels: ['1 Syllable', '2 Syllables', '3+ Syllables'],
            data: [85, 80, 65]
        },
        syllableShapeOpenClosed: {
            labels: ['Open', 'Closed'],
            data: [67, 67]
        },
        syllableShapeVCVCVC: {
            labels: ['VCV', 'CVC'],
            data: [90, 80]
        },
        wordAccuracy: {
            labels: ['Correct', 'Incorrect', 'Unsure'],
            data: [90, 5, 5]
        },
        minutesPracticed: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [150, 120, 60, 80]
        },
        weeklyProgress: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            data: [80, 60, 55, 90, 85]
        },
        monthlyProgress: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            data: [40, 48, 90, 96, 75]
        }
    },
    Simon: {
        totalAccuracy: {
            labels: ['Correct', 'Incorrect', 'Unsure'],
            data: [15, 70, 15]
        },
        soundAccuracy: {
            labels: ['K', 'T', 'G', 'TH', 'CH'],
            data: [30, 25, 40, 75, 80]
        },
        locationAccuracy: {
            labels: ['Beginning', 'Middle', 'End'],
            data: [20, 40, 34]
        },
        syllableCountAccuracy: {
            labels: ['1 Syllable', '2 Syllables', '3+ Syllables'],
            data: [70, 30, 15]
        },
        syllableShapeOpenClosed: {
            labels: ['Open', 'Closed'],
            data: [40, 55]
        },
        syllableShapeVCVCVC: {
            labels: ['VCV', 'CVC'],
            data: [15, 90]
        },
        wordAccuracy: {
            labels: ['Correct', 'Incorrect', 'Unsure'],
            data: [40, 20, 40]
        },
        minutesPracticed: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [150, 100, 140, 160]
        },
        weeklyProgress: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            data: [62, 89, 22, 66, 45]
        },
        monthlyProgress: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            data: [62, 80, 44, 52, 18]
        }
    },
    Yingel: {
        totalAccuracy: {
            labels: ['Correct', 'Incorrect', 'Unsure'],
            data: [55, 20, 25]
        },
        soundAccuracy: {
            labels: ['R', 'L', 'S', 'TH', 'CH', 'SH'],
            data: [82, 78, 85, 70, 75, 80]
        },
        locationAccuracy: {
            labels: ['Beginning', 'Middle', 'End'],
            data: [85, 75, 70]
        },
        syllableCountAccuracy: {
            labels: ['1 Syllable', '2 Syllables', '3+ Syllables'],
            data: [88, 82, 75]
        },
        syllableShapeOpenClosed: {
            labels: ['Open', 'Closed'],
            data: [82, 78]
        },
        syllableShapeVCVCVC: {
            labels: ['VCV', 'CVC'],
            data: [75, 80]
        },
        wordAccuracy: {
            labels: ['Correct', 'Incorrect', 'Unsure'],
            data: [70, 20, 10]
        },
        minutesPracticed: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [120, 150, 140, 180]
        },
        weeklyProgress: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            data: [65, 70, 75, 80, 85]
        },
        monthlyProgress: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            data: [60, 68, 75, 82, 88]
        }
    },
    // Add similar data structure for other students...
};

// Chart instances
let charts = {
    totalAccuracy: null,
    soundAccuracy: null,
    locationAccuracy: null,
    syllableCountAccuracy: null,
    syllableShapeOpenClosed: null,
    syllableShapeVCVCVC: null,
    wordAccuracy: null,
    minutesPracticed: null,
    weeklyProgress: null,
    monthlyProgress: null
};

// Initialize charts when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createCharts();
    
    // Add event listener for student dropdown
    const studentDropdown = document.getElementById('studentDropdown');
    studentDropdown.addEventListener('change', (e) => {
        if (e.target.value && e.target.value !== 'add') {
            updateChartsForStudent(e.target.value);
        }
    });
});

function createCharts() {
    // Total Accuracy Pie Chart
    charts.totalAccuracy = new Chart(document.getElementById('totalAccuracyChart'), {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                label: 'Accuracy (%)',
                data: [],
                backgroundColor: [
                    'rgb(75, 192, 192)',
                    'rgb(255, 99, 132)',
                    'rgb(255, 206, 86)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });

    // Sound Accuracy Bar Chart
    charts.soundAccuracy = new Chart(document.getElementById('soundAccuracyChart'), {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Accuracy (%)',
                data: [],
                backgroundColor: 'rgb(54, 162, 235)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Location Accuracy Bar Chart
    charts.locationAccuracy = new Chart(document.getElementById('locationAccuracyChart'), {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Accuracy (%)',
                data: [],
                backgroundColor: 'rgb(153, 102, 255)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Similar pattern for other charts...
    // Word Accuracy Pie Chart
    charts.wordAccuracy = new Chart(document.getElementById('wordAccuracyChart'), {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    'rgb(75, 192, 192)',
                    'rgb(255, 99, 132)',
                    'rgb(255, 206, 86)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });

    // Minutes Practiced Line Chart
    charts.minutesPracticed = new Chart(document.getElementById('minutesPracticedChart'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Minutes',
                data: [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Progress Charts
    charts.weeklyProgress = new Chart(document.getElementById('weeklyProgressChart'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Progress (%)',
                data: [],
                borderColor: 'rgb(153, 102, 255)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    charts.monthlyProgress = new Chart(document.getElementById('monthlyProgressChart'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Progress (%)',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function updateChartsForStudent(studentName) {
    const studentData = studentMetrics[studentName];
    if (!studentData) return;

    // Update Total Accuracy Chart
    updateChartData(charts.totalAccuracy, studentData.totalAccuracy.labels, studentData.totalAccuracy.data);

    // Update Sound Accuracy Chart
    updateChartData(charts.soundAccuracy, studentData.soundAccuracy.labels, studentData.soundAccuracy.data);

    // Update Location Accuracy Chart
    updateChartData(charts.locationAccuracy, studentData.locationAccuracy.labels, studentData.locationAccuracy.data);

    // Update all other charts similarly
    updateChartData(charts.syllableCountAccuracy, studentData.syllableCountAccuracy.labels, studentData.syllableCountAccuracy.data);
    updateChartData(charts.syllableShapeOpenClosed, studentData.syllableShapeOpenClosed.labels, studentData.syllableShapeOpenClosed.data);
    updateChartData(charts.syllableShapeVCVCVC, studentData.syllableShapeVCVCVC.labels, studentData.syllableShapeVCVCVC.data);
    updateChartData(charts.wordAccuracy, studentData.wordAccuracy.labels, studentData.wordAccuracy.data);
    updateChartData(charts.minutesPracticed, studentData.minutesPracticed.labels, studentData.minutesPracticed.data);
    updateChartData(charts.weeklyProgress, studentData.weeklyProgress.labels, studentData.weeklyProgress.data);
    updateChartData(charts.monthlyProgress, studentData.monthlyProgress.labels, studentData.monthlyProgress.data);
}

function updateChartData(chart, labels, data) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}