// SOAL 01: Kode program untuk atur1.js [cite: 19, 20, 21, 22, 23, 24, 25]
function showTime() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    // Menetapkan waktu ke elemen dengan id="clock"
    const clockElement = document.getElementById("clock");
    if (clockElement) {
        clockElement.textContent = " | " + time;
    }
}

// Memanggil showTime setiap 1000 milidetik (1 detik) [cite: 24]
setInterval(showTime, 1000);

// Memanggil showTime segera setelah skrip dimuat untuk tampilan awal [cite: 25]
showTime();
