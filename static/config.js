const server = {
    port: 5000,
    token_key: "CAPSTONE",
    max_attempts: 2,
    //url: "http://localhost:5000"
    //url: "https://crazy-fish-tights.cyclic.app"
    url: "https://graphical-auth-server.onrender.com"
}

const smtp_settings = {
    user: "graphicalpassauth@gmail.com",
    password: "nutxswvvfjulubkn"
}

const db_settings = {
    username: "inix",
    password: "S2wjJiVOYbeIGNMm",
    db_name: "user-auth"
}

export { db_settings, server, smtp_settings }