//default values
let heartCount = 0;
let coinCount = 100;
let copyCount = 0;
let callHistory = [];

//Update navbar counters
function updateNavbar() {
    document.getElementById('heart-count').textContent = heartCount;
    document.getElementById('coin-count').textContent = coinCount;
    document.getElementById('copy-count').textContent = copyCount;
}

//Heart functionality - increases count on every click
function handleHeartClick(button) {
    heartCount++;
    updateNavbar();
}

//Copy functionality
function handleCopyClick(button) {
    const number = button.getAttribute('data-number');
    
    //Copy to clipboard
    navigator.clipboard.writeText(number).then(() => {
        copyCount++;
        updateNavbar();
        alert(`Number ${number} copied to clipboard!`);
    }).catch(() => {
        //Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = number;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        copyCount++;
        updateNavbar();
        alert(`Number ${number} copied to clipboard`);
    });
}

//Call functionality
function handleCallClick(button) {
    const number = button.getAttribute('data-number');
    const service = button.getAttribute('data-service');
    
    //Check if enough coins
    if (coinCount < 20) {
        alert('You need at least 20 coins to make a call.');
        return;
    }
    
    //Deduct 20 coins
     coinCount -= 20;
    updateNavbar();
    
    //Show alert
    alert(`Calling ${service}: ${number}`);
    
       //Add to call history
    addToCallHistory(service, number);
}

//Add call to history
function addToCallHistory(serviceName, number) {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
            minute: '2-digit',
         second: '2-digit',
        hour12: true 
    });
    
    const callItem = {
        service: serviceName,
        number: number,
        time: currentTime
    };
    
    //Add to beginning of array
    callHistory.unshift(callItem);
    updateCallHistoryDisplay();
}

//Update call history display
function updateCallHistoryDisplay() {
    const historyContainer = document.getElementById('call-history-list');
    
    if (callHistory.length === 0) {
        historyContainer.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                No call history
            </div>
        `;
        return;
    }
    
    historyContainer.innerHTML = callHistory.map(call => `
        <div class="bg-[#fafafa] rounded-lg p-4 mb-3 w-full max-w-[352px] h-[85px] flex items-center justify-between">
            <div class="flex-1">
                <h1 class="text-[18px] font-semibold text-gray-900 leading-tight mb-1">${call.service}</h1>
                <p class="text-[18px] font-normal text-gray-500">${call.number}</p>
            </div>
            <div class="flex items-center ml-4">
                <span class="text-gray-600 text-sm font-medium">${call.time}</span>
            </div>
        </div>
    `).join('');
}

//Clear call history
function clearHistory() {
    callHistory = [];
    updateCallHistoryDisplay();
    alert('Call history cleared!');
}

//Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    
 //Set up heart button clicks
    document.querySelectorAll('.heart-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleHeartClick(this);
        });
    });
    
    //Set up copy button clicks
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleCopyClick(this);
        });
    });
    
    //Set up call button clicks
    document.querySelectorAll('.call-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleCallClick(this);
        });
    });
    
    //Set up clear history button
    const clearButton = document.getElementById('clear-history-btn');
    if (clearButton) {
        clearButton.addEventListener('click', function(e) {
            e.preventDefault();
            clearHistory();
        });
    }
    
    //display
    updateNavbar();
    updateCallHistoryDisplay();
});