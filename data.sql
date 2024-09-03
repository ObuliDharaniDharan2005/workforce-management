-- Add a table for attendance tracking
CREATE TABLE attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    worker_id INTEGER,
    clock_in DATETIME,
    clock_out DATETIME,
    FOREIGN KEY(worker_id) REFERENCES users(id)
);

-- Add a table for performance metrics
CREATE TABLE performance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    worker_id INTEGER,
    date DATE,
    hours_worked INTEGER,
    tasks_completed INTEGER,
    FOREIGN KEY(worker_id) REFERENCES users(id)
);
