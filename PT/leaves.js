// 红叶自动认领torrent

elements = []; jQuery('[data-torrent_id]').each((i, ele) => {
elements.push(ele.getAttribute('data-torrent_id'))   
})

// 去重
elements = Array.from(new Set(elements))




function sendRequestWithDelay(index = 0) {
    if (index >= elements.length) {
        console.log("All operations completed.");
        return; // 所有元素都已处理，退出函数
    }

    // 构造URL编码的数据
    let encodedData = `action=addClaim&params%5Btorrent_id%5D=${elements[index]}`;

    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodedData,
        redirect: 'follow' // 根据需要设置
    };

    fetch("/ajax.php", requestOptions)
        .then(response => response.text()) // 这里假设响应是文本格式
        .then(result => {
            console.log(`Response for element ${elements[index]}:`, result);
            let nextDelay = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000; // 随机生成3-5秒的延迟
            setTimeout(() => sendRequestWithDelay(index + 1), nextDelay); // 排定下一个请求
        })
        .catch(error => console.log('Error:', error));
}

// 开始处理数组
sendRequestWithDelay();
