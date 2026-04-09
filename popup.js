// DOM Elements
const elements = {
    httpMethod: document.getElementById('http-method'),
    url: document.getElementById('url'),
    sendRequest: document.getElementById('send-request'),
    responseStatus: document.getElementById('response-status'),
    responseTime: document.getElementById('response-time'),
    responseBody: document.getElementById('response-body'),
    addHeader: document.getElementById('add-header'),
    headersList: document.getElementById('headers-list'),
    paramsList: document.getElementById('params-list'),
    addParam: document.getElementById('add-param'),
    requestBody: document.getElementById('request-body'),
    bodyType: document.getElementById('body-type'),
    importCurl: document.getElementById('import-curl'),
    exportCurl: document.getElementById('export-curl'),
    importModal: document.getElementById('import-modal'),
    closeModal: document.querySelector('.close-modal'),
    curlInput: document.getElementById('curl-input'),
    cancelImport: document.getElementById('cancel-import'),
    confirmImport: document.getElementById('confirm-import'),
    saveRequest: document.getElementById('save-request'),
    showFavorites: document.getElementById('show-favorites'),
    favoritesModal: document.getElementById('favorites-modal'),
    favoritesList: document.getElementById('favorites-list'),
    closeFavorites: document.getElementById('close-favorites'),
    tabButtons: document.querySelectorAll('.tab-button'),
    tabContents: document.querySelectorAll('.tab-content'),
    beautifyRequest: document.getElementById('beautify-request'),
    beautifyResponse: document.getElementById('beautify-response'),
    copyResponse: document.getElementById('copy-response'),
    copyToJson: document.getElementById('copy-to-json'),
    // Menu elements
    menuButtons: document.querySelectorAll('.menu-button'),
    menuContents: document.querySelectorAll('.menu-content'),
    // JSON Tools
    jsonInput: document.getElementById('json-input'),
    jsonOutput: document.getElementById('json-output'),
    jsonTree: document.getElementById('json-tree'),
    beautifyJson: document.getElementById('beautify-json'),
    minifyJson: document.getElementById('minify-json'),
    copyJson: document.getElementById('copy-json'),
    // Base64 Tools
    base64Input: document.getElementById('base64-input'),
    base64Output: document.getElementById('base64-output'),
    encodeBase64: document.getElementById('encode-base64'),
    decodeBase64: document.getElementById('decode-base64'),
    copyBase64: document.getElementById('copy-base64'),
    // URL Tools
    urlInput: document.getElementById('url-input'),
    urlOutput: document.getElementById('url-output'),
    encodeUrl: document.getElementById('encode-url'),
    decodeUrl: document.getElementById('decode-url'),
    copyUrl: document.getElementById('copy-url'),
    // Time Tool elements
        currentTime: document.getElementById('current-time'),
        unixTimestamp: document.getElementById('unix-timestamp'),
        timestampUnit: document.getElementById('timestamp-unit'),
        dateTime: document.getElementById('date-time'),
        convertToDate: document.getElementById('convert-to-date'),
        convertToTimestamp: document.getElementById('convert-to-timestamp'),
        convertCurrentToTimestamp: document.getElementById('convert-current-to-timestamp'),
        refreshCurrentTime: document.getElementById('refresh-current-time'),
        copyTimeResult: document.getElementById('copy-time-result'),
        timeResult: document.getElementById('time-result'),
        // Time Zone Conversion elements
        sourceTimezone: document.getElementById('source-timezone'),
        sourceTime: document.getElementById('source-time'),
        targetTimezone: document.getElementById('target-timezone'),
        targetTime: document.getElementById('target-time'),
        convertTimezone: document.getElementById('convert-timezone'),
    // MD5 Tools
    md5Input: document.getElementById('md5-input'),
    md5Output: document.getElementById('md5-output'),
    generateMd5: document.getElementById('generate-md5'),
    copyMd5: document.getElementById('copy-md5'),
    // Diff Tools
    diffLeft: document.getElementById('diff-left'),
    diffRight: document.getElementById('diff-right'),
    diffLeftLines: document.getElementById('diff-left-lines'),
    diffRightLines: document.getElementById('diff-right-lines'),
    diffDetails: document.getElementById('diff-details'),
    compareDiff: document.getElementById('compare-diff'),
    clearDiff: document.getElementById('clear-diff'),
    moveLeft: document.getElementById('move-left'),
    moveRight: document.getElementById('move-right')
};

// Initialize the extension
function init() {
    setupEventListeners();
    setupDefaultHeaders();
    updateCurrentTime();
}

function updateCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds},${milliseconds}`;
    elements.currentTime.value = formattedTime;
}

// Setup event listeners
function setupEventListeners() {
    // Send request
    elements.sendRequest.addEventListener('click', sendHttpRequest);
    
    // Add header
    elements.addHeader.addEventListener('click', addHeader);
    
    // URL change event for parsing query string
    elements.url.addEventListener('input', parseUrlQueryString);
    
    // Add param
    elements.addParam.addEventListener('click', addParam);
    
    // Tab switching
    elements.tabButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button.dataset.tab));
    });
    
    // Import cURL
    elements.importCurl.addEventListener('click', () => elements.importModal.style.display = 'block');
    elements.closeModal.addEventListener('click', () => elements.importModal.style.display = 'none');
    elements.cancelImport.addEventListener('click', () => elements.importModal.style.display = 'none');
    elements.confirmImport.addEventListener('click', importCurl);
    
    // Export cURL
    elements.exportCurl.addEventListener('click', exportCurl);
    
    // Save request
    elements.saveRequest.addEventListener('click', saveRequest);
    
    // Show favorites
    elements.showFavorites.addEventListener('click', showFavorites);
    
    // Close favorites modal
    elements.closeFavorites.addEventListener('click', () => elements.favoritesModal.style.display = 'none');
    
    document.querySelector('#favorites-modal .close-modal').addEventListener('click', () => elements.favoritesModal.style.display = 'none');
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === elements.favoritesModal) {
            elements.favoritesModal.style.display = 'none';
        }
    });
    
    // Beautify JSON
    elements.beautifyRequest.addEventListener('click', () => beautifyJSON(elements.requestBody));
    elements.beautifyResponse.addEventListener('click', () => beautifyJSON(elements.responseBody));
    
    // Response copy buttons
    elements.copyResponse.addEventListener('click', copyResponse);
    elements.copyToJson.addEventListener('click', copyToJson);
    
    // Menu switching
    elements.menuButtons.forEach(button => {
        button.addEventListener('click', () => switchMenu(button.dataset.menu));
    });
    
    // JSON Tools
    elements.beautifyJson.addEventListener('click', beautifyJsonTool);
    elements.minifyJson.addEventListener('click', minifyJsonTool);
    elements.copyJson.addEventListener('click', copyJsonOutput);
    elements.jsonOutput.addEventListener('input', updateTreeFromOutput);
    
    // Base64 Tools
    elements.encodeBase64.addEventListener('click', encodeBase64);
    elements.decodeBase64.addEventListener('click', decodeBase64);
    elements.copyBase64.addEventListener('click', copyBase64Output);
    
    // URL Tools
    elements.encodeUrl.addEventListener('click', encodeUrl);
    elements.decodeUrl.addEventListener('click', decodeUrl);
    elements.copyUrl.addEventListener('click', copyUrlOutput);
    
    // Time Tool
        elements.refreshCurrentTime.addEventListener('click', updateCurrentTime);
        elements.unixTimestamp.addEventListener('input', detectTimestampUnit);
        elements.convertToDate.addEventListener('click', convertToDate);
        elements.convertToTimestamp.addEventListener('click', convertToTimestamp);
        elements.convertCurrentToTimestamp.addEventListener('click', convertCurrentToTimestamp);
        elements.copyTimeResult.addEventListener('click', copyTimeResult);
        // Time Zone Conversion
        elements.convertTimezone.addEventListener('click', convertTimezone);
    
    // MD5 Tools
    elements.generateMd5.addEventListener('click', generateMd5);
    elements.copyMd5.addEventListener('click', copyMd5Output);
    
    // Diff Tools
    elements.compareDiff.addEventListener('click', compareTextDiff);
    elements.clearDiff.addEventListener('click', clearTextDiff);
    // Rebind move buttons with direct DOM references
    document.getElementById('move-left').addEventListener('click', function() {
        const rightTextarea = document.getElementById('diff-right');
        const leftTextarea = document.getElementById('diff-left');
        const rightLines = rightTextarea.value.split('\n');
        const leftLines = leftTextarea.value.split('\n');
        
        // Get selected line in right textarea
        const cursorPosition = rightTextarea.selectionStart;
        const rightText = rightTextarea.value;
        let currentPosition = 0;
        let selectedLineIndex = 0;
        
        for (let i = 0; i < rightLines.length; i++) {
            currentPosition += rightLines[i].length + 1; // +1 for newline
            if (currentPosition > cursorPosition) {
                selectedLineIndex = i;
                break;
            }
        }
        
        // Move selected line from right to left
        const selectedLine = rightLines[selectedLineIndex];
        if (selectedLine !== undefined) {
            const newLeftLines = [...leftLines];
            newLeftLines[selectedLineIndex] = selectedLine;
            leftTextarea.value = newLeftLines.join('\n');
            updateLineNumbers();
            compareTextDiff();
        }
    });
    document.getElementById('move-right').addEventListener('click', function() {
        const leftTextarea = document.getElementById('diff-left');
        const rightTextarea = document.getElementById('diff-right');
        const leftLines = leftTextarea.value.split('\n');
        const rightLines = rightTextarea.value.split('\n');
        
        // Get selected line in left textarea
        const cursorPosition = leftTextarea.selectionStart;
        const leftText = leftTextarea.value;
        let currentPosition = 0;
        let selectedLineIndex = 0;
        
        for (let i = 0; i < leftLines.length; i++) {
            currentPosition += leftLines[i].length + 1; // +1 for newline
            if (currentPosition > cursorPosition) {
                selectedLineIndex = i;
                break;
            }
        }
        
        // Move selected line from left to right
        const selectedLine = leftLines[selectedLineIndex];
        if (selectedLine !== undefined) {
            const newRightLines = [...rightLines];
            newRightLines[selectedLineIndex] = selectedLine;
            rightTextarea.value = newRightLines.join('\n');
            updateLineNumbers();
            compareTextDiff();
        }
    });
    elements.diffLeft.addEventListener('click', showLineDiff);
    elements.diffRight.addEventListener('click', showLineDiff);
    elements.diffLeft.addEventListener('input', updateLineNumbers);
    elements.diffRight.addEventListener('input', updateLineNumbers);
    // Add scroll sync for line numbers and overlays
    elements.diffLeft.addEventListener('scroll', syncScroll);
    elements.diffRight.addEventListener('scroll', syncScroll);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === elements.importModal) {
            elements.importModal.style.display = 'none';
        }
    });
}

// Setup default headers
function setupDefaultHeaders() {
    const defaultHeaders = [
        { name: 'Content-Type', value: 'application/json' }
    ];
    
    defaultHeaders.forEach(header => {
        const headerItem = createHeaderItem();
        headerItem.querySelector('.header-name').value = header.name;
        headerItem.querySelector('.header-value').value = header.value;
        elements.headersList.appendChild(headerItem);
    });
}

// Create a new header item
function createHeaderItem() {
    const headerItem = document.createElement('div');
    headerItem.className = 'header-item';
    headerItem.innerHTML = `
        <input type="text" class="header-name" placeholder="Key">
        <input type="text" class="header-value" placeholder="Value">
        <button class="remove-header">×</button>
    `;
    
    // Add event listener for remove button
    headerItem.querySelector('.remove-header').addEventListener('click', () => {
        headerItem.remove();
    });
    
    return headerItem;
}

// Create a new param item
function createParamItem(name = '', value = '') {
    const paramItem = document.createElement('div');
    paramItem.className = 'param-item';
    paramItem.innerHTML = `
        <input type="text" class="param-name" placeholder="Key" value="${name}">
        <input type="text" class="param-value" placeholder="Value" value="${value}">
        <button class="remove-param">×</button>
    `;
    
    // Add event listener for remove button
    paramItem.querySelector('.remove-param').addEventListener('click', () => {
        paramItem.remove();
    });
    
    return paramItem;
}

// Add a new param
function addParam() {
    const paramItem = createParamItem();
    elements.paramsList.appendChild(paramItem);
}

// Parse URL query string
function parseUrlQueryString() {
    const url = elements.url.value;
    if (!url) return;
    
    try {
        const urlObj = new URL(url);
        const searchParams = urlObj.searchParams;
        
        // Clear existing params
        elements.paramsList.innerHTML = '';
        
        // Add parsed params
        searchParams.forEach((value, key) => {
            const paramItem = createParamItem(key, value);
            elements.paramsList.appendChild(paramItem);
        });
    } catch (e) {
        // Invalid URL, do nothing
    }
}

// Add a new header
function addHeader() {
    const headerItem = createHeaderItem();
    elements.headersList.appendChild(headerItem);
}

// Switch between tabs
function switchTab(tabName) {
    // Update tab buttons
    elements.tabButtons.forEach(button => {
        button.classList.remove('active');
        if (button.dataset.tab === tabName) {
            button.classList.add('active');
        }
    });
    
    // Update tab contents
    elements.tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `${tabName}-content`) {
            content.classList.add('active');
        }
    });
}

// Send HTTP request
async function sendHttpRequest() {
    let url = elements.url.value;
    const method = elements.httpMethod.value;
    
    if (!url) {
        alert('Please enter a URL');
        return;
    }
    
    // Get headers
    const headers = {};
    const headerItems = elements.headersList.querySelectorAll('.header-item');
    headerItems.forEach(item => {
        const name = item.querySelector('.header-name').value;
        const value = item.querySelector('.header-value').value;
        if (name && value) {
            headers[name] = value;
        }
    });
    
    // Get params and build query string
    const paramItems = elements.paramsList.querySelectorAll('.param-item');
    const params = new URLSearchParams();
    let hasParams = false;
    
    paramItems.forEach(item => {
        const name = item.querySelector('.param-name').value;
        const value = item.querySelector('.param-value').value;
        if (name) {
            params.append(name, value);
            hasParams = true;
        }
    });
    
    // Add params to URL
    if (hasParams) {
        const urlObj = new URL(url);
        // Clear existing search params
        urlObj.search = '';
        // Add only the params from the UI
        params.forEach((value, key) => {
            urlObj.searchParams.append(key, value);
        });
        url = urlObj.toString();
    }
    
    // Get request body
    let body = null;
    const bodyType = elements.bodyType?.value || 'json';
    const bodyContent = elements.requestBody.value;
    
    if (bodyContent) {
        if (bodyType === 'json') {
            try {
                body = JSON.parse(bodyContent);
                headers['Content-Type'] = 'application/json';
            } catch (e) {
                alert('Invalid JSON in request body');
                return;
            }
        } else if (bodyType === 'form') {
            try {
                const formData = new URLSearchParams();
                const formPairs = bodyContent.split('&');
                formPairs.forEach(pair => {
                    const [key, value] = pair.split('=');
                    if (key) {
                        formData.append(decodeURIComponent(key), decodeURIComponent(value || ''));
                    }
                });
                body = formData;
                headers['Content-Type'] = 'application/x-www-form-urlencoded';
            } catch (e) {
                alert('Invalid form data format');
                return;
            }
        } else {
            // Plain text
            body = bodyContent;
        }
    }
    
    // Show loading state
    elements.sendRequest.textContent = 'Sending...';
    elements.sendRequest.classList.add('loading');
    elements.responseStatus.textContent = 'Loading...';
    elements.responseTime.textContent = '';
    elements.responseBody.textContent = '';
    
    const startTime = performance.now();
    
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    try {
        console.log(headers)
        const response = await fetch(url, {
            method,
            headers,
            body: body ? (typeof body === 'object' && !(body instanceof URLSearchParams) ? JSON.stringify(body) : body) : undefined,
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        const endTime = performance.now();
        const responseTime = (endTime - startTime).toFixed(2);
        
        // Get response data
        let responseData;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            responseData = await response.json();
        } else {
            responseData = await response.text();
        }
        
        // Display response
        elements.responseStatus.textContent = `${response.status} ${response.statusText}`;
        elements.responseStatus.className = response.ok ? 'success' : 'error';
        elements.responseTime.textContent = `${responseTime}ms`;
        elements.responseBody.textContent = typeof responseData === 'object' 
            ? JSON.stringify(responseData, null, 2) 
            : responseData;
        
    } catch (error) {
        clearTimeout(timeoutId);
        const endTime = performance.now();
        const responseTime = (endTime - startTime).toFixed(2);
        
        elements.responseStatus.textContent = 'Error';
        elements.responseStatus.className = 'error';
        elements.responseTime.textContent = `${responseTime}ms`;
        
        if (error.name === 'AbortError') {
            elements.responseBody.textContent = 'Error: Request timeout (5 seconds)';
        } else {
            elements.responseBody.textContent = `Error: ${error.message}`;
        }
    } finally {
        // Reset loading state
        elements.sendRequest.textContent = 'Send Request';
        elements.sendRequest.classList.remove('loading');
    }
}

// Import cURL command
function importCurl() {
    const curlCommand = elements.curlInput.value.trim();
    if (!curlCommand) {
        alert('Please enter a cURL command');
        return;
    }
    
    try {
        // Parse cURL command
        const parsed = parseCurlCommand(curlCommand);
        
        // Update form fields
        elements.httpMethod.value = parsed.method;
        elements.url.value = parsed.url;
        
        // Clear existing headers
        elements.headersList.innerHTML = '';
        
        // Add parsed headers
        for (const [name, value] of Object.entries(parsed.headers)) {
            const headerItem = createHeaderItem();
            headerItem.querySelector('.header-name').value = name;
            headerItem.querySelector('.header-value').value = value;
            elements.headersList.appendChild(headerItem);
        }
        
        // Update request body
        if (parsed.body) {
            elements.requestBody.value = typeof parsed.body === 'object' 
                ? JSON.stringify(parsed.body, null, 2) 
                : parsed.body;
        }
        
        // Close modal
        elements.importModal.style.display = 'none';
        elements.curlInput.value = '';
        
        alert('cURL command imported successfully!');
        
    } catch (error) {
        alert(`Error parsing cURL command: ${error.message}`);
    }
}

// Export as cURL command
function exportCurl() {
    const method = elements.httpMethod.value;
    const url = elements.url.value;
    
    if (!url) {
        alert('Please enter a URL');
        return;
    }
    
    // Get headers
    const headers = {};
    const headerItems = elements.headersList.querySelectorAll('.header-item');
    headerItems.forEach(item => {
        const name = item.querySelector('.header-name').value;
        const value = item.querySelector('.header-value').value;
        if (name && value) {
            headers[name] = value;
        }
    });
    
    // Get request body
    const body = elements.requestBody.value;
    
    // Build cURL command
    let curlCommand = `curl -X ${method} "${url}"`;
    
    // Add headers
    for (const [name, value] of Object.entries(headers)) {
        curlCommand += ` \\n  -H "${name}: ${value}"`;
    }
    
    // Add body
    if (body) {
        curlCommand += ` \\n  -d '${body}'`;
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(curlCommand).then(() => {
        alert('cURL command copied to clipboard!');
    }).catch(err => {
        alert('Failed to copy cURL command: ', err);
    });
}

// Beautify JSON function
function beautifyJSON(element) {
    try {
        const content = element.value || element.textContent;
        if (!content) {
            alert('No content to beautify');
            return;
        }
        
        // Parse JSON
        const parsed = JSON.parse(content);
        
        // Beautify JSON with indentation
        const beautified = JSON.stringify(parsed, null, 2);
        
        // Update element content
        if (element.value !== undefined) {
            element.value = beautified;
        } else {
            element.textContent = beautified;
        }
        
    } catch (error) {
        alert('Error beautifying JSON: ' + error.message);
    }
}

// Parse cURL command (simplified version)
function parseCurlCommand(curlCommand) {
    const result = {
        method: 'GET',
        url: '',
        headers: {},
        body: null
    };
    
    // Remove 'curl ' prefix
    let command = curlCommand.replace(/^curl\s+/i, '');
    
    // Parse method
    const methodMatch = command.match(/\-X\s+([A-Z]+)/i);
    if (methodMatch) {
        result.method = methodMatch[1];
        command = command.replace(methodMatch[0], '');
    }
    
    // Parse headers
    const headerRegex = /\-H\s+["']([^"']+)["']/gi;
    let headerMatch;
    while ((headerMatch = headerRegex.exec(command)) !== null) {
        const headerStr = headerMatch[1];
        const [name, value] = headerStr.split(': ');
        if (name && value) {
            result.headers[name] = value;
        }
    }
    
    // Parse body - SIMPLE and DIRECT approach
    const dIndex = command.indexOf('-d');
    if (dIndex !== -1) {
        // Get everything after -d
        let bodyPart = command.substring(dIndex + 2).trim();
        
        // Find the first quote
        const firstQuoteIndex = bodyPart.search(/['"]/);
        if (firstQuoteIndex !== -1) {
            const quoteChar = bodyPart[firstQuoteIndex];
            
            // Find the matching closing quote
            let closeQuoteIndex = -1;
            let quoteCount = 1;
            for (let i = firstQuoteIndex + 1; i < bodyPart.length; i++) {
                if (bodyPart[i] === quoteChar && bodyPart[i - 1] !== '\\') {
                    quoteCount--;
                    if (quoteCount === 0) {
                        closeQuoteIndex = i;
                        break;
                    }
                }
            }
            
            if (closeQuoteIndex !== -1) {
                result.body = bodyPart.substring(firstQuoteIndex + 1, closeQuoteIndex);
            }
        }
    }
    
    // Parse URL
    const urlRegex = /["']([^"']+)["']/;
    const urlMatch = urlRegex.exec(command);
    if (urlMatch) {
        result.url = urlMatch[1];
    } else {
        // Try to get URL without quotes
        const parts = command.trim().split(/\s+/);
        if (parts.length > 0) {
            for (const part of parts) {
                if (part && (part.startsWith('http://') || part.startsWith('https://'))) {
                    result.url = part;
                    break;
                }
            }
        }
    }
    
    if (!result.url) {
        throw new Error('Could not parse URL from cURL command');
    }
    
    return result;
}

// Beautify JSON function
function beautifyJsonTool() {
    try {
        const input = elements.jsonInput.value.trim();
        if (!input) {
            return;
        }
        const parsed = JSON.parse(input);
        updateTreeView(parsed);
        elements.jsonOutput.style.display = 'none';
        elements.jsonTree.style.display = 'block';
    } catch (error) {
        console.error('Error beautifying JSON:', error);
    }
}

// Minify JSON function
function minifyJsonTool() {
    try {
        const input = elements.jsonInput.value.trim();
        if (!input) {
            return;
        }
        const parsed = JSON.parse(input);
        const minified = JSON.stringify(parsed);
        elements.jsonOutput.value = minified;
        updateTreeView(parsed);
        elements.jsonOutput.style.display = 'block';
        elements.jsonTree.style.display = 'none';
    } catch (error) {
        console.error('Error minifying JSON:', error);
    }
}



// Update Tree View function
function updateTreeView(data) {
    elements.jsonTree.innerHTML = '';
    const tree = buildTree(data);
    elements.jsonTree.appendChild(tree);
}

// Build Tree function
function buildTree(data, path = []) {
    const ul = document.createElement('ul');
    
    if (Array.isArray(data)) {
        const li = document.createElement('li');
        const collapse = document.createElement('span');
        collapse.className = 'collapse';
        collapse.textContent = '▼';
        collapse.addEventListener('click', () => {
            const childUl = li.querySelector('ul');
            if (childUl) {
                if (childUl.style.display === 'none') {
                    childUl.style.display = 'block';
                    collapse.textContent = '▼';
                } else {
                    childUl.style.display = 'none';
                    collapse.textContent = '▶';
                }
            }
        });
        li.appendChild(collapse);
        
        const bracket = document.createElement('span');
        bracket.className = 'bracket';
        bracket.textContent = '[';
        li.appendChild(bracket);
        
        const childUl = document.createElement('ul');
        data.forEach((item, index) => {
            const itemLi = document.createElement('li');
            if (typeof item === 'object' && item !== null) {
                const itemCollapse = document.createElement('span');
                itemCollapse.className = 'collapse';
                itemCollapse.textContent = '▼';
                itemCollapse.addEventListener('click', () => {
                    const itemChildUl = itemLi.querySelector('ul');
                    if (itemChildUl) {
                        if (itemChildUl.style.display === 'none') {
                            itemChildUl.style.display = 'block';
                            itemCollapse.textContent = '▼';
                        } else {
                            itemChildUl.style.display = 'none';
                            itemCollapse.textContent = '▶';
                        }
                    }
                });
                itemLi.appendChild(itemCollapse);
                const itemTree = buildTree(item, [...path, index]);
                itemLi.appendChild(itemTree);
            } else {
                const valueSpan = document.createElement('span');
                if (typeof item === 'string') {
                    valueSpan.className = 'string';
                    valueSpan.textContent = `"${item}"`;
                } else if (typeof item === 'number') {
                    valueSpan.className = 'number';
                    valueSpan.textContent = item;
                } else if (typeof item === 'boolean') {
                    valueSpan.className = 'boolean';
                    valueSpan.textContent = item;
                } else if (item === null) {
                    valueSpan.className = 'null';
                    valueSpan.textContent = 'null';
                }
                itemLi.appendChild(valueSpan);
                
                // Add double click event listener for editing
                valueSpan.addEventListener('dblclick', () => {
                    editNode(item, [...path, index]);
                });
            }
            if (index < data.length - 1) {
                const comma = document.createElement('span');
                comma.className = 'comma';
                comma.textContent = ',';
                itemLi.appendChild(comma);
            }
            childUl.appendChild(itemLi);
        });
        li.appendChild(childUl);
        
        const closingBracket = document.createElement('li');
        const bracketSpan = document.createElement('span');
        bracketSpan.className = 'bracket';
        bracketSpan.textContent = ']';
        closingBracket.appendChild(bracketSpan);
        li.appendChild(closingBracket);
        
        ul.appendChild(li);
    } else if (typeof data === 'object' && data !== null) {
        const li = document.createElement('li');
        const collapse = document.createElement('span');
        collapse.className = 'collapse';
        collapse.textContent = '▼';
        collapse.addEventListener('click', () => {
            const childUl = li.querySelector('ul');
            if (childUl) {
                if (childUl.style.display === 'none') {
                    childUl.style.display = 'block';
                    collapse.textContent = '▼';
                } else {
                    childUl.style.display = 'none';
                    collapse.textContent = '▶';
                }
            }
        });
        li.appendChild(collapse);
        
        const bracket = document.createElement('span');
        bracket.className = 'bracket';
        bracket.textContent = '{';
        li.appendChild(bracket);
        
        const childUl = document.createElement('ul');
        const entries = Object.entries(data);
        entries.forEach(([key, value], index) => {
            const itemLi = document.createElement('li');
            const keySpan = document.createElement('span');
            keySpan.className = 'key';
            keySpan.textContent = `"${key}": `;
            itemLi.appendChild(keySpan);
            
            // Add double click event listener for editing value
            keySpan.addEventListener('dblclick', () => {
                editNode(value, [...path, key]);
            });
            
            if (typeof value === 'object' && value !== null) {
                const itemCollapse = document.createElement('span');
                itemCollapse.className = 'collapse';
                itemCollapse.textContent = '▼';
                itemCollapse.addEventListener('click', () => {
                    const itemChildUl = itemLi.querySelector('ul');
                    if (itemChildUl) {
                        if (itemChildUl.style.display === 'none') {
                            itemChildUl.style.display = 'block';
                            itemCollapse.textContent = '▼';
                        } else {
                            itemChildUl.style.display = 'none';
                            itemCollapse.textContent = '▶';
                        }
                    }
                });
                itemLi.appendChild(itemCollapse);
                const itemTree = buildTree(value, [...path, key]);
                itemLi.appendChild(itemTree);
            } else {
                const valueSpan = document.createElement('span');
                if (typeof value === 'string') {
                    valueSpan.className = 'string';
                    valueSpan.textContent = `"${value}"`;
                } else if (typeof value === 'number') {
                    valueSpan.className = 'number';
                    valueSpan.textContent = value;
                } else if (typeof value === 'boolean') {
                    valueSpan.className = 'boolean';
                    valueSpan.textContent = value;
                } else if (value === null) {
                    valueSpan.className = 'null';
                    valueSpan.textContent = 'null';
                }
                itemLi.appendChild(valueSpan);
                
                // Add double click event listener for editing value
                valueSpan.addEventListener('dblclick', () => {
                    editNode(value, [...path, key]);
                });
            }
            if (index < entries.length - 1) {
                const comma = document.createElement('span');
                comma.className = 'comma';
                comma.textContent = ',';
                itemLi.appendChild(comma);
            }
            childUl.appendChild(itemLi);
        });
        li.appendChild(childUl);
        
        const closingBracket = document.createElement('li');
        const bracketSpan = document.createElement('span');
        bracketSpan.className = 'bracket';
        bracketSpan.textContent = '}';
        closingBracket.appendChild(bracketSpan);
        li.appendChild(closingBracket);
        
        ul.appendChild(li);
    }
    
    return ul;
}

// Edit node function
function editNode(value, path) {
    // Create edit modal
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.minWidth = '400px';
    modalContent.style.maxWidth = '80%';
    modalContent.style.maxHeight = '80%';
    modalContent.style.overflow = 'auto';
    
    const modalTitle = document.createElement('h3');
    modalTitle.textContent = 'Edit Value';
    modalContent.appendChild(modalTitle);
    
    let inputElement;
    if (typeof value === 'object' && value !== null) {
        // For objects and arrays, use a textarea with formatted JSON
        inputElement = document.createElement('textarea');
        inputElement.value = JSON.stringify(value, null, 2);
        inputElement.style.width = '100%';
        inputElement.style.height = '300px';
        inputElement.style.padding = '10px';
        inputElement.style.margin = '10px 0';
        inputElement.style.border = '1px solid #ddd';
        inputElement.style.borderRadius = '4px';
        inputElement.style.fontFamily = 'monospace';
        inputElement.style.fontSize = '14px';
    } else {
        // For simple types, use an input
        inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.value = typeof value === 'string' ? value : String(value);
        inputElement.style.width = '100%';
        inputElement.style.padding = '10px';
        inputElement.style.margin = '10px 0';
        inputElement.style.border = '1px solid #ddd';
        inputElement.style.borderRadius = '4px';
    }
    modalContent.appendChild(inputElement);
    
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'flex-end';
    buttonContainer.style.gap = '10px';
    
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.padding = '8px 16px';
    cancelButton.style.backgroundColor = '#f0f0f0';
    cancelButton.style.border = 'none';
    cancelButton.style.borderRadius = '4px';
    cancelButton.style.cursor = 'pointer';
    cancelButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    buttonContainer.appendChild(cancelButton);
    
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.style.padding = '8px 16px';
    saveButton.style.backgroundColor = '#4CAF50';
    saveButton.style.color = 'white';
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '4px';
    saveButton.style.cursor = 'pointer';
    saveButton.addEventListener('click', () => {
        const newValue = inputElement.value;
        updateNodeValue(newValue, path);
        document.body.removeChild(modal);
    });
    buttonContainer.appendChild(saveButton);
    
    modalContent.appendChild(buttonContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Update node value function
function updateNodeValue(newValue, path) {
    try {
        const input = elements.jsonInput.value.trim();
        if (!input) {
            return;
        }
        let data = JSON.parse(input);
        
        // Traverse to the node and update its value
        let current = data;
        for (let i = 0; i < path.length - 1; i++) {
            if (current === undefined || current === null) {
                console.error('Path does not exist at index:', i, 'path:', path);
                return;
            }
            current = current[path[i]];
        }
        
        const lastKey = path[path.length - 1];
        
        // Handle different value types
        let updatedValue;
        try {
            // Try to parse as JSON first (for objects/arrays)
            updatedValue = JSON.parse(newValue);
        } catch {
            // If parsing fails, handle as simple type
            if (newValue === 'true') {
                updatedValue = true;
            } else if (newValue === 'false') {
                updatedValue = false;
            } else if (newValue === 'null') {
                updatedValue = null;
            } else if (!isNaN(newValue) && !isNaN(parseFloat(newValue))) {
                updatedValue = parseFloat(newValue);
            } else {
                updatedValue = newValue;
            }
        }
        
        if (current === undefined || current === null) {
            console.error('Parent node is undefined, path:', path);
            return;
        }
        
        current[lastKey] = updatedValue;
        
        // Update the input and tree view
        elements.jsonInput.value = JSON.stringify(data, null, 2);
        updateTreeView(JSON.parse(elements.jsonInput.value));
    } catch (error) {
        console.error('Error updating node value:', error);
    }
}

// Copy JSON Output function
function copyJsonOutput() {
    try {
        let output;
        if (elements.jsonTree.style.display === 'block') {
            output = elements.jsonInput.value;
        } else {
            output = elements.jsonOutput.value;
        }
        if (!output) {
            return;
        }
        navigator.clipboard.writeText(output).then(() => {
            console.log('Copied to clipboard!');
        }).catch(err => {
            console.error('Error copying to clipboard:', err);
        });
    } catch (error) {
        console.error('Error copying to clipboard:', error);
    }
}

// Update Tree View from output function
function updateTreeFromOutput() {
    try {
        const output = elements.jsonOutput.value.trim();
        if (!output) {
            return;
        }
        const parsed = JSON.parse(output);
        updateTreeView(parsed);
    } catch (error) {
        console.error('Error updating tree view:', error);
    }
}

// Save request to favorites
function saveRequest() {
    const url = elements.url.value;
    if (!url) {
        alert('Please enter a URL');
        return;
    }
    
    // Get request details
    const request = {
        id: Date.now().toString(),
        name: prompt('Enter a name for this request:'),
        method: elements.httpMethod.value,
        url: url,
        headers: {},
        params: {},
        body: elements.requestBody.value,
        bodyType: elements.bodyType.value,
        tags: []
    };
    
    if (!request.name) return; // User canceled
    
    // Get tags
    const tagsInput = prompt('Enter tags (comma separated):');
    if (tagsInput) {
        request.tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
    }
    
    // Get headers
    const headerItems = elements.headersList.querySelectorAll('.header-item');
    headerItems.forEach(item => {
        const name = item.querySelector('.header-name').value;
        const value = item.querySelector('.header-value').value;
        if (name && value) {
            request.headers[name] = value;
        }
    });
    
    // Get params
    const paramItems = elements.paramsList.querySelectorAll('.param-item');
    paramItems.forEach(item => {
        const name = item.querySelector('.param-name').value;
        const value = item.querySelector('.param-value').value;
        if (name) {
            request.params[name] = value;
        }
    });
    
    // Get favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('httpClientFavorites') || '[]');
    
    // Add new request to favorites
    favorites.push(request);
    
    // Save back to localStorage
    localStorage.setItem('httpClientFavorites', JSON.stringify(favorites));
    
    alert('Request saved to favorites!');
}

// Show favorites
function showFavorites() {
    // Get favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('httpClientFavorites') || '[]');
    
    // Clear favorites list
    elements.favoritesList.innerHTML = '';
    
    if (favorites.length === 0) {
        elements.favoritesList.innerHTML = '<p>No saved requests yet.</p>';
    } else {
        // Get all unique tags
        const allTags = new Set();
        favorites.forEach(request => {
            if (request.tags) {
                request.tags.forEach(tag => allTags.add(tag));
            }
        });
        
        // Add tag filter
        const filterContainer = document.createElement('div');
        filterContainer.className = 'favorites-filter';
        filterContainer.innerHTML = `
            <label for="tag-filter">Filter by tag:</label>
            <select id="tag-filter">
                <option value="all">All Tags</option>
                ${Array.from(allTags).map(tag => `<option value="${tag}">${tag}</option>`).join('')}
            </select>
        `;
        elements.favoritesList.appendChild(filterContainer);
        
        // Add table header
        const tableHeader = document.createElement('div');
        tableHeader.className = 'favorite-table-header';
        tableHeader.innerHTML = `
            <div class="header-title">Title</div>
            <div class="header-tags">Tags</div>
            <div class="header-actions">Actions</div>
        `;
        elements.favoritesList.appendChild(tableHeader);
        
        // Create favorites container
        const favoritesContainer = document.createElement('div');
        favoritesContainer.className = 'favorites-container';
        
        // Add favorites container to DOM first
        elements.favoritesList.appendChild(favoritesContainer);
        
        // Function to render favorites based on selected tag
        function renderFavorites(filterTag) {
            favoritesContainer.innerHTML = '';
            
            favorites.forEach(request => {
                // Check if request matches filter
                if (filterTag === 'all' || (!filterTag) || (request.tags && request.tags.includes(filterTag))) {
                    const requestItem = document.createElement('div');
                    requestItem.className = 'favorite-item';
                    requestItem.innerHTML = `
                        <div class="favorite-name">${request.name}</div>
                        <div class="favorite-tags">${request.tags && request.tags.length > 0 ? request.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ') : '-'}</div>
                        <div class="favorite-actions">
                            <button class="load-request" data-id="${request.id}">Load</button>
                            <button class="delete-request" data-id="${request.id}">Delete</button>
                        </div>
                    `;
                    favoritesContainer.appendChild(requestItem);
                }
            });
            
            // Add event listeners for load and delete buttons
            favoritesContainer.querySelectorAll('.load-request').forEach(button => {
                button.addEventListener('click', () => loadRequest(button.dataset.id));
            });
            
            favoritesContainer.querySelectorAll('.delete-request').forEach(button => {
                button.addEventListener('click', () => deleteRequest(button.dataset.id));
            });
        }
        
        // Initial render
        renderFavorites('all');
        
        // Add filter event listener
        document.getElementById('tag-filter').addEventListener('change', function() {
            renderFavorites(this.value);
        });
    }
    
    // Show modal
    elements.favoritesModal.style.display = 'block';
}

// Load saved request
function loadRequest(requestId) {
    // Get favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('httpClientFavorites') || '[]');
    
    // Find the request
    const request = favorites.find(r => r.id === requestId);
    if (!request) return;
    
    // Update form fields
    elements.httpMethod.value = request.method;
    elements.url.value = request.url;
    elements.requestBody.value = request.body || '';
    elements.bodyType.value = request.bodyType || 'json';
    
    // Clear existing headers
    elements.headersList.innerHTML = '';
    
    // Add saved headers
    for (const [name, value] of Object.entries(request.headers)) {
        const headerItem = createHeaderItem();
        headerItem.querySelector('.header-name').value = name;
        headerItem.querySelector('.header-value').value = value;
        elements.headersList.appendChild(headerItem);
    }
    
    // Clear existing params
    elements.paramsList.innerHTML = '';
    
    // Add saved params
    for (const [name, value] of Object.entries(request.params)) {
        const paramItem = createParamItem(name, value);
        elements.paramsList.appendChild(paramItem);
    }
    
    // Close modal
    elements.favoritesModal.style.display = 'none';
}

// Delete saved request
function deleteRequest(requestId) {
    if (!confirm('Are you sure you want to delete this request?')) return;
    
    // Get favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('httpClientFavorites') || '[]');
    
    // Filter out the request
    favorites = favorites.filter(r => r.id !== requestId);
    
    // Save back to localStorage
    localStorage.setItem('httpClientFavorites', JSON.stringify(favorites));
    
    // Refresh favorites list
    showFavorites();
}

// Switch between tool menus
function switchMenu(menuName) {
    // Update menu buttons
    elements.menuButtons.forEach(button => {
        button.classList.remove('active');
        if (button.dataset.menu === menuName) {
            button.classList.add('active');
        }
    });
    
    // Update menu contents
    elements.menuContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `${menuName}-content`) {
            content.classList.add('active');
        }
    });
}

// Base64 Encode function
function encodeBase64() {
    try {
        const input = elements.base64Input.value;
        if (!input) {
            return;
        }
        const encoded = btoa(unescape(encodeURIComponent(input)));
        elements.base64Output.value = encoded;
    } catch (error) {
        console.error('Error encoding text:', error);
    }
}

// Base64 Decode function
function decodeBase64() {
    try {
        const input = elements.base64Input.value;
        if (!input) {
            return;
        }
        const decoded = decodeURIComponent(escape(atob(input)));
        elements.base64Output.value = decoded;
    } catch (error) {
        console.error('Error decoding Base64:', error);
    }
}

// Copy Base64 Output function
function copyBase64Output() {
    try {
        const output = elements.base64Output.value;
        if (!output) {
            return;
        }
        navigator.clipboard.writeText(output).then(() => {
            console.log('Copied to clipboard!');
        }).catch(err => {
            console.error('Error copying to clipboard:', err);
        });
    } catch (error) {
        console.error('Error copying to clipboard:', error);
    }
}

// URL Encode function
function encodeUrl() {
    try {
        const input = elements.urlInput.value;
        if (!input) {
            return;
        }
        const encoded = encodeURIComponent(input);
        elements.urlOutput.value = encoded;
    } catch (error) {
        console.error('Error encoding text:', error);
    }
}

// URL Decode function
function decodeUrl() {
    try {
        const input = elements.urlInput.value;
        if (!input) {
            return;
        }
        const decoded = decodeURIComponent(input);
        elements.urlOutput.value = decoded;
    } catch (error) {
        console.error('Error decoding URL:', error);
    }
}

// Copy URL Output function
function copyUrlOutput() {
    try {
        const output = elements.urlOutput.value;
        if (!output) {
            return;
        }
        navigator.clipboard.writeText(output).then(() => {
            console.log('Copied to clipboard!');
        }).catch(err => {
            console.error('Error copying to clipboard:', err);
        });
    } catch (error) {
        console.error('Error copying to clipboard:', error);
    }
}

// Copy response function
function copyResponse() {
    try {
        const responseText = elements.responseBody.textContent;
        if (!responseText) {
            return;
        }
        navigator.clipboard.writeText(responseText).then(() => {
            console.log('Response copied to clipboard!');
        }).catch(err => {
            console.error('Error copying response:', err);
        });
    } catch (error) {
        console.error('Error copying response:', error);
    }
}

// Copy to JSON tool function
function copyToJson() {
    try {
        const responseText = elements.responseBody.textContent;
        if (!responseText) {
            return;
        }
        
        // Switch to JSON tool menu
        switchMenu('json');
        
        // Set response text as JSON input
        elements.jsonInput.value = responseText;
        
        // Beautify JSON
        beautifyJsonTool();
    } catch (error) {
        console.error('Error copying to JSON tool:', error);
    }
}

// Initialize the extension when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// ==================== Time Tools Functions ====================

// Copy current time function
// Convert to date function
function convertToDate() {
    try {
        const timestamp = elements.unixTimestamp.value.trim();
        if (!timestamp) {
            return;
        }
        const unit = detectTimestampUnit();
        let date;
        if (unit === 'milliseconds') {
            date = new Date(parseInt(timestamp));
        } else {
            date = new Date(parseInt(timestamp) * 1000);
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
        const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds},${milliseconds}`;
        elements.timeResult.textContent = formattedTime;
    } catch (error) {
        console.error('Error converting to date:', error);
    }
}

