document.addEventListener('DOMContentLoaded', () => {
    const scheduleForm = document.getElementById('schedule-form');
    const attendanceForm = document.getElementById('attendance-form');
    const performanceForm = document.getElementById('performance-form');

    const scheduleList = document.getElementById('schedule-list');
    const attendanceList = document.getElementById('attendance-list');
    const performanceList = document.getElementById('performance-list');

    // Shift Scheduling
    scheduleForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const date = document.getElementById('schedule-date').value;
        const shiftId = document.getElementById('shift-id').value;
        const workerId = document.getElementById('worker-id-schedule').value;

        fetch('/schedules', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date, shift_id: shiftId, worker_id: workerId })
        })
        .then(() => loadSchedules());
    });

    function loadSchedules() {
        fetch('/schedules')
            .then(response => response.json())
            .then(data => {
                scheduleList.innerHTML = '';
                data.schedules.forEach(schedule => {
                    const li = document.createElement('li');
                    li.textContent = `Date: ${schedule.date}, Shift ID: ${schedule.shift_id}, Worker ID: ${schedule.worker_id}`;
                    scheduleList.appendChild(li);
                });
            });
    }

    // Real-Time Attendance
    document.getElementById('clock-in').addEventListener('click', () => {
        const workerId = document.getElementById('attendance-worker-id').value;
        fetch('/attendance/clock-in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ worker_id: workerId })
        })
        .then(() => loadAttendance());
    });

    document.getElementById('clock-out').addEventListener('click', () => {
        const workerId = document.getElementById('attendance-worker-id').value;
        fetch('/attendance/clock-out', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ worker_id: workerId })
        })
        .then(() => loadAttendance());
    });

    function loadAttendance() {
        fetch('/attendance')
            .then(response => response.json())
            .then(data => {
                attendanceList.innerHTML = '';
                data.attendance.forEach(record => {
                    const li = document.createElement('li');
                    li.textContent = `Worker ID: ${record.worker_id}, Clock In: ${record.clock_in}, Clock Out: ${record.clock_out}`;
                    attendanceList.appendChild(li);
                });
            });
    }

    // Performance Metrics
    performanceForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const workerId = document.getElementById('performance-worker-id').value;
        const date = document.getElementById('performance-date').value;
        const hoursWorked = document.getElementById('hours-worked').value;
        const tasksCompleted = document.getElementById('tasks-completed').value;

        fetch('/performance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ worker_id: workerId, date, hours_worked: hoursWorked, tasks_completed: tasksCompleted })
        })
        .then(() => loadPerformanceMetrics());
    });

    function loadPerformanceMetrics() {
        fetch('/performance')
            .then(response => response.json())
            .then(data => {
                performanceList.innerHTML = '';
                data.performance.forEach(metric => {
                    const li = document.createElement('li');
                    li.textContent = `Worker ID: ${metric.worker_id}, Date: ${metric.date}, Hours Worked: ${metric.hours_worked}, Tasks Completed: ${metric.tasks_completed}`;
                    performanceList.appendChild(li);
                });
            });
    }

    // Initial load
    loadSchedules();
    loadAttendance();
    loadPerformanceMetrics();
});
