// Enhanced mock data for student performance metrics
const studentMetrics = {
    Tom: {
        otherStatistics: {
            minutesPracticed: 325,
            dailyAverage: 12,
            dateStarted: "2023-01-10",
            loginStreak: 15,
            wordsAttempted: 222,
            wordsMastered: 54,
            practicedWords: "rose, scooter, resting",
            highInaccuracyWords: "rice, supper",
            accuracyPercentage: "87%"
        },
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
        otherStatistics: {
            minutesPracticed: 521,
            dailyAverage: 33,
            dateStarted: "2023-02-15",
            loginStreak: 7,
            wordsAttempted: 678,
            wordsMastered: 3,
            practicedWords: "bat, sat, great",
            highInaccuracyWords: "gallop, glow",
            accuracyPercentage: "64%"
        },
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
        otherStatistics: {
            minutesPracticed: 468,
            dailyAverage: 22,
            dateStarted: "2023-03-01",
            loginStreak: 20,
            wordsAttempted: 443,
            wordsMastered: 37,
            practicedWords: "house, orange, choose",
            highInaccuracyWords: "orangutan, kite",
            accuracyPercentage: "77%"
        },
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
    toggleChartsVisibility(false);
    
    // Add event listener for student dropdown
    const studentDropdown = document.getElementById('studentDropdown');
    if (studentDropdown) {
        studentDropdown.addEventListener('change', (e) => {
            if (e.target.value && e.target.value !== 'add') {
                updateChartsForStudent(e.target.value);
                updateOtherStatistics(e.target.value);
                toggleChartsVisibility(true);
            } else{
                toggleChartsVisibility(false);
            }
        });
    }
});

function createCharts() {
    // Initialize syllable count accuracy chart
    const syllableCountChart = document.getElementById('syllableCountAccuracyChart');
    if (syllableCountChart) {
        charts.syllableCountAccuracy = new Chart(syllableCountChart, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Accuracy (%)',
                    data: [],
                    backgroundColor: 'rgb(255, 159, 64)'
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

    // Initialize syllable shape charts
    const syllableShapeOpenClosedChart = document.getElementById('syllableShapeOpenClosedChart');
    if (syllableShapeOpenClosedChart) {
        charts.syllableShapeOpenClosed = new Chart(syllableShapeOpenClosedChart, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Accuracy (%)',
                    data: [],
                    backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)']
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    const syllableShapeVCVCVCChart = document.getElementById('syllableShapeVCVCVCChart');
    if (syllableShapeVCVCVCChart) {
        charts.syllableShapeVCVCVC = new Chart(syllableShapeVCVCVCChart, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Accuracy (%)',
                    data: [],
                    backgroundColor: ['rgb(75, 192, 192)', 'rgb(153, 102, 255)']
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Total Accuracy Pie Chart
    const totalAccuracyChart = document.getElementById('totalAccuracyChart');
    if (totalAccuracyChart) {
        charts.totalAccuracy = new Chart(totalAccuracyChart, {
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
    }

    // Sound Accuracy Bar Chart
    const soundAccuracyChart = document.getElementById('soundAccuracyChart');
    if (soundAccuracyChart) {
        charts.soundAccuracy = new Chart(soundAccuracyChart, {
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
    }

    // Location Accuracy Bar Chart
    const locationAccuracyChart = document.getElementById('locationAccuracyChart');
    if (locationAccuracyChart) {
        charts.locationAccuracy = new Chart(locationAccuracyChart, {
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
    }

    // Word Accuracy Pie Chart
    const wordAccuracyChart = document.getElementById('wordAccuracyChart');
    if (wordAccuracyChart) {
        charts.wordAccuracy = new Chart(wordAccuracyChart, {
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
    }

    // Minutes Practiced Line Chart
    const minutesPracticedChart = document.getElementById('minutesPracticedChart');
    if (minutesPracticedChart) {
        charts.minutesPracticed = new Chart(minutesPracticedChart, {
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
    }

    // Weekly Progress Chart
    const weeklyProgressChart = document.getElementById('weeklyProgressChart');
    if (weeklyProgressChart) {
        charts.weeklyProgress = new Chart(weeklyProgressChart, {
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
    }

    // Monthly Progress Chart
    const monthlyProgressChart = document.getElementById('monthlyProgressChart');
    if (monthlyProgressChart) {
        charts.monthlyProgress = new Chart(monthlyProgressChart, {
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
}

function updateChartsForStudent(studentName) {
    const studentData = studentMetrics[studentName];
    if (!studentData) {
        toggleChartsVisibility(false);
        return;
    }

    // Update each chart only if it exists
    Object.keys(charts).forEach(chartKey => {
        if (charts[chartKey] && studentData[chartKey]) {
            updateChartData(charts[chartKey], studentData[chartKey].labels, studentData[chartKey].data);
        }
    });
}

function updateChartData(chart, labels, data) {
    if (chart && chart.data) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.update();
    }
}

function toggleChartsVisibility(show) {
    const chartItems = document.querySelectorAll('.chart-item, .other-statistics');
    chartItems.forEach(item => {
        item.style.display = show ? 'block' : 'none';
    });
}


function updateOtherStatistics(studentName) {
    const stats = studentMetrics[studentName]?.otherStatistics;
    if (!stats) return;

    document.getElementById("minutesPracticed").innerText = stats.minutesPracticed || "N/A";
    document.getElementById("dailyAverage").innerText = stats.dailyAverage || "N/A";
    document.getElementById("dateStarted").innerText = stats.dateStarted || "N/A";
    document.getElementById("loginStreak").innerText = stats.loginStreak || "N/A";
    document.getElementById("wordsAttempted").innerText = stats.wordsAttempted || "N/A";
    document.getElementById("wordsMastered").innerText = stats.wordsMastered || "N/A";
    document.getElementById("practicedWords").innerText = stats.practicedWords || "N/A";
    document.getElementById("highInaccuracyWords").innerText = stats.highInaccuracyWords || "N/A";
    document.getElementById("accuracyPercentage").innerText = stats.accuracyPercentage || "N/A";
}