// Detect timestamp unit function
function detectTimestampUnit() {
    const timestamp = elements.unixTimestamp.value.trim();
    if (!timestamp) {
        elements.timestampUnit.textContent = '';
        return 'seconds';
    }
    
    const num = parseInt(timestamp);
    const length = timestamp.length;
    
    if (length === 13) {
        elements.timestampUnit.textContent = 'ms';
        return 'milliseconds';
    } else if (length === 10) {
        elements.timestampUnit.textContent = 's';
        return 'seconds';
    } else if (length > 13) {
        elements.timestampUnit.textContent = 'ms';
        return 'milliseconds';
    } else if (length < 10) {
        elements.timestampUnit.textContent = 's';
        return 'seconds';
    } else {
        elements.timestampUnit.textContent = 's';
        return 'seconds';
    }
}

// Convert to timestamp function
function convertToTimestamp() {
    try {
        const dateTime = elements.dateTime.value.trim();
        if (!dateTime) {
            return;
        }
        
        // Parse date time (supports both yyyy-MM-dd HH:mm:ss and yyyy-MM-dd HH:mm:ss.sss)
        let datePart, timePart, milliseconds = 0;
        if (dateTime.includes(',')) {
            // Format with milliseconds: yyyy-MM-dd HH:mm:ss,sss
            const [dateTimePart, msPart] = dateTime.split(',');
            [datePart, timePart] = dateTimePart.split(' ');
            milliseconds = parseInt(msPart) || 0;
        } else if (dateTime.includes('.')) {
            // Format with milliseconds: yyyy-MM-dd HH:mm:ss.sss
            const [dateTimePart, msPart] = dateTime.split('.');
            [datePart, timePart] = dateTimePart.split(' ');
            milliseconds = parseInt(msPart) || 0;
        } else {
            // Format without milliseconds: yyyy-MM-dd HH:mm:ss
            [datePart, timePart] = dateTime.split(' ');
        }
        
        if (!datePart || !timePart) {
            return;
        }
        
        const [year, month, day] = datePart.split('-').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);
        
        // Create date object
        const date = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
        const timestamp = Math.floor(date.getTime() / 1000);
        elements.timeResult.textContent = timestamp.toString();
    } catch (error) {
        console.error('Error converting to timestamp:', error);
    }
}

