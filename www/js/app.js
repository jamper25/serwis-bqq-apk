let appState = {
    connected: false,
    gatewayIP: '192.168.4.1',
    serviceLog: [],
    lastUpdate: null
};

function loadState() {
    const saved = localStorage.getItem('appState');
    if (saved) {
        appState = { ...appState, ...JSON.parse(saved) };
        document.getElementById('ipInput').value = appState.gatewayIP;
        updateServiceLogUI();
    }
}

function saveState() {
    localStorage.setItem('appState', JSON.stringify(appState));
}

function showMessage(text, type = 'error') {
    const el = type === 'error' ? document.getElementById('errorMsg') : document.getElementById('successMsg');
    el.textContent = text;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 3000);
}

async function connectToGateway() {
    const ip = document.getElementById('ipInput').value;
    if (!ip) {
        showMessage('Podaj adres IP bramki');
        return;
    }

    appState.gatewayIP = ip;
    saveState();

    try {
        const response = await fetch(`http://${i
