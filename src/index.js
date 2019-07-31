


const box = document.querySelector('#box');

for (let i=0;i<16*16;i++){
    const div = document.createElement('div');
    div.className = 'pixel';
    box.appendChild(div);
}

console.log(box.childElementCount);