// Convert current time to timestamp function
function convertCurrentToTimestamp() {
    try {
        const currentTime = elements.currentTime.value;
        if (!currentTime) {
            return;
        }
        const date = new Date(currentTime.replace(',', '.'));
        const timestamp = Math.floor(date.getTime() / 1000);
        elements.timeResult.textContent = timestamp.toString();
    } catch (error) {
        console.error('Error converting current time to timestamp:', error);
    }
}

// Copy time result function
function copyTimeResult() {
    try {
        const result = elements.timeResult.textContent;
        if (!result) {
            return;
        }
        navigator.clipboard.writeText(result).then(() => {
            console.log('Time result copied to clipboard!');
        }).catch(err => {
            console.error('Error copying to clipboard:', err);
        });
    } catch (error) {
        console.error('Error copying time result:', error);
    }
}

// Time Zone Conversion function
function convertTimezone() {
    try {
        const sourceTime = elements.sourceTime.value.trim();
        if (!sourceTime) {
            console.log('Source time is empty');
            return;
        }
        
        const sourceTimezone = parseInt(elements.sourceTimezone.value);
        const targetTimezone = parseInt(elements.targetTimezone.value);
        
        console.log('Converting time:', {
            sourceTime,
            sourceTimezone,
            targetTimezone
        });
        
        // Parse source time (supports both yyyy-MM-dd HH:mm:ss and yyyy-MM-dd HH:mm:ss.sss)
        let datePart, timePart, milliseconds = 0;
        if (sourceTime.includes(',')) {
            // Format with milliseconds: yyyy-MM-dd HH:mm:ss,sss
            const [dateTimePart, msPart] = sourceTime.split(',');
            [datePart, timePart] = dateTimePart.split(' ');
            milliseconds = parseInt(msPart) || 0;
        } else if (sourceTime.includes('.')) {
            // Format with milliseconds: yyyy-MM-dd HH:mm:ss.sss
            const [dateTimePart, msPart] = sourceTime.split('.');
            [datePart, timePart] = dateTimePart.split(' ');
            milliseconds = parseInt(msPart) || 0;
        } else {
            // Format without milliseconds: yyyy-MM-dd HH:mm:ss
            [datePart, timePart] = sourceTime.split(' ');
        }
        
        if (!datePart || !timePart) {
            console.log('Invalid time format');
            return;
        }
        
        const [year, month, day] = datePart.split('-').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);
        
        console.log('Parsed time components:', {
            year,
            month,
            day,
            hours,
            minutes,
            seconds,
            milliseconds
        });
        
        // Create date object in source timezone
        const sourceDate = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
        console.log('Source date:', sourceDate);
        
        // Calculate timezone offset difference
        const offsetDiff = (targetTimezone - sourceTimezone) * 60 * 60 * 1000;
        console.log('Offset difference (ms):', offsetDiff);
        
        // Convert to target timezone
        const targetDate = new Date(sourceDate.getTime() + offsetDiff);
        console.log('Target date:', targetDate);
        
        // Format target time with milliseconds
        const formattedYear = targetDate.getFullYear();
        const formattedMonth = String(targetDate.getMonth() + 1).padStart(2, '0');
        const formattedDay = String(targetDate.getDate()).padStart(2, '0');
        const formattedHours = String(targetDate.getHours()).padStart(2, '0');
        const formattedMinutes = String(targetDate.getMinutes()).padStart(2, '0');
        const formattedSeconds = String(targetDate.getSeconds()).padStart(2, '0');
        const formattedMilliseconds = String(targetDate.getMilliseconds()).padStart(3, '0');
        
        const formattedTargetTime = `${formattedYear}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
        console.log('Formatted target time:', formattedTargetTime);
        
        elements.targetTime.value = formattedTargetTime;
        console.log('Target time updated successfully');
    } catch (error) {
        console.error('Error converting timezone:', error);
    }
}

// ==================== MD5 Tools Functions ====================

// Generate MD5 function
function generateMd5() {
    try {
        const input = elements.md5Input.value.trim();
        if (!input) {
            return;
        }
        // Simple MD5 implementation
        function md5(string) {
            function rotateLeft(lValue, iShiftBits) {
                return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
            }
            function addUnsigned(lX, lY) {
                const lX4 = (lX & 0x40000000);
                const lY4 = (lY & 0x40000000);
                const lX8 = (lX & 0x80000000);
                const lY8 = (lY & 0x80000000);
                const lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
                if (lX4 & lY4) {
                    return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                }
                if (lX4 | lY4) {
                    if (lResult & 0x40000000) {
                        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                    } else {
                        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                    }
                } else {
                    return (lResult ^ lX8 ^ lY8);
                }
            }
            function F(x, y, z) { return (x & y) | ((~x) & z); }
            function G(x, y, z) { return (x & z) | (y & (~z)); }
            function H(x, y, z) { return (x ^ y ^ z); }
            function I(x, y, z) { return (y ^ (x | (~z))); }
            function FF(a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            }
            function GG(a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            }
            function HH(a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            }
            function II(a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            }
            function convertToWordArray(string) {
                let lWordCount;
                const lMessageLength = string.length;
                const lNumberOfWords_temp1 = lMessageLength + 8;
                const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
                const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
                const lWordArray = Array(lNumberOfWords - 1);
                let lBytePosition = 0;
                let lByteCount = 0;
                while (lByteCount < lMessageLength) {
                    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                    lBytePosition = (lByteCount % 4) * 8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                    lByteCount++;
                }
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
                lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
                lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
                return lWordArray;
            }
            function wordToHex(lValue) {
                let wordToHexValue = '', wordToHexValue_temp = '', lByte, lCount;
                for (lCount = 0; lCount <= 3; lCount++) {
                    lByte = (lValue >>> (lCount * 8)) & 255;
                    wordToHexValue_temp = '0' + lByte.toString(16);
                    wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
                }
                return wordToHexValue;
            }
            let x = [], k, AA, BB, CC, DD, a, b, c, d, S11 = 7, S12 = 12, S13 = 17, S14 = 22, S21 = 5, S22 = 9, S23 = 14, S24 = 20, S31 = 4, S32 = 11, S33 = 16, S34 = 23, S41 = 6, S42 = 10, S43 = 15, S44 = 21;
            x = convertToWordArray(string);
            a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
            for (k = 0; k < x.length; k += 16) {
                AA = a; BB = b; CC = c; DD = d;
                a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
                d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
                c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
                b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
                a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
                d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
                c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
                b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
                a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
                d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
                c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
                b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
                a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
                d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
                c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
                b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
                a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
                d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
                c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
                b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
                a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
                d = GG(d, a, b, c, x[k + 10], S22, 0x02441453);
                c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
                b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
                a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
                d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
                c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
                b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
                a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
                d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
                c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
                b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
                a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
                d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
                c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
                b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
                a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
                d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
                c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
                b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
                a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
                d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
                c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
                b = HH(b, c, d, a, x[k + 6], S34, 0x04881D05);
                a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
                d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
                c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
                b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
                a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
                d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
                c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
                b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
                a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
                d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
                c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
                b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
                a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
                d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
                c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
                b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
                a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
                d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
                c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
                b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
                a = addUnsigned(a, AA);
                b = addUnsigned(b, BB);
                c = addUnsigned(c, CC);
                d = addUnsigned(d, DD);
            }
            return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
        }
        const hash = md5(input);
        elements.md5Output.value = hash;
    } catch (error) {
        console.error('Error generating MD5:', error);
    }
}

// Copy MD5 output function
function copyMd5Output() {
    try {
        const output = elements.md5Output.value;
        if (!output) {
            return;
        }
        navigator.clipboard.writeText(output).then(() => {
            console.log('MD5 hash copied to clipboard!');
        }).catch(err => {
            console.error('Error copying to clipboard:', err);
        });
    } catch (error) {
        console.error('Error copying MD5 output:', error);
    }
}

// ==================== Diff Tools Functions ====================

// Compare text diff function
function compareTextDiff() {
    const leftText = elements.diffLeft.value;
    const rightText = elements.diffRight.value;
    
    // Check if texts are completely identical
    if (leftText === rightText) {
        // Update line numbers with normal color
        updateLineNumbers();
        elements.diffDetails.innerHTML = '<span style="text-align: center; display: block; color: #4CAF50; font-weight: bold;">一致</span>';
        return;
    }
    
    const leftLines = leftText.split('\n');
    const rightLines = rightText.split('\n');
    const maxLines = Math.max(leftLines.length, rightLines.length);
    
    // Generate line numbers with diff highlighting
    let leftLineNumbers = '';
    let rightLineNumbers = '';
    
    for (let i = 0; i < maxLines; i++) {
        const leftLine = leftLines[i] || '';
        const rightLine = rightLines[i] || '';
        const isDiff = leftLine !== rightLine;
        
        // Left line numbers
        if (i < leftLines.length) {
            if (isDiff) {
                leftLineNumbers += `<span class="line-number-diff">${i + 1}</span><br>`;
            } else {
                leftLineNumbers += `${i + 1}<br>`;
            }
        }
        
        // Right line numbers
        if (i < rightLines.length) {
            if (isDiff) {
                rightLineNumbers += `<span class="line-number-diff">${i + 1}</span><br>`;
            } else {
                rightLineNumbers += `${i + 1}<br>`;
            }
        }
    }
    
    elements.diffLeftLines.innerHTML = leftLineNumbers;
    elements.diffRightLines.innerHTML = rightLineNumbers;
    
    elements.diffDetails.textContent = `Left: ${leftLines.length} lines, Right: ${rightLines.length} lines`;
}

// Clear text diff function
function clearTextDiff() {
    elements.diffLeft.value = '';
    elements.diffRight.value = '';
    elements.diffDetails.textContent = 'Select a line to see differences';
    elements.diffLeftLines.textContent = '';
    elements.diffRightLines.textContent = '';
}

// Move text from right to left function (← button)
function moveTextLeft() {
    // Get the entire content from the right textarea
    const rightContent = document.getElementById('diff-right').value;
    // Set the entire content to the left textarea
    document.getElementById('diff-left').value = rightContent;
    // Update line numbers
    updateLineNumbers();
    // Compare text again
    compareTextDiff();
}

// Move text from left to right function (→ button)
function moveTextRight() {
    // Get the entire content from the left textarea
    const leftContent = document.getElementById('diff-left').value;
    // Set the entire content to the right textarea
    document.getElementById('diff-right').value = leftContent;
    // Update line numbers
    updateLineNumbers();
    // Compare text again
    compareTextDiff();
}

// Show line diff function
function showLineDiff(e) {
    const textarea = e.target;
    const cursorPosition = textarea.selectionStart;
    const text = textarea.value;
    const lines = text.split('\n');
    
    let currentPosition = 0;
    let lineIndex = 0;
    
    for (let i = 0; i < lines.length; i++) {
        currentPosition += lines[i].length + 1; // +1 for the newline
        if (currentPosition > cursorPosition) {
            lineIndex = i;
            break;
        }
    }
    
    const leftLines = elements.diffLeft.value.split('\n');
    const rightLines = elements.diffRight.value.split('\n');
    
    const leftLine = leftLines[lineIndex] || '';
    const rightLine = rightLines[lineIndex] || '';
    
    if (leftLine !== rightLine) {
        elements.diffDetails.innerHTML = `Line ${lineIndex + 1} differences:<br>` +
            `<b>Left__:</b> ${escapeHtml(leftLine)}<br>` +
            `<b>Right:</b> ${escapeHtml(rightLine)}`;
    } else {
        elements.diffDetails.textContent = `Line ${lineIndex + 1}: No differences`;
    }
}

// Generate diff highlight function
function generateDiffHighlight(leftLines, rightLines) {
    const maxLines = Math.max(leftLines.length, rightLines.length);
    let leftHighlight = '';
    let rightHighlight = '';
    
    for (let i = 0; i < maxLines; i++) {
        const leftLine = leftLines[i] || '';
        const rightLine = rightLines[i] || '';
        
        if (leftLine === rightLine) {
            leftHighlight += `<span>${escapeHtml(leftLine)}</span>\n`;
            rightHighlight += `<span>${escapeHtml(rightLine)}</span>\n`;
        } else {
            const { leftDiff, rightDiff } = highlightLineDiff(leftLine, rightLine);
            leftHighlight += `<span>${leftDiff}</span>\n`;
            rightHighlight += `<span>${rightDiff}</span>\n`;
        }
    }
    
    return { leftHighlight, rightHighlight };
}

// Highlight line diff function
function highlightLineDiff(leftLine, rightLine) {
    if (leftLine === '') {
        return {
            leftDiff: '',
            rightDiff: `<ins>${escapeHtml(rightLine)}</ins>`
        };
    }
    
    if (rightLine === '') {
        return {
            leftDiff: `<del>${escapeHtml(leftLine)}</del>`,
            rightDiff: ''
        };
    }
    
    // Simple word-level diff (for demonstration purposes)
    const leftWords = leftLine.split(/(\s+)/);
    const rightWords = rightLine.split(/(\s+)/);
    
    let leftDiff = '';
    let rightDiff = '';
    
    const maxWords = Math.max(leftWords.length, rightWords.length);
    
    for (let i = 0; i < maxWords; i++) {
        const leftWord = leftWords[i] || '';
        const rightWord = rightWords[i] || '';
        
        if (leftWord === rightWord) {
            leftDiff += escapeHtml(leftWord);
            rightDiff += escapeHtml(rightWord);
        } else {
            if (leftWord) {
                leftDiff += `<del>${escapeHtml(leftWord)}</del>`;
            }
            if (rightWord) {
                rightDiff += `<ins>${escapeHtml(rightWord)}</ins>`;
            }
        }
    }
    
    return { leftDiff, rightDiff };
}

// Escape HTML function
function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Update line numbers function
function updateLineNumbers() {
    // Update left textarea line numbers
    const leftText = elements.diffLeft.value;
    const leftLines = leftText.split('\n').length;
    let leftLineNumbers = '';
    for (let i = 1; i <= leftLines; i++) {
        leftLineNumbers += `${i}<br>`;
    }
    elements.diffLeftLines.innerHTML = leftLineNumbers;
    
    // Update right textarea line numbers
    const rightText = elements.diffRight.value;
    const rightLines = rightText.split('\n').length;
    let rightLineNumbers = '';
    for (let i = 1; i <= rightLines; i++) {
        rightLineNumbers += `${i}<br>`;
    }
    elements.diffRightLines.innerHTML = rightLineNumbers;
}

// Sync scroll function for line numbers
function syncScroll(e) {
    const element = e.target;
    if (element === elements.diffLeft) {
        elements.diffLeftLines.scrollTop = element.scrollTop;
    } else if (element === elements.diffRight) {
        elements.diffRightLines.scrollTop = element.scrollTop;
    }
}


